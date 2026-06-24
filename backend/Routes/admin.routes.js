import express from "express";
import {getDashboardStats,getAllUsers,runDraw,getAllWinners,verifyWinner,getReports,
} from "../controllers/admin.controllers.js"

import { protectRoute,adminOnly} from "../middleware/protectedRoute.js";

const router = express.Router();

router.use(protectRoute,adminOnly);
router.get("/dashboard", getDashboardStats);
router.get("/users", getAllUsers);
router.post("/draw/run", runDraw);
router.get("/winners", getAllWinners);
router.put("/winners/:id/verify", verifyWinner);
router.get("/reports", getReports);

export default router;