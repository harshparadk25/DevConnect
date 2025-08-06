const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const projectRoutes = require("./routes/project");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// CORS setup for multiple origins (localhost + vercel)
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_BASE_URL, // e.g., https://dev-connect-mauve-phi.vercel.app
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server or postman requests with no origin
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
