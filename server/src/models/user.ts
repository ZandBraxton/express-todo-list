import mongoose from "mongoose";

interface IUser {
  email: string;
  username: string;
  password: string;
  token: string;
}

let Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("user", userSchema);

export { User };
