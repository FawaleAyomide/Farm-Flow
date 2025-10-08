// src/components/BottomNav.jsx
import { Link } from "react-router-dom";
import { Home, ShoppingCart, User, Heart } from "lucide-react"; // optional icons

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <Link to="/" className="nav-item">
        <Home size={20} />
        <span>Home</span>
      </Link>

      <Link to="/checkout" className="nav-item">
        <ShoppingCart size={20} />
        <span>My Carts</span>
      </Link>

      <Link to="/favourites" className="nav-item">
        <Heart size={20} />
        <span>Favorites</span>
      </Link>

      <Link to="/profile" className="nav-item">
        <User size={20} />
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
