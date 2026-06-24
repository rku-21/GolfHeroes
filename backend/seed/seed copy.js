import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { connectDB } from "../lib/db.js";

import User from "../models/user.model.js";
import Charity from "../models/charity.model.js";
import Subscription from "../models/subscription.model.js";
import Score from "../models/scores.model.js";
import Draw from "../models/draw.model.js";
import Winner from "../models/winner.model.js";

dotenv.config({ path: "./.env" });

const seedDB = async () => {
  try {
    await connectDB();

    await Winner.deleteMany();
    await Score.deleteMany();
    await Subscription.deleteMany();
    await Draw.deleteMany();
    await Charity.deleteMany();
    await User.deleteMany();

    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = await User.insertMany([
      {
        username: "rahul",
        email: "rahul@gmail.com",
        password: hashedPassword,
        about: "Golf enthusiast",
        subscription: "yearly",
      },
      {
        username: "john",
        email: "john@gmail.com",
        password: hashedPassword,
        about: "Weekend golfer",
        subscription:"monthly",
      },
      {
        username: "emma",
        email: "emma@gmail.com",
        password: hashedPassword,
        about: "Charity supporter",
        subscription:"monthly",
      },
      {
        username: "michael",
        email: "michael@gmail.com",
        password: hashedPassword,
        about: "Professional golfer",
        subscription:"yearly"
      },
    ]);

    const charities = await Charity.insertMany([
      {
        name: "World Wildlife Fund",
        description: "Protecting wildlife worldwide",
        image: "https://picsum.photos/300",
        website: "https://www.worldwildlife.org",
        category: "Wildlife",
      },
      {
        name: "UNICEF",
        description: "Helping children globally",
        image: "https://picsum.photos/301",
        website: "https://www.unicef.org",
        category: "Children",
      },
    ]);

    await Subscription.insertMany([
      {
        user: users[0]._id,
        plan: "yearly",
        amount: 99,
        status: "active",
        expiryDate: new Date("2027-06-24"),
      },
      {
        user: users[1]._id,
        plan: "monthly",
        amount: 9,
        status: "active",
        expiryDate: new Date("2026-07-24"),
      },
      {
        user: users[2]._id,
        plan: "yearly",
        amount: 99,
        status: "active",
        expiryDate: new Date("2027-06-24"),
      },
      {
        user: users[3]._id,
        plan: "monthly",
        amount: 9,
        status: "active",
        expiryDate: new Date("2026-07-24"),
      },
    ]);

    await Score.insertMany([
      { user: users[0]._id, score: 38, playedOn: new Date("2026-06-20") },
      { user: users[0]._id, score: 36, playedOn: new Date("2026-06-15") },
      { user: users[0]._id, score: 34, playedOn: new Date("2026-06-10") },
      { user: users[0]._id, score: 39, playedOn: new Date("2026-06-05") },
      { user: users[0]._id, score: 37, playedOn: new Date("2026-06-01") },

      { user: users[1]._id, score: 31, playedOn: new Date("2026-06-20") },
      { user: users[1]._id, score: 33, playedOn: new Date("2026-06-15") },

      { user: users[2]._id, score: 42, playedOn: new Date("2026-06-20") },
      { user: users[2]._id, score: 40, playedOn: new Date("2026-06-15") },

      { user: users[3]._id, score: 35, playedOn: new Date("2026-06-20") },
      { user: users[3]._id, score: 37, playedOn: new Date("2026-06-15") },
    ]);

    const draw = await Draw.create({
      month: 6,
      year: 2026,
      winningNumbers: [32, 35, 38, 41, 43],
      jackpot: 5000,
      status: "pending",
    });

    await Winner.insertMany([
      {
        user: users[0]._id,
        draw: draw._id,
        matchType: 4,
        prizeAmount: 500,
        verificationStatus: "approved",
        paymentStatus: "paid",
      },
      {
        user: users[2]._id,
        draw: draw._id,
        matchType: 5,
        prizeAmount: 1000,
        verificationStatus: "approved",
        paymentStatus: "paid",
      },
    ]);

    console.log("✅ Database seeded successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

seedDB();