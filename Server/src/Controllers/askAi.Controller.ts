import { Request, Response } from "express";
import { askOllama } from "../config/askAi.config";

export const askMistral_AI = async (req: Request, res: Response) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ success: false, message: "missing question" });
    }

    try {

        const answer = await askOllama(question);
        res.json({ success: true, answer });

    } catch (err: any) {
        console.error("Chat API Error:", err.message);
        res.status(500).json({ success: false, error: "Failed to get response" });
    }
};