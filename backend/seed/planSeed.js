import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../lib/db.js";
import Plan from "../models/plans.model.js";

const plans = [
    {
      name: 'Monthly Plan',
      price: '$9.99',
      period: '/month',
      features: [
        'Monthly prize draws',
        'Score tracking',
        'Charity support',
        'Mobile app access',
        'Community access'
      ],
      highlighted: false
    },
    {
      name: 'Yearly Plan',
      price: '$99.99',
      period: '/year',
      savings: 'Save 17%',
      features: [
        'Monthly prize draws',
        'Score tracking',
        'Charity support',
        'Mobile app access',
        'Community access',
        'Priority support'
      ],
      highlighted: true
    }
  ];
  dotenv.config({path:"./.env"})

  const seed  = async()=>{
     try {
        connectDB();
        await Plan.deleteMany();
        await Plan.insertMany(plans);
        console.log("seeded succesffuly ");
    }
     catch(error){
        console.log(error);
     }
  }
  seed();
  
  

