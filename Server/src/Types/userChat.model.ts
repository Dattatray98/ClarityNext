import mongoose, { Types, Document } from "mongoose";

export interface IChat extends Document{
    User_id: mongoose.ObjectId;
    question: string;
    answer : string;
    createdAt: Date;
}