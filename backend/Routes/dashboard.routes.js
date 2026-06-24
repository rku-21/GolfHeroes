import express from "express";
const router=express.Router();


import { getDashboard } from "../controllers/dashboard.controllers.js";
import { protectRoute } from "../middleware/protectedRoute.js";

router.get("/dashboard",protectRoute,getDashboard);
export default router;