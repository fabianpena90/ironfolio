const { Schema, model } = require("mongoose");

const projectsSchema = new Schema({
  project:  [String],
  website: {String},
  description: {body: [String], date: Date}
});


const Projects = mongoose.model('Projects', projectsSchema);
module.exports = Projects