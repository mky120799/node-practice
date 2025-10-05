const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    mediaIds: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

// Text index for search
postSchema.index({ content: "text" });
// Optional: index user for faster queries
postSchema.index({ user: 1 });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
