const { Schema, model } = require("mongoose");

const projectsSchema = new Schema(
  {
    project: String,
    projectName: String,
    website: String,
    description: String,
    studentsID: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // classID: { type: Schema.Types.ObjectId, ref: "Class" },
    class: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Projects = model("Projects", projectsSchema);
module.exports = Projects;
