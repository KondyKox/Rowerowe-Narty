import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

// Registration endpoint
router.post("/register", registerUser);

// Login endpoint
router.post("/login", loginUser);

export default router;
