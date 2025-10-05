import { Link } from "react-router-dom";
import { Home, ShoppingCart, User, Heart } from "lucide-react";

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <Link to="/home" className="nav-item">
        <Home size={20} />
        <span>Home</span>
      </Link>

      <Link to="/products" className="nav-item">
        <ShoppingCart size={20} />
        <span>Products</span>
      </Link>

      <Link to="/favourites" className="nav-item">
        <Heart size={20} />
        <span>Favourites</span>
      </Link>

      <Link to="/profile" className="nav-item">
        <User size={20} />
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default BottomNav;