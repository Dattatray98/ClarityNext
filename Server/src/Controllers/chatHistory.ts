import { Request, Response } from "express"
import { VerifyToken } from "../utils/Token"
import userConvoModel from "../Models/userConvo.model";
import userMessageModel from "../Models/userMessage.model";

export const chatHistory = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            console.log("token is missing");
            return res.status(401).json({ message: "Authorization token is missing" });
        }

        const decoded = VerifyToken(token);
        if (!decoded || !decoded.id) {
            console.log("Token verification failed or payload is invalid");
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        const user_Id = decoded.id;

        const convo = await userConvoModel.find({ user_Id: user_Id });
        return res.status(201).json({ convo });

    } catch (error) {
        console.error(error)
    }
}


    