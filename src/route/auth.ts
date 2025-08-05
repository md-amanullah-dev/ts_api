import express from "express";
import Auth from "../controller/authController"

const router = express.Router();

router.post("/user/signup", Auth.signup);
router.post("/user/login", Auth.login);

export default router;
