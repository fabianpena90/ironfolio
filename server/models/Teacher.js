const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name:  String
},
{
  timestamps: true,
  versionKey: false,
}
);


const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;