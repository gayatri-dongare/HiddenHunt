const express = require("express");
const gemRoutes = require("./routes/gemRoutes");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());


const connectDB = require("./config/db");
connectDB();

app.use("/api/gems", gemRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Hidden Hunt API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YWZmZDU0ZDA4NTg3YjRlMTRjMWRlZiIsImlhdCI6MTc3MzE2NTUzMSwiZXhwIjoxNzczNzcwMzMxfQ.S_6zXrEJwtNMAJbDDjlH2Uh7Zzs3zZP_5ly33II941A"

