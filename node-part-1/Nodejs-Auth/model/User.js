const mongoose = require('mongoose')

const {Schema} = mongoose;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], //only user or admin roles
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User',userSchema);