import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FarishtaaLogo from "../components/logo/FarishtaaLogo";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { clearChat } from "../store/slices/patientSlice";
import { setLanguage } from "../store/slices/languageSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, userId } = useSelector((state) => state.auth);
  const { language } = useSelector((state) => state.language);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearChat());
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FarishtaaLogo className="w-10 h-10" />
          <div className="leading-tight">
            <div className="text-lg font-bold text-red-600">फरिश्ता</div>
            <div className="text-[11px] text-gray-500">Healthcare Companion</div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition">
            🏠 Home
          </Link>
          <Link to="/categories" className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition">
            🩺 Consult Doctor
          </Link>
          {isLoggedIn && (
            <Link to={`/symptoms/${userId}`} className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition">
              🤖 AI Symptoms Checker
            </Link>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          {isLoggedIn && (
            <select
              value={language}
              onChange={(e) => dispatch(setLanguage(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 bg-white"
            >
              <option value="en">🇺🇸 English</option>
              <option value="hi">🇮🇳 हिंदी</option>
              <option value="or">🇮🇳 ଓଡିଆ</option>
            </select>
          )}

          {/* Auth Buttons */}
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition"
              >
                🔑 Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition flex items-center gap-1"
              >
                🚀 Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* User Avatar */}
              <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-semibold">
                U
              </div>
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-red-600 transition flex items-center gap-1"
              >
                🔓 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;