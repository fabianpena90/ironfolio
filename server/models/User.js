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
    cohortType: {
      type: String,
      enum: ["FT", "PT"],
      default: "FT",
    },
    projects: [{ type: Schema.Types.ObjectId, ref: "Projects" }],
    favorites: [{ type: Schema.Types.ObjectId, ref: "Projects" }],
    cohort: [{ type: Schema.Types.ObjectId, ref: "Class" }],
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.plugin(PLM, {
  usernameField: "email",
});

module.exports = model("User", userSchema);
