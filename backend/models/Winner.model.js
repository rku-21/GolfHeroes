import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    draw: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Draw",
      required: true,
    },

    matchType: {
      type: Number,
      enum: [3, 4, 5],
      required: true,
    },

    prizeAmount: {
      type: Number,
      default: 0,
    },

    proofImage: {
      type: String,
      default: "",
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Winner", winnerSchema);