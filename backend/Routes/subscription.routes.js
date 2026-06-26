import express from "express";
const router=express.Router();
import { getMySubscriptions,addSubscription,cancelSubscription } from "../controllers/subscription.controllers.js";
import { protectRoute } from "../middleware/protectedRoute.js";

router.use(protectRoute)
router.get("/",getMySubscriptions);
router.post("/",addSubscription);
router.put("/",cancelSubscription);

export default router;