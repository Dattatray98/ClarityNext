import express from "express";
import { askOllama } from "../config/mistral.config";

const router = express.Router();

router.post("/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const answer = await askOllama(question);
    res.json({ success: true, answer });
  } catch (err) {
    res.status(500).json({ success: false, err});
  }
});


router.get("/test", (req, res)=>{
    res.send("hello server is running")
})

export default router;
