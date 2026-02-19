import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Search,
  Filter,
  Calendar,
  ArrowUpDown,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Receipt,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [showFilters, setShowFilters] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchData();
    }
  }, [navigate, page]);

  const fetchData = async () => {
    try {
      const expenseRes = await API.get(
        `/expenses?page=${page}&limit=5`
      );

      const summaryRes = await API.get("/analytics/summary");

      setExpenses(expenseRes.data?.expenses || []);
      setTotalPages(expenseRes.data?.totalPages || 1);
      setSummary(summaryRes.data || null);
    } catch (err) {
      console.log(err);
      setExpenses([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      toast.success("Transaction deleted");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete");
      console.log(err);
    }
  };

  const safeExpenses = expenses || [];

  const filteredExpenses = safeExpenses
    .filter((item) =>
      item?.category?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      filterType === "all" ? true : item?.type === filterType
    )
    .filter((item) => {
      if (!startDate && !endDate) return true;

      const itemDate = new Date(item?.date);

      if (startDate && itemDate < new Date(startDate)) return false;
      if (endDate && itemDate > new Date(endDate)) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortType === "latest")
        return new Date(b.date) - new Date(a.date);

      if (sortType === "oldest")
        return new Date(a.date) - new Date(b.date);

      if (sortType === "amount-high") return b.amount - a.amount;

      if (sortType === "amount-low") return a.amount - b.amount;

      return 0;
    });

  const summaryCards = summary
    ? [
        {
          title: "Total Income",
          value: summary.totalIncome,
          icon: TrendingUp,
          bg: `bg-gradient-to-br ${theme.incomeCard}`,
          shadow: theme.incomeShadow,
        },
        {
          title: "Total Expense",
          value: summary.totalExpense,
          icon: TrendingDown,
          bg: `bg-gradient-to-br ${theme.expenseCard}`,
          shadow: theme.expenseShadow,
        },
        {
          title: "Balance",
          value: summary.balance,
          icon: Wallet,
          bg: `bg-gradient-to-br ${theme.balanceCard}`,
          shadow: theme.balanceShadow,
        },
      ]
    : [];

  return (
    <Layout>
      <Toaster position="top-right" />

      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className={`text-2xl sm:text-3xl font-bold ${theme.textPrimary}`}>
          Dashboard
        </h1>
        <p className={`${theme.textSecondary} mt-1`}>
          Overview of your financial activity
        </p>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {summaryCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className={`animate-slide-up ${card.bg} rounded-2xl p-6 text-white shadow-lg ${card.shadow} relative overflow-hidden`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-white/80">
                      {card.title}
                    </p>
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold">
                    ₹{card.value?.toLocaleString() || "0"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Transactions Section */}
      <div className={`${theme.cardBg} rounded-2xl shadow-sm border ${theme.cardBorder} overflow-hidden animate-slide-up`}>
        {/* Section Header & Search */}
        <div className={`p-5 sm:p-6 border-b ${theme.borderDivider}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className={`text-lg font-semibold ${theme.textPrimary}`}>
              Recent Transactions
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:flex-initial">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textMuted}`} />
                <input
                  type="text"
                  placeholder="Search category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full sm:w-56 pl-10 pr-4 py-2.5 rounded-xl border ${theme.inputBorder} text-sm ${theme.inputText} ${theme.inputBg} placeholder:${theme.textMuted} focus:outline-none focus:ring-2 ${theme.inputFocus} focus:border-transparent transition-all`}
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2.5 rounded-xl border transition-all ${
                  showFilters
                    ? theme.filterActive
                    : theme.filterInactive
                }`}
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className={`mt-4 pt-4 border-t ${theme.borderDivider} grid grid-cols-1 sm:grid-cols-4 gap-3 animate-fade-in`}>
              <div>
                <label className={`block text-xs font-medium ${theme.textSecondary} mb-1.5`}>
                  Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={`w-full py-2.5 px-3 rounded-xl border ${theme.inputBorder} text-sm ${theme.inputText} focus:outline-none focus:ring-2 ${theme.inputFocus} ${theme.inputBg}`}
                >
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className={`block text-xs font-medium ${theme.textSecondary} mb-1.5`}>
                  From
                </label>
                <div className="relative">
                  <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textMuted} pointer-events-none`} />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={`w-full py-2.5 pl-10 pr-3 rounded-xl border ${theme.inputBorder} text-sm ${theme.inputText} focus:outline-none focus:ring-2 ${theme.inputFocus} ${theme.inputBg}`}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-xs font-medium ${theme.textSecondary} mb-1.5`}>
                  To
                </label>
                <div className="relative">
                  <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textMuted} pointer-events-none`} />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={`w-full py-2.5 pl-10 pr-3 rounded-xl border ${theme.inputBorder} text-sm ${theme.inputText} focus:outline-none focus:ring-2 ${theme.inputFocus} ${theme.inputBg}`}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-xs font-medium ${theme.textSecondary} mb-1.5`}>
                  Sort By
                </label>
                <div className="relative">
                  <ArrowUpDown className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textMuted} pointer-events-none`} />
                  <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className={`w-full py-2.5 pl-10 pr-3 rounded-xl border ${theme.inputBorder} text-sm ${theme.inputText} focus:outline-none focus:ring-2 ${theme.inputFocus} ${theme.inputBg}`}
                  >
                    <option value="latest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="amount-high">Amount: High to Low</option>
                    <option value="amount-low">Amount: Low to High</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transactions List */}
        <div className={`${theme.divider}`}>
          {filteredExpenses.length === 0 ? (
            <div className={`py-16 flex flex-col items-center justify-center ${theme.textMuted}`}>
              <Receipt className="w-12 h-12 mb-3 opacity-40" />
              <p className="font-medium">No transactions found</p>
              <p className="text-sm mt-1">
                Add your first transaction to get started
              </p>
            </div>
          ) : (
            filteredExpenses.map((item) => (
              <div
                key={item._id}
                className={`px-5 sm:px-6 py-4 flex items-center justify-between ${theme.hoverBg} transition-colors group`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      item.type === "income"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {item.type === "income" ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className={`font-semibold ${theme.textPrimary}`}>
                      {item.category}
                    </p>
                    <p className={`text-sm ${theme.textMuted}`}>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {item.note && (
                        <span className={`ml-2 ${theme.textMuted} opacity-60`}>
                          · {item.note}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`text-lg font-bold ${
                      item.type === "income"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {item.type === "income" ? "+" : "-"}₹
                    {item.amount?.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() =>
                        navigate(`/edit-expense/${item._id}`)
                      }
                      className={`p-2 rounded-lg ${theme.hoverBg} ${theme.textMuted} hover:${theme.accent} transition-all`}
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredExpenses.length > 0 && (
          <div className={`px-5 sm:px-6 py-4 border-t ${theme.borderDivider} flex items-center justify-between`}>
            <p className={`text-sm ${theme.textSecondary}`}>
              Page {page} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`p-2 rounded-lg border ${theme.inputBorder} ${theme.textSecondary} ${theme.hoverBg} disabled:opacity-40 disabled:cursor-not-allowed transition-all`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={`p-2 rounded-lg border ${theme.inputBorder} ${theme.textSecondary} ${theme.hoverBg} disabled:opacity-40 disabled:cursor-not-allowed transition-all`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;
