import mongoose from "mongoose";

let Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: String,
  date: Date,
  isCompleted: Boolean,
  userId: String,
});

const Task = mongoose.model("task", taskSchema);

export { Task };
