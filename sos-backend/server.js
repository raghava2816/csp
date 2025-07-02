const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (Atlas)
mongoose.connect(process.env.MONGODB_URI, {
  ssl: true,
  tlsAllowInvalidCertificates: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
const registerRoutes = require("./routes/register");
const sosRoutes = require("./routes/sos");

app.use("/register", registerRoutes);
app.use("/send-sos", sosRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
