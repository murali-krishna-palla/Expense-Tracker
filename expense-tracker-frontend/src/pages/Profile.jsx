import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";
import {
  User,
  Mail,
  Lock,
  ChevronRight,
  LogOut,
  Trash2,
  Bell,
  Palette,
  HelpCircle,
  Info,
  AlertTriangle,
  Eye,
  EyeOff,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeletePass, setShowDeletePass] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 500);
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error("Please enter your password");
      return;
    }

    setDeleting(true);
    try {
      await API.delete("/auth/delete-account", {
        data: { password: deletePassword },
      });
      localStorage.removeItem("token");
      toast.success("Account deleted successfully");
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account");
    } finally {
      setDeleting(false);
    }
  };

  const settingsItems = [
    {
      label: "Change Password",
      description: "Update your security credentials",
      icon: Lock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      action: () => navigate("/change-password"),
    },
    {
      label: "Notifications",
      description: "Manage your notification preferences",
      icon: Bell,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      action: () => toast("Coming soon!", { icon: "\u{1F514}" }),
    },
    {
      label: "Appearance",
      description: "Customize the look and feel",
      icon: Palette,
      iconBg: "bg-pink-50",
      iconColor: "text-pink-600",
      action: () => navigate("/appearance"),
    },
    {
      label: "Help & Support",
      description: "Get help with using the app",
      icon: HelpCircle,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      action: () => toast("Coming soon!", { icon: "\u2753" }),
    },
    {
      label: "About",
      description: "Version 1.0.0",
      icon: Info,
      iconBg: "bg-slate-100",
      iconColor: "text-slate-600",
      action: () => toast("Finora v1.0.0", { icon: "\u2139\uFE0F" }),
    },
  ];

  return (
    <Layout>
      <Toaster position="top-right" />

      <div className="max-w-2xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-2xl sm:text-3xl font-bold ${theme.textPrimary}`}>
            Profile
          </h1>
          <p className={`${theme.textSecondary} mt-1`}>
            Manage your account & settings
          </p>
        </div>

        {/* Profile Card */}
        {user && (
          <div className={`${theme.cardBg} rounded-2xl shadow-sm border ${theme.cardBorder} p-6 sm:p-8 mb-6 animate-slide-up`}>
            <div className="flex items-start gap-5">
              {/* Avatar */}
              <div className={`w-16 h-16 ${theme.avatarBg} rounded-2xl flex items-center justify-center shadow-lg ${theme.avatarShadow} shrink-0`}>
                <span className="text-2xl font-bold text-white">
                  {user.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className={`text-xl font-bold ${theme.textPrimary}`}>
                  {user.name}
                </h2>
                <div className={`flex items-center gap-2 mt-1 ${theme.textSecondary}`}>
                  <Mail className="w-4 h-4" />
                  <span className="text-sm truncate">{user.email}</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className={`border-t ${theme.borderDivider} my-6`} />

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`flex items-center gap-3 p-4 ${theme.subtleBg} rounded-xl`}>
                <div className={`w-10 h-10 ${theme.accentLight} rounded-xl flex items-center justify-center`}>
                  <User className={`w-5 h-5 ${theme.accent}`} />
                </div>
                <div>
                  <p className={`text-xs ${theme.textMuted} font-medium`}>
                    Full Name
                  </p>
                  <p className={`text-sm font-semibold ${theme.textPrimary}`}>
                    {user.name}
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-3 p-4 ${theme.subtleBg} rounded-xl`}>
                <div className={`w-10 h-10 ${theme.accentLight} rounded-xl flex items-center justify-center`}>
                  <Mail className={`w-5 h-5 ${theme.accent}`} />
                </div>
                <div>
                  <p className={`text-xs ${theme.textMuted} font-medium`}>
                    Email Address
                  </p>
                  <p className={`text-sm font-semibold ${theme.textPrimary} truncate`}>
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Card */}
        <div className={`${theme.cardBg} rounded-2xl shadow-sm border ${theme.cardBorder} overflow-hidden mb-6 animate-slide-up`}>
          <div className={`px-6 py-4 border-b ${theme.borderDivider}`}>
            <h3 className={`font-semibold ${theme.textPrimary}`}>Settings</h3>
          </div>
          <div className={`${theme.divider}`}>
            {settingsItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  onClick={item.action}
                  className={`w-full flex items-center gap-4 px-6 py-4 ${theme.hoverBg} transition-colors group text-left`}
                >
                  <div
                    className={`w-10 h-10 ${item.iconBg} rounded-xl flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${theme.textPrimary}`}>
                      {item.label}
                    </p>
                    <p className={`text-xs ${theme.textMuted} mt-0.5`}>
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${theme.textMuted} group-hover:${theme.textSecondary} transition-colors shrink-0`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Danger Zone */}
        <div className={`${theme.cardBg} rounded-2xl shadow-sm border ${theme.cardBorder} overflow-hidden animate-slide-up`}>
          <div className={`px-6 py-4 border-b ${theme.borderDivider}`}>
            <h3 className="font-semibold text-red-600 text-sm">Danger Zone</h3>
          </div>
          <div className={`${theme.divider}`}>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-50 transition-colors group text-left"
            >
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                <LogOut className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-red-600">
                  Log Out
                </p>
                <p className={`text-xs ${theme.textMuted} mt-0.5`}>
                  Sign out of your account
                </p>
              </div>
              <ChevronRight className={`w-4 h-4 ${theme.textMuted} group-hover:text-red-400 transition-colors shrink-0`} />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-50 transition-colors group text-left"
            >
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-red-600">
                  Delete Account
                </p>
                <p className={`text-xs ${theme.textMuted} mt-0.5`}>
                  Permanently delete your account and data
                </p>
              </div>
              <ChevronRight className={`w-4 h-4 ${theme.textMuted} group-hover:text-red-400 transition-colors shrink-0`} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setShowDeleteModal(false);
              setDeletePassword("");
              setShowDeletePass(false);
            }}
          />

          {/* Modal */}
          <div className={`relative w-full max-w-md ${theme.cardBg} rounded-2xl shadow-2xl border ${theme.cardBorder} animate-slide-up overflow-hidden`}>
            {/* Red header */}
            <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Delete Account</h3>
                    <p className="text-sm text-white/70">This action is irreversible</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletePassword("");
                    setShowDeletePass(false);
                  }}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-5">
                <p className="text-sm text-red-800">
                  <strong>Warning:</strong> This will permanently delete your account, all transactions, and analytics data. This cannot be undone.
                </p>
              </div>

              <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                Enter your password to confirm
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
                <input
                  type={showDeletePass ? "text" : "password"}
                  placeholder="Your password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} placeholder:${theme.textMuted} focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowDeletePass(!showDeletePass)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.textMuted} hover:${theme.textSecondary} transition-colors`}
                >
                  {showDeletePass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletePassword("");
                    setShowDeletePass(false);
                  }}
                  className={`flex-1 py-3 rounded-xl font-semibold ${theme.textSecondary} ${theme.subtleBg} hover:opacity-80 transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting || !deletePassword}
                  className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-3 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {deleting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete Forever
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Profile;
