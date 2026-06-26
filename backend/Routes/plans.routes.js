import express from "express";
const router=express.Router();
import { getAllPlans } from "../controllers/plans.controllers.js";

router.get("/",getAllPlans);
export default router;
