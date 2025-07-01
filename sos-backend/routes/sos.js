const express = require("express");
const axios = require("axios");
const router = express.Router();
const User = require("../models/User");

const API_KEY = process.env.FAST2SMS_API_KEY;

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message)
    return res.status(400).json({ error: "Missing message" });

  try {
    // Send to all users
    const users = await User.find({});
    const numbers = users.map(u => u.phone).join(",");

    const payload = {
      message: message,
      language: "english",
      route: "q",
      numbers: numbers
    };

    const response = await axios.post("https://www.fast2sms.com/dev/bulkV2", payload, {
      headers: {
        authorization: API_KEY,
        "Content-Type": "application/json"
      }
    });

    console.log("✅ SMS sent:", response.data);
    res.json({ success: true, count: users.length, response: response.data });

  } catch (err) {
    console.error("❌ SMS failed:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to send SMS", details: err.response?.data });
  }
});

module.exports = router;
