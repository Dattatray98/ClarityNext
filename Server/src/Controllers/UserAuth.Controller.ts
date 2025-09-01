import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../Models/UserAuth.model";
import { IUser } from "../Types/userAuth.types";
import { GenerateToken, VerifyToken } from "../utils/Token";

// ------------------- Signup -------------------
export const UserSignUP = async (req: Request, res: Response) => {
  const { FirstName, LastName, email, phone, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await User.create({
      FirstName,
      LastName,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id.toString(), // ✅ TS now knows _id exists
      firstname: user.FirstName,
      lastname: user.LastName,
      email: user.email,
      phone: user.phone,
      token: GenerateToken(user._id.toString()),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------- Login -------------------
export const UserLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    res.status(200).json({
      id: user._id.toString(), // ✅ type safe now
      FirstName: user.FirstName,
      LastName: user.LastName,
      email: user.email,
      token: GenerateToken(user._id.toString()),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



export const UserMe = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Get token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2️⃣ Verify token
    const decoded = VerifyToken(token);
    const userId = decoded.id;

    // 3️⃣ Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4️⃣ Return safe user data
    res.status(200).json({
      id: user._id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
