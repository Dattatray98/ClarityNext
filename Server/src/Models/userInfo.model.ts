import mongoose, { Schema } from "mongoose";
import { Link, Project, Skill, UserInfo } from "../Types/userInfo.types";

// Subschemas
const LinkSchema = new Schema<Link>({
    linkName: { type:String, required: true },
    link: { type: String, required: true },
});

const SkillSchema = new Schema<Skill>({
    skill: { type: String, required: true },
});

const ProjectSchema = new Schema<Project>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    timeline: { type: String, required: true },
    projectLink: { type: String, required: true },
});

// Main schema
const UserInfoSchema = new Schema<UserInfo>(
    {
        user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        links: [LinkSchema],
        skills: [SkillSchema],
        projects: [ProjectSchema],
    },
    { timestamps: true }
);

export default mongoose.model<UserInfo>("UserInfo", UserInfoSchema);
