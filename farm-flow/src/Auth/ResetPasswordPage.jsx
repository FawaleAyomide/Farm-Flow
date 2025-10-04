// src/pages/RequestReset.js
import { useState } from "react";
import { useAuth } from "./AuthProvider";
function RequestReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/request-reset", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.error || "Something went wrong");
    }
  };

  return (
    <div className="loginpage">
      <div className="head">
        <h2>Request Password Reset</h2>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button className="onboarding-btn" type="submit">
          Send Reset Link
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RequestReset;
