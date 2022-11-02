const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  projectNum: String,
  projectName: String,
  projectType: String,
  projectDescription: String,
  projectCost: String,
  projectClient: String,

  projectStatus: { type: String, default: "Ongoing" },
  projectManager: { type: Schema.Types.ObjectId, ref: "Employee" },

  startDate: { type: Date, default: new Date() },
  endDate: { type: Date },
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
