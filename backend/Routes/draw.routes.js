import express from "express";
const router=express.Router();
import { getCurrentDraw,getDrawHistory } from "../controllers/draw.controllers.js";
import { protectRoute } from "../middleware/protectedRoute.js";

router.use(protectRoute);
router.get("/history",getDrawHistory);
router.get("/current",getCurrentDraw);

export default router;
