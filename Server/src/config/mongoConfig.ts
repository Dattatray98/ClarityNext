import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const database = async () => {
   await mongoose.connect(process.env.MONGO_URI!).then(()=>console.log("database connected")).catch((err)=>console.log(err))
}
