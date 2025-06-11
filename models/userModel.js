const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    userPhone: {
      type: Number,
      required: true,
    },
    userCity: {
      type: String,
      required: true,
    },
    userState: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      default:"user",
      required: true,
    },
    profilePic: {
      type: String,
    },
    isActive: {
      type: String,
      default: true,
    },
  },
  {
    versionKey: false,
  }
);
userSchema.set("timestamps", true);

module.exports = mongoose.model("user", userSchema);
