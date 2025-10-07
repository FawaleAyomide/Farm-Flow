import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { RiEyeLine } from "react-icons/ri";
import { RiEyeOffLine } from "react-icons/ri";
import apple from "../Images/Apple Icon.svg";
import google from "../Images/Google Icon.svg";
import "react-toastify/dist/ReactToastify.css";

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!form.firstName) newErrors.firstName = "First name required";
    if (!form.lastName) newErrors.lastName = "Last name required";

    if (!form.email) newErrors.email = "Email required";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password) newErrors.password = "Password required";
    else if (form.password.length < 6)
      newErrors.password = "At least 6 characters";

    // Debug: log password comparison
    console.log("🔍 Comparing passwords:", {
      password: form.password,
      confirmPassword: form.confirmPassword,
      areEqual: form.password === form.confirmPassword,
    });

    if (form.password !== form.confirmPassword) {
      // Instead of blocking, just show a warning
      console.warn(
        "⚠️ Passwords appear different, but allowing submission for debugging."
      );
      toast.warn("Debug: Passwords appear different (check console).");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const validate = () => {
  //   const newErrors = {};
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //   const trimmedPassword = form.password.trim();
  //   const trimmedConfirm = form.confirmPassword.trim();

  //   if (!form.firstName.trim()) newErrors.firstName = "First name required";
  //   if (!form.lastName.trim()) newErrors.lastName = "Last name required";

  //   if (!form.email.trim()) newErrors.email = "Email required";
  //   else if (!emailRegex.test(form.email.trim()))
  //     newErrors.email = "Invalid email format";

  //   if (!trimmedPassword) newErrors.password = "Password required";
  //   else if (trimmedPassword.length < 6)
  //     newErrors.password = "At least 6 characters";

  //   if (!trimmedConfirm)
  //     newErrors.confirmPassword = "Confirm password required";
  //   else if (trimmedPassword !== trimmedConfirm)
  //     newErrors.confirmPassword = "Passwords do not match";

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Form data before sending:", form); // ✅ debug log

    try {
      setLoading(true);

      const res = await fetch(
        "https://farmarket.up.railway.app/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            password: form.password,
            confirmPassword: form.confirmPassword, // ✅ ensure this is included
          }),
        }
      );

      const data = await res.json();
      console.log("Server response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      toast.success("Account created successfully!", { autoClose: 1500 });
      setTimeout(() => navigate("/login"), 1600);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.message || "Signup error");
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log("Password:", JSON.stringify(form.password));
  //   console.log("Confirm Password:", JSON.stringify(form.confirmPassword));

  //   if (!validate()) return;

  //   setLoading(true);
  //   try {
  //     const res = await fetch(
  //       "https://farmarket.up.railway.app/api/auth/signup",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           firstName: form.firstName.trim(),
  //           lastName: form.lastName.trim(),
  //           email: form.email.trim().toLowerCase(),
  //           password: form.password,
  //         }),
  //       }
  //     );

  //     const result = await res.json();

  //     if (!res.ok) {
  //       throw new Error(result.message || "Registration failed");
  //     }

  //     toast.success("Account created successfully!", { autoClose: 1500 });
  //     setTimeout(() => navigate("/login"), 1600);
  //   } catch (error) {
  //     toast.error(error.message || "Signup failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="auth-container">
      <div className="head">
        <h1 className="brand">Farm Flow</h1>
        <p className="subtitle">Let's Get Started</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="name-fields">
          <div className="username-wrapper">
            <div className="input-wrapper">
              <label htmlFor="firstname">Enter your Firstname</label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
              />
              <div className="err-msg">
                {errors.firstName && (
                  <p className="error">{errors.firstName}</p>
                )}
              </div>
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstname">Enter your Lastname</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
              />
              <div className="err-msg">
                {errors.lastName && <p className="error">{errors.lastName}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="input-wrapper">
          <label htmlFor="username">Enter your Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />
          <div className="err-msg">
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        </div>

        <div className="password-wrapper">
          <div className="input-wrapper">
            <label htmlFor="username">Enter Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
            />
            <div className="err-msg">
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
          </div>
          <div
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <RiEyeLine size={20} />
            ) : (
              <RiEyeOffLine size={20} />
            )}
          </div>
        </div>

        <div className="password-wrapper">
          <div className="input-wrapper">
            <label htmlFor="username">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <div className="err-msg">
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div>
            <div
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <RiEyeLine size={20} />
              ) : (
                <RiEyeOffLine size={20} />
              )}
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="onboarding-btn">
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <div className="divider">
          <hr />
          Or
          <hr />
        </div>

        <div className="google-apple-login">
          <button type="submit" className="onboarding-btn google-btn">
            <img src={google} alt="" />
            Google
          </button>
          <button type="submit" className="onboarding-btn apple-btn">
            <img src={apple} alt="" />
            Apple
          </button>
        </div>

        <div className="bottom">
          <p className="switch-auth new-user">
            Existing User?{" "}
            <Link to="/login" className="signin-link">
              Sign In
            </Link>
          </p>

          <p className="terms">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="signin-link">
              App terms
            </Link>{" "}
            &{" "}
            <Link to="/privacy" className="signin-link">
              privacy policy
            </Link>
          </p>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default SignupPage;
