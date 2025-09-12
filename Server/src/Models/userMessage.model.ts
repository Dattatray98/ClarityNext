import mongoose,{ Schema } from "mongoose";
import { IMesssage } from "../Types/userChat.model";

const MessageSchema = new Schema<IMesssage>({
    conversationId: {type:mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true},
    prompt: {type: String, required: true},
    content: {type: String, required: true}
}, {timestamps: true});


export default mongoose.model("messages", MessageSchema);