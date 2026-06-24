import express from "express";
const router=express.Router();
import { getMyScores,addScore,updateScore,deleteScore } from "../controllers/scores.controllers.js";
import { protectRoute } from "../middleware/protectedRoute.js";
router.use(protectRoute);
router.get("/",getMyScores);
router.post("/",addScore);
router.put("/:id",updateScore);
router.delete("/:id",deleteScore);

export default router;


