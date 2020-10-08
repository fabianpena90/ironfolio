const mongoose = require("mongoose");
const Classes = require("../models/Class");
const Teacher = require("../models/Teacher");
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/ironfolioExample";
console.log("Connecting DB to ", MONGODB_URI);

const classes = [
  {
    location: "MIA",
    month: "OCT",
    year: "2020",
  },
  {
    location: "MIA",
    month: "JAN",
    year: "2021",
  },
  {
    location: "MIA",
    month: "MAR",
    year: "2021",
  },
  {
    location: "MIA",
    month: "MAY",
    year: "2021",
  },
  {
    location: "MIA",
    month: "AUG",
    year: "2021",
  },
];

// const teacher = [
//   {
//     name: "Fabian"
//   },
//   {
//     name: "Rabiul"
//   }
// ];

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    Classes.insertMany(classes);
    // Teacher.insertMany(teacher);
  })
  .catch((err) => console.error("Error connecting to mongo", err));
