import {userRegistration,userLogin} from "../controllers/user.controller.js";
import { Router } from "express";

const router=Router();

router.route("/signup").post(userRegistration)
router.route("/login").post(userLogin)


export default router;