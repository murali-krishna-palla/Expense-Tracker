import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";
import { Lock, Shield, Save, ArrowLeft, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function ChangePassword() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await API.put("/auth/change-password", {
        oldPassword,
        newPassword,
      });

      toast.success("Password updated successfully!");
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Toaster position="top-right" />

      <div className="max-w-lg mx-auto animate-fade-in">
        {/* Back button */}
        <button
          onClick={() => navigate("/profile")}
          className={`flex items-center gap-2 text-sm ${theme.textSecondary} hover:${theme.accent} transition-colors mb-6`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 ${theme.accentBg} rounded-xl flex items-center justify-center`}>
              <Shield className={`w-6 h-6 ${theme.accent}`} />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
                Change Password
              </h1>
              <p className={`${theme.textSecondary} text-sm`}>
                Update your security credentials
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className={`${theme.cardBg} rounded-2xl shadow-sm border ${theme.cardBorder} p-6 sm:p-8 animate-slide-up`}>
          {/* Security tip */}
          <div className={`${theme.accentBg} border ${theme.accentBorder} rounded-xl p-4 mb-6`}>
            <p className={`text-sm ${theme.textPrimary}`}>
              <strong>Tip:</strong> Use a strong password with at least 6 characters, including uppercase, lowercase, numbers, and symbols.
            </p>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-5">
            {/* Current Password */}
            <div>
              <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                Current Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
                <input
                  type={showOld ? "text" : "password"}
                  placeholder="Enter current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} placeholder:${theme.textMuted} focus:outline-none focus:ring-2 ${theme.inputFocus} focus:border-transparent transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.textMuted} hover:${theme.textSecondary} transition-colors`}
                >
                  {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                New Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} placeholder:${theme.textMuted} focus:outline-none focus:ring-2 ${theme.inputFocus} focus:border-transparent transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.textMuted} hover:${theme.textSecondary} transition-colors`}
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textMuted}`} />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border ${theme.inputBg} ${theme.inputText} placeholder:${theme.textMuted} focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                    confirmPassword && confirmPassword !== newPassword
                      ? "border-red-300 focus:ring-red-500"
                      : `${theme.inputBorder} ${theme.inputFocus}`
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.textMuted} hover:${theme.textSecondary} transition-colors`}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && confirmPassword !== newPassword && (
                <p className="text-xs text-red-500 mt-1.5">Passwords don&apos;t match</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className={`flex-1 py-3 rounded-xl font-semibold ${theme.textSecondary} ${theme.subtleBg} hover:opacity-80 transition-all duration-200`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 ${theme.btnPrimary} text-white py-3 rounded-xl font-semibold focus:outline-none focus:ring-2 ${theme.btnRing} focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Update
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ChangePassword;
