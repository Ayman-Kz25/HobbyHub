import mongoose from "mongoose";

const { Schema } = mongoose;
const postSchema = new Schema(
  {
    user: { type: String, ref: "User", required: true },
    content: { type: String },
    media_urls: [{ type: String }],
    post_type: {
      type: String,
      enum: ["text", "media", "text_with_media"],
      required: true,
    },
    likes_count: [{ type: String, ref: "User" }],
  },
  { timestamps: true, minimize: false },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
