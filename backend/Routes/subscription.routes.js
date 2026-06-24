import express from "express";
const router=express.Router();
import { getMySubscriptions,addSubscription,cancelSubscription } from "../controllers/subscription.controllers.js";


router.get("/",getMySubscriptions);
router.post("/",addSubscription);
router.put("/",cancelSubscription);

export default router;