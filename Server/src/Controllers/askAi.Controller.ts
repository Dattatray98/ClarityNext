import { Request, Response } from "express";
import { askOllama } from "../config/askAi.config";
import Conversation from "../Models/userChat.model";
import { VerifyToken } from "../utils/Token";

export const ask_AI = async (req: Request, res: Response) => {
    const { question } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    const decoded = VerifyToken(token);
    const user_Id = decoded.id;

    if (!user_Id) {
        return res.status(400).json({ message: 'user_id is missing' })
    }

    if (!question) {
        return res.status(400).json({ message: "quesiton is missing" })
    }

    try {
        // Find existing conversation or create new
        let conver = await Conversation.findOne({ user_Id });

        if (!conver) {
            conver = new Conversation({
                user_Id: user_Id,
                title: question,
                convo: [],
            });
        }

        // 1️⃣ Push User Message
        const userMessage = {
            role: "user" as const,
            content: [{
                question: question,
                answer: ""   // user doesn’t provide an answer
            }]
        };
        conver.convo.push(userMessage);

        // 2️⃣ Prepare prompt from full history
        let prompt = "";
        conver.convo.forEach(message => {
            message.content.forEach(contentItem => {
                if (message.role === "user" && contentItem.question) {
                    prompt += `User: ${contentItem.question}\n`;
                } else if (message.role === "assistant" && contentItem.answer) {
                    prompt += `Assistant: ${contentItem.answer}\n`;
                }
            });
        });

        prompt += "Assistant:";

        // 3️⃣ Get AI Answer
        const aiAnswer = await askOllama(prompt);

        // 4️⃣ Push Assistant Message with Answer
        const assistantMessage = {
            role: "assistant" as const,
            content: [{
                question: "",
                answer: aiAnswer
            }]
        };
        conver.convo.push(assistantMessage);

        // 5️⃣ Trim convo to last 100 messages
        const MAX_MESSAGES = 100;
        if (conver.convo.length > MAX_MESSAGES) {
            conver.convo = conver.convo.slice(-MAX_MESSAGES);
        }

        // 6️⃣ Save conversation in DB
        await conver.save();

        // 7️⃣ Send response
        res.json({ success: true, answer: aiAnswer, conversation: conver });

    } catch (err: any) {
        console.error("Chat API Error:", err.message);
        res.status(500).json({ success: false, error: "Failed to get response" });
    }
};
