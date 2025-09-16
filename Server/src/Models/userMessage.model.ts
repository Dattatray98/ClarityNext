import mongoose,{ Schema } from "mongoose";
import { IMessage } from "../Types/userChat.model";

const MessageSchema = new Schema<IMessage>({
    conversationId: {type:mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true},
    prompt: {type: String, required: true},
    content: {type: String, required: true}
}, {timestamps: true});


export default mongoose.model("message", MessageSchema);