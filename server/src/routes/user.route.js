import { userRegistration, userLogin, sendOtp, resetPassword, userDetails } from "../controllers/user.controller.js";
import userAuth from "../middleware/user.middleware.js";
import { Router } from "express";

const router = Router();

router.route("/user-details").post(userAuth, userDetails)
router.route("/signup").post(userRegistration)
router.route("/login").post(userLogin)
router.route("/send-otp").post(sendOtp)
router.route("/reset-password").post(resetPassword)


export default router;