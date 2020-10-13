const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    location: String,
    month: String,
    year: String,
    cohortType: {
      type: String,
      enum: ["FT", "PT"],
      default: "FT",
    },
    studentsID: [{ type: Schema.Types.ObjectId, ref: "User" }],
    projectsID: [{ type: Schema.Types.ObjectId, ref: "Projects" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Classes = mongoose.model("Classes", classSchema);
module.exports = Classes;
