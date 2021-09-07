const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: String,
    name: String,
    googleId: String,
    imageUrl: String,
    class: { type: String, default: 'Test' },
    classID: { type: Schema.Types.ObjectId, ref: 'Classes' },
    userType: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Projects' }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Projects' }],
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('User', userSchema);
