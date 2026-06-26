import express from "express"
import { protectRoute } from "../middleware/protectedRoute.js";
import { createOrder } from "../controllers/payment.controllers.js";
const router=express.Router();

router.post("/create-order",protectRoute,createOrder);
export default router;