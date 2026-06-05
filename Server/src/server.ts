import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./Routes/userAuth.route";
import aiRoute from "./Routes/askAi.route";
import { database } from "./config/mongo.config";
import userInfoRoute from "./Routes/userInfo.route";
import chatsRoute from "./Routes/userChats";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

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
  res.send("Hello from Express + TypeScript + CommonJS  by dattu");
});

app.get("/home", (req:Request, res:Response)=>{
  res.send("hello home route")
})


app.get("/api/profile", (req:Request, res:Response) => {
  res.json("hellow");
});


// SignUP route 
app.use("/api/auth", authRoute);
app.use("/api/user", userInfoRoute);

// Ai Routes 
app.use("/api/ai", aiRoute)

//chats 
app.use("/api", chatsRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
