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
import Plan from "../models/plans.model.js";

dotenv.config({ path: "./.env" });

const seedDB = async () => {
  try {
    await connectDB();

    // Clean existing data
    await Plan.deleteMany();
    await Winner.deleteMany();
    await Score.deleteMany();
    await Subscription.deleteMany();
    await Draw.deleteMany();
    await Charity.deleteMany();
    await User.deleteMany();
    const plans = await Plan.insertMany([
  {
    name: "Monthly Plan",
    price: "9",
    period: "monthly",
    savings: "",
    highlighted: false,
    features: [
      "Monthly Prize Draw Entry",
      "Golf Score Tracking",
      "Charity Donations",
      "Community Access",
    ],
  },
  {
    name: "Yearly Plan",
    price: "99",
    period: "yearly",
    savings: "Save 8%",
    highlighted: true,
    features: [
      "Monthly Prize Draw Entry",
      "Unlimited Score Tracking",
      "Priority Support",
      "Charity Donations",
      "Exclusive Member Rewards",
    ],
  },
]);

    // Seed 12 charities
    const charities = await Charity.insertMany([
      {
        name: "World Wildlife Fund",
        description: "Protecting endangered species and wildlife habitats worldwide.",
        image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800",
        website: "https://www.worldwildlife.org",
        category: "Wildlife",
      },
      {
        name: "Ocean Conservation",
        description: "Protecting marine ecosystems and ocean biodiversity.",
        image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
        website: "https://oceanconservancy.org",
        category: "Environment",
      },
            {
        name: "Forest Protection Initiative",
        description: "Fighting deforestation and restoring forests.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
        website: "https://www.rainforest-alliance.org",
        category: "Environment",
      },
      {
        name: "Medical Research Foundation",
        description: "Supporting breakthrough treatments and medical innovation.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
        website: "https://www.cancerresearch.org",
        category: "Health",
      },
      {
        name: "Youth Sports Program",
        description: "Helping children access sports and education opportunities.",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
        website: "https://www.righttoplay.com",
        category: "Youth",
      },
      {
        name: "Clean Water Project",
        description: "Providing safe drinking water to underserved communities.",
        image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800",
        website: "https://water.org",
        category: "Humanitarian",
      },
      {
        name: "Education For All",
        description: "Making quality education accessible worldwide.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
        website: "https://www.unicef.org",
        category: "Education",
      },
      {
        name: "Animal Rescue Network",
        description: "Rescuing and rehabilitating abandoned animals.",
        image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800",
        website: "https://www.aspca.org",
        category: "Animals",
      },
      {
        name: "Disaster Relief Fund",
        description: "Providing emergency assistance during disasters.",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
        website: "https://www.redcross.org",
        category: "Relief",
      },
      {
        name: "Food Security Alliance",
        description: "Combating hunger and food insecurity worldwide.",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
        website: "https://www.feedingamerica.org",
        category: "Food",
      },
      {
        name: "Mental Health Support",
        description: "Promoting mental health awareness and support services.",
        image: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800",
        website: "https://www.nami.org",
        category: "Health",
      },
      {
        name: "Community Development Fund",
        description: "Supporting local communities through sustainable projects.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
        website: "https://www.un.org",
        category: "Community",
      },
    ]);

    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = await User.insertMany([
      {
        username: "rahul",
        email: "rahul@gmail.com",
        password: hashedPassword,
        about: "Golf enthusiast",
        subscription: "yearly",
        selectedCharity: charities[0]._id,
        charityPercentage: 10,
      },
      {
        username: "john",
        email: "john@gmail.com",
        password: hashedPassword,
        about: "Weekend golfer",
        subscription: "monthly",
        selectedCharity: charities[1]._id,
        charityPercentage: 15,
      },
      {
        username: "emma",
        email: "emma@gmail.com",
        password: hashedPassword,
        about: "Charity supporter",
        subscription: "monthly",
        selectedCharity: charities[2]._id,
        charityPercentage: 20,
      },
      {
        username: "michael",
        email: "michael@gmail.com",
        password: hashedPassword,
        about: "Professional golfer",
        subscription: "yearly",
        selectedCharity: charities[3]._id,
        charityPercentage: 12,
      },
    ]);

    await Subscription.insertMany([
  {
    user: users[0]._id,
    plan: plans[1]._id,
    amount: 99,
    status: "active",
    expiryDate: new Date("2027-06-24"),
  },
  {
    user: users[1]._id,
    plan: plans[0]._id,
    amount: 9,
    status: "active",
    expiryDate: new Date("2026-07-24"),
  },
  {
    user: users[2]._id,
    plan: plans[1]._id,
    amount: 99,
    status: "active",
    expiryDate: new Date("2027-06-24"),
  },
  {
    user: users[3]._id,
    plan: plans[0]._id,
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
    prizeAmount: 2500,
    verificationStatus: "approved",
    paymentStatus: "paid",
  },
  {
    user: users[1]._id,
    draw: draw._id,
    matchType: 3,
    prizeAmount: 1200,
    verificationStatus: "approved",
    paymentStatus: "paid",
  },
  {
    user: users[2]._id,
    draw: draw._id,
    matchType: 5,
    prizeAmount: 10000,
    verificationStatus: "approved",
    paymentStatus: "paid",
  },
  {
    user: users[3]._id,
    draw: draw._id,
    matchType: 3,
    prizeAmount: 500,
    verificationStatus: "approved",
    paymentStatus: "paid",
  },
]);
    console.log("✅ Database Seeded Successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.error(error);
    await mongoose.connection.close();
  }
};

seedDB();