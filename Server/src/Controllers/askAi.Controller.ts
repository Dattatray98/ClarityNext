import { Request, Response } from "express";
import { askOllama } from "../config/askAi.config";
import Conversation from "../Models/userConvo.model";
import Message from "../Models/userMessage.model";
import { VerifyToken } from "../utils/Token";


export const Ask_Ai = async (req: Request, res: Response) => {
  const { prompt, conversation_Id } = req.body;

  try {
    // ✅ Token check
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Token not provided" });
    }

    const decoded = VerifyToken(token);
    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const user_Id = decoded.id;
    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt not provided" });
    }

    // ✅ Find or create conversation
    let conversation = null;
    let convo_Id = conversation_Id;

    if (convo_Id) {
      conversation = await Conversation.findById(convo_Id);
      if (!conversation) {
        return res.status(404).json({ success: false, message: "Conversation not found" });
      }
    } else {
      conversation = await Conversation.findOne({ user_Id }).sort({ createdAt: -1 });
      if (!conversation) {
        conversation = new Conversation({
          user_Id,
          title: prompt.substring(0, 50),
        });
        await conversation.save();
      }
      convo_Id = conversation._id;
    }

    // ✅ Fetch previous messages
    const previousMessages = await Message.find({ conversationId: convo_Id }).sort({ createdAt: 1 });

    // ✅ Build conversation history for AI
    const fullPrompt = previousMessages
      .map((msg) => `User: ${msg.prompt}\nAssistant: ${msg.content}`)
      .join("\n") + `\nUser: ${prompt}\nAssistant:`;

    // ✅ Get AI response
    const aiResponse = await askOllama(fullPrompt);

    // ✅ Save user + assistant message
    const newMessage = new Message({
      conversationId: convo_Id,
      prompt,
      content: aiResponse,
    });
    await newMessage.save();

    res.status(200).json({
      success: true,
      conversation_Id: convo_Id,
      answer: aiResponse,
    });
  } catch (error: any) {
    console.error("❌ Ask_Ai error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};