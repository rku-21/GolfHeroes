import mongoose from "mongoose";


const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: String,
      required: true,
    },

    period: {
      type: String,
       enum: ["monthly", "yearly"],
      required: true,
    },

    savings: {
      type: String,
      default: "",
    },

    features: {
      type: [String],
      required: true,
      default: [],
    },

    highlighted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema);

export default Plan;