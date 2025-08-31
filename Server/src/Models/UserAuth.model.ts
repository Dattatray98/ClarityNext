import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  id: mongoose.ObjectId;
  FirstName: string;
  LastName: string;
  email: string;
  phone: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema({
  id: { type : mongoose.Schema.Types.ObjectId},
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true},
  password: { type: String, required: true },

});

export default mongoose.model<IUser>("User", UserSchema,);