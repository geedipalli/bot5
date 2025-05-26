import mongoose from "mongoose";
import User from "../models/User";
import connectDB from "./db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    await connectDB();

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).send("exist");
    }

    await User.create({ email, password });

    return res.status(200).send("notexist");
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
