// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import BottomNav from "./components/BottomNav";
import Checkout from "./pages/Checkout";
import Favourites from "./pages/Favourites";

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        {/* main app wrapper */}
        <div className="pb-16"> 
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/upload" element={<h1 className="p-6">Upload Page</h1>} />
            <Route path="/profile" element={<h1 className="p-6">User Profile</h1>} />
            <Route path="/settings" element={<h1 className="p-6">Settings</h1>} />
          </Routes>
        </div>

        {/* bottom nav bar */}
        <BottomNav />
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;
