import mongoose from "mongoose";

const { Schema } = mongoose;
const friendSchema = new Schema(
  {
    sender_id: { type: String, ref: "User", required: true },
    receiver_id: { type: String, ref: "User", required: true },
    status: { type: String, enum: ["pending", "accepted"], default: "pending" },
  },
  { timestamps: true },
);

const Friend = mongoose.model("Friends", friendSchema);

export default Friend;
