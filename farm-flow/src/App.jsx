import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Auth/AuthProvider";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Favourites from "./pages/Favourites";
import LoginPage from "./Auth/LoginPage";
import SignupPage from "./Auth/SignupPage";
import ResetPasswordPage from "./Auth/ResetPasswordPage";
import VerifyEmailPage from "./Auth/VerifyEmailPage";
import Home from "./pages/Home";
import SplashScreen from "./Auth/SplashScreen";
import OnboardingScreen from "./Auth/OnboardingScreen";
import SetPasswordPage from "./Auth/SetPasswordPage";
import EditProfile from "./pages/EditProfile";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/splash" element={<SplashScreen />} />
      <Route
        path="/onboarding"
        element={!user ? <OnboardingScreen /> : <Navigate to="/home" replace />}
      />
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/home" replace />}
      />
      <Route
        path="/signup"
        element={!user ? <SignupPage /> : <Navigate to="/home" replace />}
      />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/set-password" element={<SetPasswordPage />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/upload" element={<h1 className="p-6">Upload Page</h1>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/settings" element={<h1 className="p-6">Settings</h1>} />

      {/* fallback route */}
      <Route
        path="*"
        element={<Navigate to={user ? "/home" : "/splash"} replace />}
      />
    </Routes>
  );
}
