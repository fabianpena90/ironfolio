const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  location:  String,
  month: String,
  year: String
},
{
  timestamps: true,
  versionKey: false,
}
);


const Classes = mongoose.model('Classes', classSchema);
module.exports = Classes;