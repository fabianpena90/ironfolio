const { Schema, model } = require("mongoose");

const newProjectsSchema = new Schema(
  {
    project:  [String],
    website: {String, require: true},
    description: {body: [String], date: Date}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = model("NewProjects", newProjectsSchema);