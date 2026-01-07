const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    },
    category: {
      type: String,
      required: true
    },
    note: String,
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// 🔥 PREVENT MODEL CACHE ISSUES
module.exports =
  mongoose.models.Expense ||
  mongoose.model("Expense", expenseSchema);
