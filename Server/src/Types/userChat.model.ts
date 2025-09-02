import mongoose, { Types, Document } from "mongoose";

export interface IChat {
    role: "user" | "assistant";
    question: string;
    answer: string;
}

export interface IContent {
    question: string;
    answer: string;
}

export interface IMesssage {
    role: "user" | "assistant";
    content: IContent[];
}


export interface IConversation extends Document {
    user_Id: mongoose.ObjectId;
    title: string;
    convo: IMesssage[];
}