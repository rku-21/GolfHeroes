import mongoose from "mongoose";

const drawSchema = new mongoose.Schema(
  {
    month: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    winningNumbers: {
      type: [Number],
      required: true,
    },

    jackpot: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Draw = mongoose.model("Draw", drawSchema);

export default Draw;