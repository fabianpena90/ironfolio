const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: String,
    name: String,
    googleId: String,
    imageUrl: String,
    class: { type: String, default: "Test" },
    projectName: { type: String, default: "" },
    url: { type: String, default: "" },
    description: { type: String, default: "" },
    userType: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
      // },
      // project1: { type: [String], default: null },
      // project1Type: {
      //   type: String,
      //   enum: [null, "single", "team"],
      //   default: null,
      // },
      // project2: { type: [String], default: null },
      // project2Type: {
      //   type: String,
      //   enum: [null, "single", "team"],
      //   default: null,
      // },
      // project3: { type: [String], default: null },
      // project3Type: {
      //   type: String,
      //   enum: [null, "single", "team"],
      //   default: null,
      // },
      // project4: { type: [String], default: null },
      // project4Type: {
      //   type: String,
      //   enum: [null, "single", "team"],
      //   default: null,
      // },
      // project5: { type: [String], default: null },
      // project5Type: {
      //   type: String,
      //   enum: [null, "single", "team"],
      //   default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("User", userSchema);
