// src/auth/AuthProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    // Load from localStorage if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);

  // 🧭 Auto-redirect if token exists
  useEffect(() => {
    if (token && !user) {
      fetchProfile();
    }
  }, [token]);

  // 🔹 Login function
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await fetch("https://farmarket.up.railway.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Save token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);
      navigate("/home", { replace: true });

      return data;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Signup function (optional if handled on SignupPage)
  const signup = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch("https://farmarket.up.railway.app/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch user profile (if token exists)
  const fetchProfile = async () => {
    try {
      const res = await fetch("https://farmarket.up.railway.app/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch user profile");

      const data = await res.json();
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Auth error:", error);
      logout(); // Clear bad session
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/login");
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use Auth anywhere
export const useAuth = () => useContext(AuthContext);
