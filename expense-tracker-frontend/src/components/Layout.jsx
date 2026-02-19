import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";

function Layout({ children }) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme.pageBg}`}>
      <Navbar />
      {/* Main content area - offset by sidebar width on desktop */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
