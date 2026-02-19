import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Analytics from "./pages/Analytics";
import EditExpense from "./pages/EditExpense";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Appearance from "./pages/Appearance";
import ForgotPassword from "./pages/ForgotPassword";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/edit-expense/:id" element={<EditExpense />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/appearance" element={<Appearance />} />

      </Routes>
    </Router>
  );
}

export default App;
