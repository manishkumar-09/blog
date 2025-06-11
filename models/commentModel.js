const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true,
      minLength: [1, "Comment cannot be empty"],
      maxLength: [1000, "Comment cannot exceed 1000 characters"],
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    blogID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
      required: [true, "Blog ID is required"],
    },
    isActive: {
      type: String,
      default: true,
    },
  },
  { versionKey: false }
);
commentSchema.set("timestamps", true);

module.exports = mongoose.model("comment", commentSchema);
