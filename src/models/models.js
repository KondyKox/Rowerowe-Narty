import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  coins: { type: Number },
  best_score: { type: Number },
});

const skinSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  imgSrc: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
});

export const User = mongoose.model("User", userSchema);
export const Skin = mongoose.model("Skin", skinSchema);
