import express from "express"
import { login,signup,logout,checkAuth,updateProfile} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/protectedRoute.js";
import { upload } from "../middleware/upload.middleware.js";

const router=express.Router();


router.post("/login",login);
router.post("/signup",signup);
router.post("/logout",logout);
router.put("/update-profile",protectRoute,upload.single("image"),updateProfile);
router.get("/check",protectRoute,checkAuth);

export default router;