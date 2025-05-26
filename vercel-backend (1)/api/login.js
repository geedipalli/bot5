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
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      return res.status(200).send("exist");
    } else {
      return res.status(200).send("notexist");
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
