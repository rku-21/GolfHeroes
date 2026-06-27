import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app=express();
dotenv.config();
console.log(process.env.RAZORPAY_KEY_API);
const PORT = process.env.PORT || 5001;

import authRoutes from "./Routes/auth.routes.js";
import charitiesRoutes from "./Routes/charities.routes.js";
import userHomeRoutes from "./Routes/dashboard.routes.js"
import scoreRoutes from "./Routes/scores.routes.js";
import drawRoutes from "./Routes/draw.routes.js"
import { connectDB } from "./lib/db.js";
import plansRoutes from "./Routes/plans.routes.js";
import paymentsRoutes from "./Routes/payment.routes.js"
import subscriptonsRoutes from "./Routes/subscription.routes.js"

const devCorsOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? true
      : (devCorsOrigins.length ? devCorsOrigins : true),
    credentials: true,
  })
);

app.use(cookieParser());


app.use(express.json());


app.use("/api/auth",authRoutes);
app.use("/api/charities",charitiesRoutes);
app.use("/api/user",userHomeRoutes);
app.use("/api/score",scoreRoutes);
app.use("/api/draw",drawRoutes);
app.use("/api/plans",plansRoutes);
app.use("/api/payments",paymentsRoutes);
app.use("/api/subscriptions",subscriptonsRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


console.log(path.join(__dirname, "../frontend/dist"));




app.get("/test", (req, res) => {
  res.send("OK");
});
console.log(PORT)
app.listen(PORT,()=>{
    console.log('server is listeninig');

    connectDB().catch(err =>{
        console.log(`database connection failed , ${err.message}`);
    });
})


