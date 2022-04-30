import mongoose from "mongoose";

let Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: String,
  priority: Number,
  completed: Boolean,
  userId: String,
});

const Task = mongoose.model("task", taskSchema);

export { Task };
