import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/models.js";

dotenv.config({ path: "../../.env" });

const secretKey = process.env.SECRET_KEY;

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

// Export functions
export { registerUser, loginUser };
