const { Schema, model } = require("mongoose");

const projectsSchema = new Schema(
  {
    project: String,
    projectName: String,
    website: String,
    description: String,
    studentsID: [{ type: Schema.Types.ObjectId, ref: "User" }],
    cohort: { type: Schema.Types.ObjectId, ref: "Class" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Projects = model("Projects", projectsSchema);
module.exports = Projects;
