import { Types, Document } from "mongoose";

export interface IUser extends Document {
  FirstName: string;
  LastName: string;
  email: string;
  phone: string;
  password: string;
  _id: string;   // ✅ explicitly tell TS that _id is a string
}