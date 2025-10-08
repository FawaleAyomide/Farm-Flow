// src/Auth/AuthProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    // Load saved user if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);

  // 🧭 Auto-load profile when token changes (e.g., refresh or after login)
  useEffect(() => {
    if (token && !user) {
      fetchProfile();
    }
  }, [token]);

  // 🔹 LOGIN
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch("https://farmarket.up.railway.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("🔑 Login response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // ✅ Save token & user to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Update state
      setToken(data.token);
      setUser(data.user);

      // ✅ Redirect to home
      navigate("/home", { replace: true });

      return data;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 SIGNUP
  const signup = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch("https://farmarket.up.railway.app/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      return data;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 FETCH PROFILE
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
      logout(); // clear session if token invalid
    }
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/login", { replace: true });
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ Hook to use Auth anywhere
export const useAuth = () => useContext(AuthContext);
