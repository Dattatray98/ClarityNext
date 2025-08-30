import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// import AiRoute from "./Routes/AiRoute"
import { database } from "./config/mongoConfig";
dotenv.config();

const app = express();
const PORT = 8000;
app.use(bodyParser.json());

database();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript + CommonJS 🚀");
});

// app.use("/ai", AiRoute)

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
