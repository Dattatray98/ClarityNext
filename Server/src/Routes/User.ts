import {Router, Request, Response } from  "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, {IUser} from "../Models/User"
import { authMiddleware, AuthRequest } from "../Middleware/auth";

const router = Router();


// router for new user signup

router.post("/signup", async (req: Request, res:Response)=>{
    try{

        const { FirstName, LastName, email,phone, password } = req.body as {
            FirstName: string;
            LastName: string;
            email: string;
            phone: string;
            password: string;
        };

        // check if user already exists
        let existingUser: IUser | null = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "user already exists"});
        }


        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // save new user
        const newUser = new User({FirstName, LastName, email, phone, password: hashedPassword});
        await newUser.save();

        // create JWT
        const token = jwt.sign(
            {id: newUser._id},
            process.env.JWT_SECRET || "secretKey",
            {expiresIn: "1h"}
        );


        res.status(201).json({
            message: "user created successfully",
            token,
            user: {id: newUser._id, FirstName: newUser.FirstName, LastName : newUser.LastName,  email:newUser.email, phone: newUser.phone },
        });

    }catch(error){
        res.status(500).json({message: "server error", error});
    }
});

// router for existing user login

router.post("/login", async (req:Request, res:Response)=>{
    try{
        const {identifier, password } = req.body as {
            identifier: string;
            password: string;
        };

        // find user by email or phone

        const user: IUser | null = await User.findOne({
            $or:[{email: identifier}, {phone: identifier}]
        });

        if(!user) {
            return res.status(400).json({message: "invalid email/phone or password"});
        }

        // Compare password

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid email/phone or password"});
        }


        // Generate JWT

        const token = jwt.sign(
            { id: user._id},
            process.env.JWT_SECRET || "secretKey",
            { expiresIn: "1h"}
        );

        res.json({
            message: "Login successful",
            token,
            user: {id: user._id, FirstName: user.FirstName, LastName: user.LastName, email: user.email, phone: user.phone}
        });

    }catch(error){
        res.status(500).json({message: "server error", error});
    }
});



// get router for current logged user

router.get('/users/me', authMiddleware, async (req:AuthRequest, res:Response)=>{
    try{
        const user = await User.findById(req.user?.id).select("-password");
        if(!user) return res.status(404).json({message: "user not found"});

        res.json(user);

    }catch(error){
        res.status(500).json({message: "server error"});
    }
});

export default router;