
import Razorpay from "razorpay";

import dotenv from "dotenv"
dotenv.config({path:"./.env"});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export const createOrder = async (req, res) => {
  try {
    const { plan } = req.body;

    const amount =
      plan === "yearly"
        ? 9900
        : 900;

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};