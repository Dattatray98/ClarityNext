import mongoose, { Schema } from "mongoose";
import {IConversation} from "../Types/userChat.model";


// Nested message schema inside converstaion schema

// Conversation schema 

const ConversationSchema = new Schema<IConversation>({
    user_Id: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    title: {type: String, required: true},
},{timestamps: true})



export default mongoose.model("Conversation", ConversationSchema);