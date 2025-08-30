import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./Routes/User"
import { database } from "./config/mongoConfig";
dotenv.config();

const app = express();
const PORT = 8000;
app.use(bodyParser.json());

database();

// Enable Cors

app.use(cors({
  origin: process.env.FRONT_END, // your frontend URL
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript + CommonJS 🚀");
});


// SignUP route 
app.use("/api/auth", authRoutes);
// app.use("/ai", AiRoute)

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
