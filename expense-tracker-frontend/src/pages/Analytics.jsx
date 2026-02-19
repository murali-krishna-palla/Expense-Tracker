import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";
import { PieChart, BarChart3, TrendingUp } from "lucide-react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Analytics() {
  const navigate = useNavigate();
  const { theme, themeId } = useTheme();
  const [categories, setCategories] = useState([]);
  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchAnalytics();
    }
  }, [navigate]);

  const fetchAnalytics = async () => {
    try {
      const categoryRes = await API.get("/analytics/category");
      const monthlyRes = await API.get("/analytics/monthly");

      setCategories(categoryRes.data);
      setMonthly(monthlyRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const chartColors = [
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#6366f1",
    "#14b8a6",
  ];

  // Pie Data
  const pieData = {
    labels: categories.map((item) => item._id),
    datasets: [
      {
        data: categories.map((item) => item.total),
        backgroundColor: chartColors,
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const barData = {
    labels: monthly.map((item) => {
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
      return months[item._id - 1] || `Month ${item._id}`;
    }),
    datasets: [
      {
        label: "Monthly Total",
        data: monthly.map((item) => item.total),
        backgroundColor: theme.chartAccent,
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 40,
      },
    ],
  };

  const isNoir = themeId === "noir";
  const gridColor = isNoir ? "#334155" : "#f1f5f9";
  const tickColor = isNoir ? "#64748b" : "#94a3b8";
  const legendColor = isNoir ? "#cbd5e1" : undefined;

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          font: { size: 13, family: "inherit" },
          color: legendColor,
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 13, family: "inherit" },
          color: tickColor,
        },
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          font: { size: 13, family: "inherit" },
          color: tickColor,
        },
      },
    },
  };

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className={`text-2xl sm:text-3xl font-bold ${theme.textPrimary}`}>
          Analytics
        </h1>
        <p className={`${theme.textSecondary} mt-1`}>
          Visualize your spending patterns
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown - Pie */}
        <div className={`${theme.cardBg} rounded-2xl shadow-sm border ${theme.cardBorder} p-6 animate-slide-up`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 ${theme.accentBg} rounded-xl flex items-center justify-center`}>
              <PieChart className={`w-5 h-5 ${theme.accent}`} />
            </div>
            <div>
              <h2 className={`font-semibold ${theme.textPrimary}`}>
                Category Breakdown
              </h2>
              <p className={`text-sm ${theme.textMuted}`}>
                Expenses by category
              </p>
            </div>
          </div>
          <div className="h-80">
            {categories.length > 0 ? (
              <Pie data={pieData} options={pieOptions} />
            ) : (
              <div className={`h-full flex flex-col items-center justify-center ${theme.textMuted}`}>
                <PieChart className="w-12 h-12 mb-3 opacity-30" />
                <p className="font-medium">No data yet</p>
                <p className="text-sm">Add transactions to see breakdown</p>
              </div>
            )}
          </div>
        </div>

        {/* Monthly Report - Bar */}
        <div className={`${theme.cardBg} rounded-2xl shadow-sm border ${theme.cardBorder} p-6 animate-slide-up`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 ${theme.accentBg} rounded-xl flex items-center justify-center`}>
              <BarChart3 className={`w-5 h-5 ${theme.accent}`} />
            </div>
            <div>
              <h2 className={`font-semibold ${theme.textPrimary}`}>
                Monthly Report
              </h2>
              <p className={`text-sm ${theme.textMuted}`}>
                Spending over time
              </p>
            </div>
          </div>
          <div className="h-80">
            {monthly.length > 0 ? (
              <Bar data={barData} options={barOptions} />
            ) : (
              <div className={`h-full flex flex-col items-center justify-center ${theme.textMuted}`}>
                <BarChart3 className="w-12 h-12 mb-3 opacity-30" />
                <p className="font-medium">No data yet</p>
                <p className="text-sm">Add transactions to see trends</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category List */}
      {categories.length > 0 && (
        <div className={`mt-6 ${theme.cardBg} rounded-2xl shadow-sm border ${theme.cardBorder} p-6 animate-slide-up`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 ${theme.accentBg} rounded-xl flex items-center justify-center`}>
              <TrendingUp className={`w-5 h-5 ${theme.accent}`} />
            </div>
            <div>
              <h2 className={`font-semibold ${theme.textPrimary}`}>
                Top Categories
              </h2>
              <p className={`text-sm ${theme.textMuted}`}>
                Where your money goes
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {categories
              .sort((a, b) => b.total - a.total)
              .map((cat, i) => {
                const maxTotal = Math.max(
                  ...categories.map((c) => c.total)
                );
                const percentage = Math.round(
                  (cat.total / maxTotal) * 100
                );
                return (
                  <div key={i} className="group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              chartColors[i % chartColors.length],
                          }}
                        />
                        <span className={`text-sm font-medium ${theme.textSecondary}`}>
                          {cat._id}
                        </span>
                      </div>
                      <span className={`text-sm font-bold ${theme.textPrimary}`}>
                        ₹{cat.total?.toLocaleString()}
                      </span>
                    </div>
                    <div className={`w-full ${theme.progressBg} rounded-full h-2`}>
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor:
                            chartColors[i % chartColors.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Analytics;
