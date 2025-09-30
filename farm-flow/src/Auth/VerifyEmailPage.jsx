import { useState } from "react";
import { useAuth } from "./AuthProvider";

function VerifyEmailPage() {
  const { verifyEmail } = useAuth();
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyEmail(code);
  };

  return (
    <div className="VerifyEmail">
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default VerifyEmailPage;
