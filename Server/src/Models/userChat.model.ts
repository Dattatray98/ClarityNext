import mongoose, { Schema, model, Document } from "mongoose";
import {IContent, IConversation, IMesssage } from "../Types/userChat.model";


// Nested content schema inside message schema

const ContentSchema = new Schema<IContent>({
    question: {type: String},
    answer: {type: String},
})


// Nested message schema inside converstaion schema

const MessageSchema = new Schema<IMesssage>({
    role: {type: String, enum:["user", "assistant"], required: true},
    content: [ContentSchema],
}, {timestamps: true});



// Conversation schema 

const ConversationSchema = new Schema<IConversation>({
    user_Id: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    title: {type: String, required: true},
    convo: [MessageSchema],
}, {timestamps: true})



export default mongoose.model("Conversation", ConversationSchema);