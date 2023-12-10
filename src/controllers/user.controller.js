import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/models.js";

const secretKey =
  process.env.SECRET_KEY || "EG2E386pBbzRt7Mo/YJxw4Rryv98gA6UVTdT5ok2sak=";

// Register user
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if inputs are empty
    if (!username || !password)
      return res.status(400).json({ error: "Fill all inputs." });

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ error: "That user already exists." });

    // Hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User created." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if inputs are empty
    if (!username || !password)
      return res.status(400).json({ error: "Fill all inputs" });

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ error: "Incorrect login details" });

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      res.status(401).json({ error: "Incorrect login details." });

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      secretKey,
      {
        algorithm: "HS256",
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, message: "Login succesfull." });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login error." });
  }
};

// Create ranking by best score
const getRanking = async (req, res) => {
  try {
    const ranking = await User.find({}, "username best_score").sort({
      best_score: -1,
    });
    res.status(200).json(ranking);
  } catch (error) {
    console.error("Error fetching ranking:", error);
    res.status(500).json({ error: "Internal Sever Error" });
  }
};

// Save user score and coins
const saveUserStats = async (req, res) => {
  const { coins, bestScore } = req.body;

  try {
    if (!req.user)
      return res
        .status(401)
        .json({ error: "Unauthorized. User not logged in." });

    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found." });

    user.coins = coins;
    user.best_score = bestScore;

    await user.save();

    res.status(200).json({ message: "User stats saved successfully!" });
  } catch (error) {
    console.error("Error saving user stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Decode token function
const getUserInfoFromToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, secretKey); // secret key

    // Get username
    return {
      userId: decodedToken.userId,
      username: decodedToken.username,
    };
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};

// Export functions
export {
  registerUser,
  loginUser,
  getRanking,
  saveUserStats,
  getUserInfoFromToken,
};
