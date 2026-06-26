import express from "express";
const router=express.Router();

import { getAllCharities,getCharityById,addCharity,updateCharity,deleteCharity, getMyCharity } from "../controllers/charities.controllers.js";
import { protectRoute } from "../middleware/protectedRoute.js";

router.get("/",getAllCharities);


router.use(protectRoute);
router.get("/me",getMyCharity);
router.get("/:id",getCharityById);
router.post("/",addCharity);
router.put("/",updateCharity);
router.delete("/:id",deleteCharity);


export default router;