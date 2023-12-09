import express from "express";
import {
  registerUser,
  loginUser,
  getRanking,
  saveUserStats,
} from "../controllers/user.controller.js";

const router = express.Router();

// Registration endpoint
router.post("/register", registerUser);

// Login endpoint
router.post("/login", loginUser);

// Ranking endpoint
router.post("/ranking", getRanking);

// Stats endpoint
router.post("/stats", saveUserStats);

export default router;
