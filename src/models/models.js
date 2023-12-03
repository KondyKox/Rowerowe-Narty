import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true },
  coins: { type: Number, default: 0 },
  best_score: { type: Number, default: 0 },
});

const skinSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, index: true },
  imgSrc: { type: String, unique: true, required: true },
  price: { type: Number, required: true, default: 0 },
});

export const User = mongoose.model("User", userSchema);
export const Skin = mongoose.model("Skin", skinSchema);
