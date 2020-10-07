const { Schema, model } = require("mongoose");

const newProjectsSchema = new Schema(
  {
    projectName:  [String],
    website: {String},
    description: {body: [String], date: Date}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = model("NewProjects", newProjectsSchema);