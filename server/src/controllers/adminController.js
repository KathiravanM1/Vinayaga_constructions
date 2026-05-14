import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password)))
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, token, username: admin.username });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// One-time seed route — creates admin if none exists
export const seedAdmin = async (req, res) => {
  try {
    const exists = await Admin.findOne();
    if (exists) return res.status(400).json({ success: false, message: "Admin already exists" });
    const admin = await Admin.create({ username: "admin", password: "admin@123" });
    res.status(201).json({ success: true, message: "Admin created", username: admin.username });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
