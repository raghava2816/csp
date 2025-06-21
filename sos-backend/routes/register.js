const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { name, phone, userId } = req.body;
  console.log("📥 Received /register request with:", req.body);


  if (!name || !phone || !userId) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const existing = await User.findOne({ userId });
    if (existing) return res.status(409).json({ error: "User already exists" });

    const user = new User({ name, phone, userId });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;