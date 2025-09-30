import { useState } from "react";
import { useAuth } from "./AuthProvider";

const ResetPasswordPage = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(email);
  };

  return (
    <div className="ResetPassword">
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
