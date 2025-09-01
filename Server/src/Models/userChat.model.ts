import mongoose, { Schema, model, Document } from "mongoose";
import { IChat } from "../Types/userChat.model";


const ChatSchema = new Schema<IChat>({
    User_id : {type: mongoose.Schema.Types.ObjectId , ref:"User"},
    question: {type: String},
    answer: {type: String},
    createdAt: {type: Date, default: Date.now},
});

export default mongoose.model("Chat", ChatSchema);