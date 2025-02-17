import express from "express";
import { signup, login } from "../controllers/authController";
import { validateSignup, validateLogin } from "../utils/validators";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);

export default router;
