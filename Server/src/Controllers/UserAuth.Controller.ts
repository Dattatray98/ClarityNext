import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../Models/UserAuth.model";
import { GenerateToken } from "../utils/Token";


// Controller for user Sign-UP/New user resistration 

export const UserSignUP = async (req: Request, res: Response) => {

    const { FirstName, LastName, email, phone, password } = req.body;

    try {

        // checking the if user already exist in database
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            FirstName,
            LastName,
            email,
            phone,
            password: hashedPassword,
        });

        res.status(201).json({
            _id: user.id,
            firstname: user.FirstName,
            lastname: user.LastName,
            email: user.email,
            phone: user.phone,
            token: GenerateToken(user.id.toString()),
        })


    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// Controller for existing user login

export const UserLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.send(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }


        res.status(200).json({
            id: user.id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            email: user.email,
            token: GenerateToken(user.id.toString()),
        })

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};



