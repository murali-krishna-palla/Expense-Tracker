const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());

// =====================
// Routes (MUST be mounted)
// =====================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));


// Test / Health Route
app.get("/", (req, res) => {
  res.send("Expense Tracker Backend Running 🚀");
});

// =====================
// Server Start
// =====================
const PORT = process.env.PORT || 9000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
