const Expense = require("../models/Expense");

// ➕ Add Expense
const addExpense = async (req, res) => {
  try {
    const { amount, type, category, note, date } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const expense = await Expense.create({
      user: req.user,
      amount,
      type,
      category,
      note,
      date
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📄 Get User Expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user }).sort({
      date: -1
    });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update Expense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    Object.assign(expense, req.body);
    await expense.save();

    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🗑️ Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense
};
