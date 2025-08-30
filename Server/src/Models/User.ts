import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required: true,
    },

    LastName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    }
},{timestamps: true})