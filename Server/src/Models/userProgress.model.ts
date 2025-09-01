import mongoose, { Schema } from "mongoose";
import { IProgress } from "../Types/userProgress.model";

const ProgressSchema = new Schema<IProgress>({
    User_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    roadmapComplition: {type: Number, default: 0},
    lastupdated: {type:Date, default: Date.now},
});


export default mongoose.model("Userprogress", ProgressSchema);