import { Router } from "express";
import { Ask_Ai} from "../Controllers/askAi.Controller";
const router = Router();

router.post("/ask", Ask_Ai);

export default router;