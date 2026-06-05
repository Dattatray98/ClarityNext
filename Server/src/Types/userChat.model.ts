import mongoose, { Document } from "mongoose";

export interface IMessage {
    conversationId: mongoose.Types.ObjectId;
    prompt: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface IConversation extends Document {
    _id:mongoose.Types.ObjectId;
    user_Id: mongoose.Types.ObjectId;
    title: string;
    createdAt : Date;
    updatedAt : Date;
}


