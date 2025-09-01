import { Router } from "express";
import { askMistral_AI } from "../Controllers/askAi.Controller";
const router = Router();

router.post("/ask", askMistral_AI);

export default router;