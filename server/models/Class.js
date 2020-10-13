const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    location: String,
    month: String,
    year: String,
    // studentsID: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // classID: [{ type: Schema.Types.ObjectId, ref: "Projects" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Classes = mongoose.model("Classes", classSchema);
module.exports = Classes;
