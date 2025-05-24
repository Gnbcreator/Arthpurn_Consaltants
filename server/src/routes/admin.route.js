import { adminRegistration, adminLogin, adminDetails,sendMessage } from "../controllers/admin.controller.js";
import { Router } from "express";
import adminAuth from "../middleware/admin.middleware.js";

const router = Router();

router.route('/signup').post(adminRegistration);
router.route('/signin').post(adminLogin);
router.route('/admin-details').post(adminAuth, adminDetails);

export default router;