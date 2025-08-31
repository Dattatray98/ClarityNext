import { Types } from "mongoose";

export interface ITask {
    title: string;
    description?: string;
    status?: "pending" | "complited"
    deadline?: Date;
}


export interface IPhase {
    name: string;
    description?: string
    tasks: ITask[];
}

export interface IRoadmap {
    title: string;
    description: string;
    createdBy: string;
    phases: IPhase[];
    createdAt : Date;
}