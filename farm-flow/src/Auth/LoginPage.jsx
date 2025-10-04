import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import apple from "../Images/Apple Icon.svg";
import google from "../Images/Google Icon.svg";
import "../Style/auth.css";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await login(email, password);
      navigate("/home", { replace: true });
    } catch (err) {
      setErrors({ form: err.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginpage">
      <div className="head">
        <h1>Farm Flow</h1>
        <p>Welcome back!</p>
      </div>
      {errors.form && <p className="error">{errors.form}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-wrapper">
          <label htmlFor="email">Enter your Email Address</label>
          <input
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="err-msg">
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        </div>

        <div className="password-wrapper">
          <div className="input-wrapper">
            <label htmlFor="password">Enter Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="err-msg">
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
          </div>
          <div
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <RiEyeLine size={20} /> : <RiEyeOffLine size={20} />}
          </div>
        </div>

        <Link to="/reset-password" className="forget-pwd">
          Forgot Password?
        </Link>

        <button type="submit" className="onboarding-btn" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="divider">
        <hr /> Or <hr />
      </div>

      <div className="google-apple-login">
        <button type="button" className="onboarding-btn google-btn">
          <img src={google} alt="Google login" />
          Google
        </button>
        <button type="button" className="onboarding-btn apple-btn">
          <img src={apple} alt="Apple login" />
          Apple
        </button>
      </div>

      <p className="new-user">
        New User?{" "}
        <Link to="/signup" className="signup-link">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
