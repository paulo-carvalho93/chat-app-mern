import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  picture?: string;
  isAdmin: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: {
      type: String,
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

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

UserSchema.pre(
  "save",
  async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    if (!this.isModified) {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
