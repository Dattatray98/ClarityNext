import { Request, Response } from "express";
import { askOllama } from "../config/askAi.config";
import Conversation from "../Models/userConvo.model";
import messages from "../Models/userMessage.model";
import { VerifyToken } from "../utils/Token";


export const Ask_Ai = async (req: Request, res: Response) => {
    const { prompt, conversation_Id } = req.body;  // geting items from frontend

    let convo_Id = conversation_Id;  // saving conversation id as convo_Id

    const token = req.headers.authorization?.split(" ")[1];  // saving jwt token as token 
    if (!token) return res.status(401).json({ success: false, message: "token not received" });


    try {
        const decoded = VerifyToken(token);  // verifing token and decoding it 
        const user_Id = decoded.id;   // storing user id as user_Id decoded from token

        if (!user_Id) return res.status(400).json({ success: false, message: "user_Id is not found" }); // show's error if user_Id is not found in token
        if (!prompt) return res.status(400).json({ success: false, message: "prompt is not found" });  // show's error if prompt is not provided 

        let conversation;


        if (convo_Id) {
            // If conversation_Id provided, find that conversation
            conversation = await Conversation.findById(convo_Id);
            if (!convo_Id) {
                res.status(404).json({ message: "conversation not found " })
            }

        } else {
            // If no conversation_Id, find or create conversation for this user
            conversation = await Conversation.findOne({ user_Id: user_Id });
            if (!conversation) {
                conversation = new Conversation({
                    user_Id: user_Id,
                    title: prompt.substring(0, 50)
                });
                await conversation.save();
            }
            convo_Id = conversation._id;
        }

        const aiResponse = await askOllama(prompt);


        // Create and save message
        const message = new messages({
            conversationId: convo_Id,
            prompt: prompt,
            content: aiResponse,
        });
        await message.save();

        // If using AI, add your AI processing here

        res.status(200).json({
            success: true,
            conversation_Id: convo_Id,
            answer: aiResponse // or use aiResponse if you have AI processing
        });

    } catch (error) {
        console.error("❌ SERVER ERROR:", error);
        res.status(500).json({
            success: false,
            message: "server error",

        });
    }
};



export const GetChats = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token not provided" }); // Fixed: 401 + consistent message
        }

        const decoded = VerifyToken(token);

        // Added proper token validation
        if (!decoded || typeof decoded !== 'object' || !decoded.id) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const user_Id = decoded.id;

        // Fixed: Correct projection syntax - removed user_Id from projection
        const conversations = await Conversation.find(
            { user_Id: user_Id },
            { title: 1, _id: 1 } // Only return title and _id
        ).sort({ createdAt: -1 }); // Added sorting

        // Fixed: Check for empty array, not null/undefined
        if (!conversations || conversations.length === 0) {
            console.log("No conversations found for user:", user_Id);
            return res.status(200).json({ // Changed to 200 since empty array is valid
                success: true,
                data: [],
                count: 0,
                message: "No conversations found"
            });
        }

        console.log("Found conversations:", conversations);

        res.status(200).json({
            success: true,
            data: conversations,
            count: conversations.length
        });

    } catch (error: any) {
        console.error("GetChats error:", error);

        // Added specific error handling
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        res.status(500).json({ message: "Server error" });
    }
};