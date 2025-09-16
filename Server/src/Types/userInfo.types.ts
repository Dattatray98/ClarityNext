import mongoose, { Document } from "mongoose"

export interface Skill {
  user_Id: mongoose.Types.ObjectId;
  skill: string;
}

export interface Project {
  user_Id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  timeline: string;
  projectLink: string;
}

export interface Link {
  user_Id: mongoose.Types.ObjectId;
  linkName: string;
  link: string;
}

export interface UserInfo extends Document {
  user_Id: mongoose.Types.ObjectId;
  links: Link[];
  skills: Skill[];
  projects: Project[];
  createdAt: Date,
  updatedAt : Date,
}
