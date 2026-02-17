const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getSummary,
  getCategoryBreakdown,
  getMonthlyReport
} = require("../controllers/analyticsController");

router.use(protect);

router.get("/summary", getSummary);
router.get("/category", getCategoryBreakdown);
router.get("/monthly", getMonthlyReport);

module.exports = router;
