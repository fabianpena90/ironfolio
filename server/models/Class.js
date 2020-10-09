const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  location:  String,
  month: String,
  year: String,
  // students: [{ type: Schema.Types.ObjectId, ref: "User" }]
},
{
  timestamps: true,
  versionKey: false,
}
);


const Classes = mongoose.model('Classes', classSchema);
module.exports = Classes;