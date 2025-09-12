import { Router } from "express";
import { Ask_Ai, GetChats } from "../Controllers/askAi.Controller";
const router = Router();

router.post("/ask", Ask_Ai);

router.get("/getChats", GetChats);

export default router;