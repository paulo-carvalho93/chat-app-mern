import mongoose, { Schema, Types } from "mongoose";

interface IMessage {
  sender: Types.ObjectId;
  content: string;
  chat: Types.ObjectId;
}

const MessageSchema = new Schema<IMessage>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
