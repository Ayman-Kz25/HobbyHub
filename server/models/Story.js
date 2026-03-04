import mongoose from "mongoose";

const { Schema } = mongoose;
const storySchema = new Schema(
  {
    user: { type: String, ref: "User", required: true },
    content: { type: String },
    media_url: { type: String },
    media_type: {
      type: String,
      enum: ["text", "image", "video"],
    },
    view_count: [{ type: String, ref: "User" }],
    bg_clr: { type: String },
  },
  { timestamps: true, minimize: false },
);

const Story = mongoose.model("Story", storySchema);

export default Story;
