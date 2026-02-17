const Expense = require("../models/Expense");
const mongoose = require("mongoose");

// 📊 Summary (Total Income, Expense, Balance)
const getSummary = async (req, res) => {
  try {
    const userId = req.user;

    const expenses = await Expense.find({ user: userId });

    let totalIncome = 0;
    let totalExpense = 0;

    expenses.forEach((item) => {
      if (item.type === "income") {
        totalIncome += item.amount;
      } else {
        totalExpense += item.amount;
      }
    });

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📊 Category Breakdown
const getCategoryBreakdown = async (req, res) => {
  try {
    const userId = req.user;

    const result = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📊 Monthly Totals
const getMonthlyReport = async (req, res) => {
  try {
    const userId = req.user;

    const result = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getSummary,
  getCategoryBreakdown,
  getMonthlyReport
};
