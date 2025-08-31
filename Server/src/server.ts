import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
// import authRoute from "./Routes/userAuth.route"
import aiRoute from "./Routes/ai.route"
import { database } from "./config/mongo.config";

dotenv.config();

const app = express();
const PORT = 6000;

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
  res.send("Hello from Express + TypeScript + CommonJS 🚀 by dattu");
});


// SignUP route 
// app.use("/api/auth", authRoute);


// Ai Routes 
app.use("/api", aiRoute)

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
