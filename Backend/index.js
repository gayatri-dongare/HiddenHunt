const express = require("express");
const cors = require("cors");
require("dotenv").config();

const gemRoutes = require("./routes/gemRoutes");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

const connectDB = require("./config/db");

const app = express();

// CONNECT DB
connectDB();

// MIDDLEWARE
app.use(express.json());

// ✅ CORS FIX (IMPORTANT)
app.use(
  cors({
    origin: "*", // we will restrict later after frontend deploy
    credentials: true,
  })
);

// ROUTES
app.use("/api/gems", gemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Hidden Hunt API running");
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});