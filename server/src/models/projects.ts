import mongoose from "mongoose";

let Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  description: String,
});

const Project = mongoose.model("project", projectSchema);

export { Project };
