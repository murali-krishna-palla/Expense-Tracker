import { createContext, useContext, useState, useEffect } from "react";

// 4 Luxury Theme Palettes
export const themes = {
  royal: {
    id: "royal",
    name: "Royal Amethyst",
    description: "Deep violet & indigo with gold accents",
    preview: ["#7c3aed", "#4f46e5", "#f5c542", "#1e1b4b"],
    // Sidebar & Nav
    sidebarBg: "bg-white",
    sidebarBorder: "border-slate-200",
    logoBg: "bg-gradient-to-br from-violet-600 to-indigo-600",
    logoShadow: "shadow-violet-200",
    navActive: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-200",
    navActiveIcon: "text-white",
    navInactive: "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
    navInactiveIcon: "text-slate-400 group-hover:text-violet-600",
    // Page
    pageBg: "bg-slate-50",
    cardBg: "bg-white",
    cardBorder: "border-slate-200",
    // Text
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-500",
    textMuted: "text-slate-400",
    // Buttons
    btnPrimary: "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-violet-200",
    btnRing: "focus:ring-violet-500",
    // Accents
    accent: "text-violet-600",
    accentBg: "bg-violet-50",
    accentBorder: "border-violet-200",
    accentLight: "bg-violet-100",
    // Summary cards
    incomeCard: "from-emerald-500 to-emerald-600",
    incomeShadow: "shadow-emerald-200",
    expenseCard: "from-rose-500 to-rose-600",
    expenseShadow: "shadow-rose-200",
    balanceCard: "from-violet-500 to-indigo-600",
    balanceShadow: "shadow-violet-200",
    // Avatar
    avatarBg: "bg-gradient-to-br from-violet-600 to-indigo-600",
    avatarShadow: "shadow-violet-200",
    // Mobile bar
    mobileBg: "bg-white",
    mobileBorder: "border-slate-200",
    mobileText: "text-slate-800",
    // Input focus
    inputFocus: "focus:ring-violet-500",
    // Category chips active
    chipActive: "bg-violet-100 text-violet-700 border-violet-200",
    // Inputs & internals
    inputBg: "bg-white",
    inputBorder: "border-slate-200",
    inputText: "text-slate-800",
    hoverBg: "hover:bg-slate-50/70",
    divider: "divide-slate-100",
    borderDivider: "border-slate-100",
    subtleBg: "bg-slate-50",
    chartAccent: "#8b5cf6",
    progressBg: "bg-slate-100",
    filterActive: "bg-violet-50 border-violet-200 text-violet-600",
    filterInactive: "border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300",
  },

  noir: {
    id: "noir",
    name: "Midnight Noir",
    description: "Sleek dark with champagne gold highlights",
    preview: ["#0f172a", "#1e293b", "#d4af37", "#f8fafc"],
    sidebarBg: "bg-slate-900",
    sidebarBorder: "border-slate-800",
    logoBg: "bg-gradient-to-br from-amber-500 to-yellow-600",
    logoShadow: "shadow-amber-900/30",
    navActive: "bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 shadow-lg shadow-amber-900/30",
    navActiveIcon: "text-slate-900",
    navInactive: "text-slate-400 hover:bg-slate-800 hover:text-slate-200",
    navInactiveIcon: "text-slate-500 group-hover:text-amber-500",
    pageBg: "bg-slate-950",
    cardBg: "bg-slate-900",
    cardBorder: "border-slate-800",
    textPrimary: "text-slate-100",
    textSecondary: "text-slate-400",
    textMuted: "text-slate-500",
    btnPrimary: "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-amber-900/30",
    btnRing: "focus:ring-amber-500",
    accent: "text-amber-500",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30",
    accentLight: "bg-amber-500/20",
    incomeCard: "from-emerald-600 to-emerald-700",
    incomeShadow: "shadow-emerald-900/30",
    expenseCard: "from-rose-600 to-rose-700",
    expenseShadow: "shadow-rose-900/30",
    balanceCard: "from-amber-500 to-yellow-600",
    balanceShadow: "shadow-amber-900/30",
    avatarBg: "bg-gradient-to-br from-amber-500 to-yellow-600",
    avatarShadow: "shadow-amber-900/30",
    mobileBg: "bg-slate-900",
    mobileBorder: "border-slate-800",
    mobileText: "text-slate-100",
    inputFocus: "focus:ring-amber-500",
    chipActive: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    inputBg: "bg-slate-800",
    inputBorder: "border-slate-700",
    inputText: "text-slate-200",
    hoverBg: "hover:bg-slate-800/50",
    divider: "divide-slate-800",
    borderDivider: "border-slate-800",
    subtleBg: "bg-slate-800",
    chartAccent: "#d4af37",
    progressBg: "bg-slate-800",
    filterActive: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    filterInactive: "border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600",
  },

  emerald: {
    id: "emerald",
    name: "Emerald Estate",
    description: "Rich greens & ivory with rose gold touches",
    preview: ["#047857", "#065f46", "#e8c4b0", "#f0fdf4"],
    sidebarBg: "bg-white",
    sidebarBorder: "border-emerald-100",
    logoBg: "bg-gradient-to-br from-emerald-600 to-teal-700",
    logoShadow: "shadow-emerald-200",
    navActive: "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-200",
    navActiveIcon: "text-white",
    navInactive: "text-slate-600 hover:bg-emerald-50 hover:text-slate-900",
    navInactiveIcon: "text-slate-400 group-hover:text-emerald-600",
    pageBg: "bg-emerald-50/30",
    cardBg: "bg-white",
    cardBorder: "border-emerald-100",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-500",
    textMuted: "text-slate-400",
    btnPrimary: "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-emerald-200",
    btnRing: "focus:ring-emerald-500",
    accent: "text-emerald-600",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-200",
    accentLight: "bg-emerald-100",
    incomeCard: "from-emerald-500 to-teal-600",
    incomeShadow: "shadow-emerald-200",
    expenseCard: "from-rose-400 to-rose-500",
    expenseShadow: "shadow-rose-200",
    balanceCard: "from-teal-600 to-cyan-600",
    balanceShadow: "shadow-teal-200",
    avatarBg: "bg-gradient-to-br from-emerald-600 to-teal-700",
    avatarShadow: "shadow-emerald-200",
    mobileBg: "bg-white",
    mobileBorder: "border-emerald-100",
    mobileText: "text-slate-800",
    inputFocus: "focus:ring-emerald-500",
    chipActive: "bg-emerald-100 text-emerald-700 border-emerald-200",
    inputBg: "bg-white",
    inputBorder: "border-emerald-200",
    inputText: "text-slate-800",
    hoverBg: "hover:bg-emerald-50/50",
    divider: "divide-emerald-100",
    borderDivider: "border-emerald-100",
    subtleBg: "bg-emerald-50",
    chartAccent: "#047857",
    progressBg: "bg-emerald-100",
    filterActive: "bg-emerald-50 border-emerald-200 text-emerald-600",
    filterInactive: "border-emerald-200 text-slate-400 hover:text-slate-600 hover:border-emerald-300",
  },

  rosegold: {
    id: "rosegold",
    name: "Rose Gold Luxe",
    description: "Warm blush tones with copper & cream",
    preview: ["#be185d", "#9d174d", "#f4c2c2", "#fdf2f8"],
    sidebarBg: "bg-white",
    sidebarBorder: "border-pink-100",
    logoBg: "bg-gradient-to-br from-pink-600 to-rose-700",
    logoShadow: "shadow-pink-200",
    navActive: "bg-gradient-to-r from-pink-600 to-rose-700 text-white shadow-lg shadow-pink-200",
    navActiveIcon: "text-white",
    navInactive: "text-slate-600 hover:bg-pink-50 hover:text-slate-900",
    navInactiveIcon: "text-slate-400 group-hover:text-pink-600",
    pageBg: "bg-pink-50/30",
    cardBg: "bg-white",
    cardBorder: "border-pink-100",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-500",
    textMuted: "text-slate-400",
    btnPrimary: "bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-700 hover:to-rose-800 shadow-pink-200",
    btnRing: "focus:ring-pink-500",
    accent: "text-pink-600",
    accentBg: "bg-pink-50",
    accentBorder: "border-pink-200",
    accentLight: "bg-pink-100",
    incomeCard: "from-emerald-500 to-emerald-600",
    incomeShadow: "shadow-emerald-200",
    expenseCard: "from-pink-500 to-rose-600",
    expenseShadow: "shadow-pink-200",
    balanceCard: "from-pink-600 to-rose-700",
    balanceShadow: "shadow-pink-200",
    avatarBg: "bg-gradient-to-br from-pink-600 to-rose-700",
    avatarShadow: "shadow-pink-200",
    mobileBg: "bg-white",
    mobileBorder: "border-pink-100",
    mobileText: "text-slate-800",
    inputFocus: "focus:ring-pink-500",
    chipActive: "bg-pink-100 text-pink-700 border-pink-200",
    inputBg: "bg-white",
    inputBorder: "border-pink-100",
    inputText: "text-slate-800",
    hoverBg: "hover:bg-pink-50/50",
    divider: "divide-pink-100",
    borderDivider: "border-pink-100",
    subtleBg: "bg-pink-50",
    chartAccent: "#be185d",
    progressBg: "bg-pink-100",
    filterActive: "bg-pink-50 border-pink-200 text-pink-600",
    filterInactive: "border-pink-100 text-slate-400 hover:text-slate-600 hover:border-pink-200",
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem("app-theme") || "royal";
  });

  const theme = themes[themeId] || themes.royal;

  useEffect(() => {
    localStorage.setItem("app-theme", themeId);

    // Apply dark mode body classes for noir theme
    if (themeId === "noir") {
      document.body.classList.add("theme-noir");
      document.body.classList.remove("theme-royal", "theme-emerald", "theme-rosegold");
    } else {
      document.body.classList.remove("theme-noir");
      document.body.classList.add(`theme-${themeId}`);
      // Remove other theme classes
      ["royal", "emerald", "rosegold", "noir"]
        .filter((t) => t !== themeId)
        .forEach((t) => document.body.classList.remove(`theme-${t}`));
    }
  }, [themeId]);

  const setTheme = (id) => {
    if (themes[id]) setThemeId(id);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default ThemeContext;
