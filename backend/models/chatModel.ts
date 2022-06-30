import mongoose, { Schema, Types } from "mongoose";

interface IChat {
  chatName: string;
  isGroupChat: boolean;
  users: [
    {
      type: Types.ObjectId;
      ref: "string";
    }
  ];
  latestMessage: Types.ObjectId;
  groupAdmin: Types.ObjectId;
}

const ChatSchema = new Schema<IChat>(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    groupAdmin: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Chat = mongoose.model<IChat>("Chat", ChatSchema);

export default Chat;
