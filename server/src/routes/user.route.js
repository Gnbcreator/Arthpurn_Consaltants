import {
    userRegistration,
    userLogin,
    sendOtp,
    resetPassword,
    userDetails,
    updateUserProfile,
    updateUserAddress,
    updateUserAvtar,
    updateUserBanner
} from "../controllers/user.controller.js";
import userAuth from "../middleware/user.middleware.js";
import { Router } from "express";
import { upload } from "../../utils/handleFileUploads.js";
const router = Router();

router.route("/user-details").post(userAuth, userDetails)
router.route("/signup").post(userRegistration)
router.route("/login").post(userLogin)
router.route("/send-otp").post(sendOtp)
router.route("/reset-password").post(resetPassword)

router.route("/update-profile").post(userAuth, updateUserProfile);
router.route("/update-address").post(userAuth, updateUserAddress);
router.route("/update-avtar").post(userAuth, upload.single('avatar'), updateUserAvtar);
router.route("/update-banner").post(userAuth, updateUserBanner);

export default router;