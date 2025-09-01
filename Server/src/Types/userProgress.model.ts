import mongoose, {Types, Document} from "mongoose";


export interface IProgress extends Document{
    User_id : mongoose.ObjectId;
    roadmapComplition: number;
    lastupdated: Date;
};