import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useTheme, themes } from "../context/ThemeContext";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function Appearance() {
  const navigate = useNavigate();
  const { theme, themeId, setTheme } = useTheme();

  const themeList = Object.values(themes);

  const handleThemeChange = (id) => {
    setTheme(id);
    toast.success(`Theme changed to ${themes[id].name}`, {
      icon: "✨",
      style: {
        borderRadius: "12px",
      },
    });
  };

  return (
    <Layout>
      <Toaster position="top-right" />

      <div className="max-w-2xl mx-auto animate-fade-in">
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
            <div className={`w-12 h-12 ${theme.avatarBg} rounded-xl flex items-center justify-center`}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${theme.textPrimary}`}>
                Appearance
              </h1>
              <p className={`${theme.textSecondary} text-sm`}>
                Choose your luxury theme
              </p>
            </div>
          </div>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {themeList.map((t) => {
            const isSelected = themeId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={`relative group rounded-2xl border-2 transition-all duration-300 overflow-hidden text-left ${
                  isSelected
                    ? `border-current ${theme.accent} shadow-xl scale-[1.02]`
                    : `${theme.cardBorder} hover:shadow-lg`
                }`}
              >
                {/* Selected badge */}
                {isSelected && (
                  <div
                    className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: t.preview[0] }}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Theme Preview Banner */}
                <div
                  className="h-28 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${t.preview[0]} 0%, ${t.preview[1]} 50%, ${t.preview[2]} 100%)`,
                  }}
                >
                  <div
                    className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-20"
                    style={{ backgroundColor: t.preview[2] }}
                  />
                  <div
                    className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-15"
                    style={{ backgroundColor: t.preview[3] }}
                  />
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="flex gap-2">
                      {t.preview.map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-lg border-2 border-white/30 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Theme Info */}
                <div className={`p-4 ${t.id === "noir" ? "bg-slate-900" : theme.cardBg}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className={`font-bold text-sm ${
                        t.id === "noir" ? "text-slate-100" : theme.textPrimary
                      }`}
                    >
                      {t.name}
                    </h3>
                    {isSelected && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: t.preview[0] + "20", color: t.preview[0] }}
                      >
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs ${
                      t.id === "noir" ? "text-slate-400" : theme.textSecondary
                    }`}
                  >
                    {t.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Theme Info */}
        <div className={`mt-8 ${theme.cardBg} rounded-2xl shadow-sm border ${theme.cardBorder} p-6 animate-slide-up`}>
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${themes[themeId].preview[0]}, ${themes[themeId].preview[1]})`,
              }}
            />
            <div className="flex-1">
              <p className={`text-xs ${theme.textMuted} font-medium uppercase tracking-wider`}>
                Current Theme
              </p>
              <p className={`text-lg font-bold ${theme.textPrimary}`}>
                {themes[themeId].name}
              </p>
              <p className={`text-sm ${theme.textSecondary}`}>
                {themes[themeId].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Appearance;
