import mongoose, { Schema } from "mongoose";

interface IUSer {
  name: string;
  email: string;
  password: string;
  picture: string;
  isAdmin: boolean;
}

const userSchema = new Schema<IUSer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    picture: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUSer>("User", userSchema);

export default User;
