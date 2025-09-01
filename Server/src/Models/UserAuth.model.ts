import { Schema, model } from "mongoose";
import { IUser } from "../Types/userAuth.types";


const UserSchema = new Schema<IUser>({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", UserSchema);

export default User;
