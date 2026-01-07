const express = require("express");
const router = express.Router();

const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense
} = require("../controllers/expenseController");

const protect = require("../middleware/authMiddleware");

// Protect all expense routes
router.use(protect);

// Routes
router.post("/", addExpense);          // ✅ correct
router.get("/", getExpenses);          // ✅ correct
router.put("/:id", updateExpense);     // ✅ correct
router.delete("/:id", deleteExpense);  // ✅ correct


module.exports = router;
