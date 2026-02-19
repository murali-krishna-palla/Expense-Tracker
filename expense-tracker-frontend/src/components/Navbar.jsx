import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  User,
  LogOut,
  Wallet,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/add-expense", label: "Add Transaction", icon: PlusCircle },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/profile", label: "Profile", icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Top Bar */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-50 ${theme.mobileBg} border-b ${theme.mobileBorder} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 ${theme.logoBg} rounded-lg flex items-center justify-center`}>
            <Wallet className="w-4 h-4 text-white" />
          </div>
          <span className={`font-bold ${theme.mobileText}`}>Finora</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-64 ${theme.sidebarBg} border-r ${theme.sidebarBorder} flex flex-col transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className={`px-6 py-6 border-b ${theme.sidebarBorder}`}>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              navigate("/dashboard");
              setMobileOpen(false);
            }}
          >
            <div className={`w-10 h-10 ${theme.logoBg} rounded-xl flex items-center justify-center shadow-lg ${theme.logoShadow}`}>
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`text-lg font-bold ${theme.textPrimary} leading-tight`}>
                Finora
              </h1>
              <p className={`text-xs ${theme.textMuted} -mt-0.5`}>Finance Manager</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                  ${
                    isActive(item.path)
                      ? theme.navActive
                      : theme.navInactive
                  }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                    isActive(item.path) ? theme.navActiveIcon : theme.navInactiveIcon
                  }`}
                />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-500 transition-transform duration-200 group-hover:scale-110" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
