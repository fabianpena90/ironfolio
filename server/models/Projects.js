const { Schema, model } = require("mongoose");

const projectsSchema = new Schema(
  {
    projectName: String,
    website: String,
    description: String,
    studentsID: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Projects = model("Projects", projectsSchema);
module.exports = Projects;
