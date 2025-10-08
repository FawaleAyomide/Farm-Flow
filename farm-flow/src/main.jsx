import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./ErrorPage/ErrorBoundary.jsx";
import { AuthProvider } from "./Auth/AuthProvider";
import { ShopProvider } from "./context/ShopContext";
import "./Style/index.css";
import "./Style/media.css";
import "./Style/root.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
    <ErrorBoundary>
      <AuthProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </AuthProvider>
    </ErrorBoundary>
    </Router>
  </StrictMode>
);
