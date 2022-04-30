import mongoose from "mongoose";

let Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  description: String,
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

const Project = mongoose.model("project", projectSchema);

export { Project };
