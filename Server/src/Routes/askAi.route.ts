import { Router } from "express";
import { ask_AI } from "../Controllers/askAi.Controller";
const router = Router();

router.post("/ask", ask_AI);

export default router;