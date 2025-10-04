import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  async function login(email, password) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      setUser(data.user);
      setToken(data.token);
    } catch (err) {
      alert(err.message);
    }
  }

  async function signup(email, password) {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Signup failed");
      const data = await res.json();
      setUser(data.user);
      setToken(data.token);
    } catch (err) {
      alert(err.message);
    }
  }

  async function resetPassword(email) {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Reset failed");
      alert("Reset link sent to email");
    } catch (err) {
      alert(err.message);
    }
  }

  async function verifyEmail(code) {
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) throw new Error("Verification failed");
      alert("Email verified successfully");
    } catch (err) {
      alert(err.message);
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, resetPassword, verifyEmail, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
