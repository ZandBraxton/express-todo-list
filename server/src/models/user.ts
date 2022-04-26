import mongoose from "mongoose";

let Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  hash: String,
});

const User = mongoose.model("user", userSchema);

export { User };
