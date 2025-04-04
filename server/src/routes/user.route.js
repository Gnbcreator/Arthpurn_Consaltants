import {userRegistration,userLogin, sendOtp, resetPassword} from "../controllers/user.controller.js";
import { Router } from "express";

const router=Router();

router.route("/signup").post(userRegistration)
router.route("/login").post(userLogin)
router.route("/send-otp").post(sendOtp)
router.route("/reset-password").post(resetPassword)


export default router;