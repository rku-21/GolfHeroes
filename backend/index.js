import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();
dotenv.config();
const PORT=5001 ||process.env.PORT;

import authRoutes from "./Routes/auth.routes.js";
import charitiesRoutes from "./Routes/charities.routes.js";
import userHomeRoutes from "./Routes/dashboard.routes.js"
import scoreRoutes from "./Routes/scores.routes.js";
import drawRoutes from "./Routes/draw.routes.js"
import { connectDB } from "./lib/db.js";

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

app.listen(PORT,()=>{
    console.log('server is listeninig');

    connectDB().catch(err =>{
        console.log(`database connection failed , ${err.message}`);
    });
})


