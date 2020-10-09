const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: String,
    name: String,
    googleId: String,
    imageUrl: String,
    class: { type: String, default: "Test" },
    userType: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    projects: {
      project1: {
        name: { type: String, default: "" },
        url: { type: String, default: "" },
        description: { type: String, default: "" },
      },
      project2: {
        name: { type: String, default: "" },
        url: { type: String, default: "" },
        description: { type: String, default: "" },
      },
      project3: {
        name: { type: String, default: "" },
        url: { type: String, default: "" },
        description: { type: String, default: "" },
      },
      project4: {
        name: { type: String, default: "" },
        url: { type: String, default: "" },
        description: { type: String, default: "" },
      },
      project5: {
        name: { type: String, default: "" },
        url: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("User", userSchema);
