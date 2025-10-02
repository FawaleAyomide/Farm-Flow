import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./Auth/AuthProvider";
import LoginPage from "./Auth/LoginPage";
import SignupPage from "./Auth/SignupPage";
import ResetPasswordPage from "./Auth/ResetPasswordPage";
import VerifyEmailPage from "./Auth/VerifyEmailPage";
import Dashboard from "./Auth/Dashboard";
import SplashScreen from "./Auth/SplashScreen";
import OnboardingScreen from "./Auth/OnboardingScreen";
import SetPasswordPage from "./Auth/SetPasswordPage";

export default function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          {/* main app wrapper */}
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/set-password" element={<SetPasswordPage />} />
//           <Route path="*" element={<Navigate to="/splash" />} />
        </Routes>
      </Router>
    </AuthProvider>
    
      <ShopProvider>
        <Router>
          <div className="pb-16">
            <Routes>
              {/* ---------- SHOP ROUTES ---------- */}
              {/* <Route path="/" element={<Products />} /> */}
              <Route path="*" element={<Products />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route
                path="/upload"
                element={<h1 className="p-6">Upload Page</h1>}
              />
              <Route
                path="/profile"
                element={<h1 className="p-6">User Profile</h1>}
              />
              <Route
                path="/settings"
                element={<h1 className="p-6">Settings</h1>}
              />

              {/* ---------- FALLBACK ---------- */}
              {/* <Route path="*" element={<Navigate to="/splash" />} /> */}
            </Routes>
          </div>


        </Router>
      </ShopProvider>
    </>
  );
}
