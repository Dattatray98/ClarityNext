import { Router } from "express";
import { chatHistory } from "../Controllers/chatHistory";
const router = Router();


router.get("/chats", chatHistory);

export default router;