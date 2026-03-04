import mongoose from "mongoose";

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    sender_id: { type: String, ref: "User", required: true },
    reciever_id: { type: String, ref: "User", required: true },
    text: { type: String, trim: true },
    msg_type: { type: String, enum: ["text", "media"], trim: true },
    media_url: { type: String },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true, minimize: false },
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
