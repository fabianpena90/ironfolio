const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: String,
    name: String,
    googleId: String,
    imageUrl: String,
    class: { type: String, default: "Test" },
    projectName: {type:String, default: ""},
    url: {type:String, default: ""},
    description: {type:String, default: ""},
    userType: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
   project1Type: {
     type: String,
     enum: ["single", "team"], 
     default: "single",
   }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(PLM, { usernameField: "email" });

module.exports = model("User", userSchema);
