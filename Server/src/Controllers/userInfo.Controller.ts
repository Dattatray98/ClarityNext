import { Request, Response } from "express";
import UserInfo from "../Models/userInfo.model";
import { VerifyToken } from "../utils/Token"; 
import User from "../Models/UserAuth.model";


export const createUserInfo = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const decoded: any = VerifyToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user_Id = decoded.id;
    const { links, skills, projects } = req.body;

  
    const userExists = await User.findById(user_Id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const newUserInfo = new UserInfo({
      user_Id,
      links,
      skills,
      projects,
    });

    const savedUserInfo = await newUserInfo.save();

    return res.status(201).json({
      message: "User info created successfully",
      data: savedUserInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating user info",
      error: (error as Error).message,
    });
  }
};


export const GetUserInfo = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    const decoded = VerifyToken(token) as { id: string };
    const user_Id = decoded.id;


    const user = await User.findById(user_Id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // const userInfo = await User.findOne({ user_Id: user_Id });
    // if (!userInfo) {
    //   return res.status(404).json({ message: "User info not found" });
    // }

    return res.status(200).json({
      message: "User info fetched successfully",
      data: {
        user,
        // userInfo,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user info",
      error: (error as Error).message,
    });
  }
};
