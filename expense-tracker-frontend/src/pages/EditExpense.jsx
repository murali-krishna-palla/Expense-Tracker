import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";
import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";
import {
  DollarSign,
  Tag,
  FileText,
  Save,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    try {
      const res = await API.get("/expenses");
      const expense = res.data.find((item) => item._id === id);

      if (expense) {
        setAmount(expense.amount);
        setType(expense.type);
        setCategory(expense.category);
        setNote(expense.note);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load transaction");
    } finally {
      setFetching(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.put(`/expenses/${id}`, {
        amount: Number(amount),
        type,
        category,
        note,
      });

      toast.success("Transaction updated!");
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const suggestedCategories =
    type === "expense"
      ? ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health"]
      : ["Salary", "Freelance", "Investment", "Gift", "Refund", "Other"];

  return (
    <Layout>
      <Toaster position="top-right" />

      <div className="max-w-2xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className={`flex items-center gap-2 text-sm ${theme.textSecondary} hover:${theme.accent} transition-colors mb-4`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className={`text-2xl sm:text-3xl font-bold ${theme.textPrimary}`}>
            Edit Transaction
          </h1>
          <p className={`${theme.textSecondary} mt-1`}>
            Update your transaction details
          </p>
        </div>

        {/* Form Card */}
        <div className={`${theme.cardBg} rounded-2xl shadow-sm border ${theme.cardBorder} p-6 sm:p-8`}>
          {fetching ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className={`w-8 h-8 border-2 ${theme.accentBorder} border-t-2 rounded-full animate-spin mb-3`} style={{ borderTopColor: theme.chartAccent }} />
              <p className={`${theme.textMuted} text-sm`}>Loading transaction...</p>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Type Toggle */}
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-3`}>
                  Transaction Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType("expense")}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      type === "expense"
                        ? "bg-rose-50 text-rose-700 border-2 border-rose-200 shadow-sm"
                        : `${theme.subtleBg} ${theme.textSecondary} border-2 border-transparent hover:opacity-80`
                    }`}
                  >
                    <TrendingDown className="w-4 h-4" />
                    Expense
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("income")}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      type === "income"
                        ? "bg-emerald-50 text-emerald-700 border-2 border-emerald-200 shadow-sm"
                        : `${theme.subtleBg} ${theme.textSecondary} border-2 border-transparent hover:opacity-80`
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    Income
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                  Amount
                </label>
                <div className="relative">
                  <DollarSign className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} text-lg font-semibold placeholder:${theme.textMuted} placeholder:font-normal focus:outline-none focus:ring-2 ${theme.inputFocus} focus:border-transparent transition-all`}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                  Category
                </label>
                <div className="relative">
                  <Tag className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
                  <input
                    type="text"
                    placeholder="e.g. Food, Transport, Salary"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} placeholder:${theme.textMuted} focus:outline-none focus:ring-2 ${theme.inputFocus} focus:border-transparent transition-all`}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {suggestedCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        category === cat
                          ? `${theme.chipActive} border`
                          : `${theme.subtleBg} ${theme.textSecondary} border ${theme.inputBorder} hover:opacity-80`
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div>
                <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                  Note{" "}
                  <span className={`${theme.textMuted} font-normal`}>(optional)</span>
                </label>
                <div className="relative">
                  <FileText className={`absolute left-4 top-3.5 w-5 h-5 ${theme.textMuted}`} />
                  <textarea
                    placeholder="Add a note..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} placeholder:${theme.textMuted} focus:outline-none focus:ring-2 ${theme.inputFocus} focus:border-transparent transition-all resize-none`}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${theme.btnPrimary} text-white py-3.5 rounded-xl font-semibold focus:outline-none focus:ring-2 ${theme.btnRing} focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Update Transaction
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default EditExpense;
