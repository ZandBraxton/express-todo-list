import mongoose from "mongoose";

interface Itask {
  name: string;
  date: Date;
  isCompleted: boolean;
  userId: string;
}

let Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: String,
  date: Date,
  isCompleted: Boolean,
  userId: String,
});

const Task = mongoose.model<Itask>("task", taskSchema);

export { Task };
