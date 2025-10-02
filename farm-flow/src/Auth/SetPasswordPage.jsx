// src/pages/ResetPassword.js
import { useState, useParams } from "react";
import { useAuth } from "./AuthProvider";

function SetPasswordPage() {
  // const { token } = useParams(); // get token from URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match.");
    }

    try {
      const res = await axios.post(`/api/auth/reset-password/${token}`, {
        password,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.error || "Invalid or expired token.");
    }
  };

  return (
    <div className="loginpage">
      <div className="head">
        <h2>Set a New Password</h2>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          required
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          required
        />
        <button className="onboarding-btn" type="submit">
          Set New Password
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SetPasswordPage;
