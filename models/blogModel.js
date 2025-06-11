const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Author is required"],
    },
    blogImage: {
      type: String,
      required: [true, "Blog image is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required. Please choose a valid one."],
      enum: {
        values: ["Technology", "Health", "Education", "Lifestyle", "Travel"],
        message:
          "Category `{VALUE}` is not valid. Choose from: Technology, Health, Education, Lifestyle, Travel.",
      },
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    isActive: {
      type: String,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("blog", blogSchema);
