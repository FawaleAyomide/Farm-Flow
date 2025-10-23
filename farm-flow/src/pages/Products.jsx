import { useState, useEffect } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import userAvatar from "../Images/userAvatar.svg";
import {
  RiNotification2Line,
  RiShoppingCartLine,
  RiSearchLine,
  RiFilter3Line,
  RiHeart3Line,
  RiHeart3Fill,
} from "react-icons/ri";
import BottomNav from "../components/BottomNav";
import "./Products.css";

const Products = () => {
  const { user } = useAuth();
  const { favourites, toggleFavourite, addToCart, cart } = useShop();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  // Fetch all products once
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://farmarket-0hkp.onrender.com/api/products`);
      const data = await res.json();

      const fetched = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.products)
        ? data.products
        : [];

      setProducts(fetched);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`https://farmarket-0hkp.onrender.com/api/categories/`);
      const data = await res.json();

      const catList = data.data || [];
      const catMap = {};
      catList.forEach((c) => {
        catMap[c._id] = c.name;
      });

      setCategories(["All", ...catList.map((c) => c.name)]);
      setCategoryMap(catMap);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Filter + search logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const productCategoryName = categoryMap[p.category] || "Uncategorized";
    const matchesFilter =
      filter === "All" || productCategoryName === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-header">
        <div className="user-info">
          <img src={userAvatar} alt="User" className="user-avatar" />
          <div className="user-text">
            <p className="welcome-text">Welcome</p>
            <h3 className="user-name">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : "User"}
            </h3>
          </div>
        </div>
        <div className="header-actions">
          <Link to="/checkout" className="basket-btn">
            <RiShoppingCartLine className="cart" size={20} />
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </Link>
          <RiNotification2Line className="notification" size={20} />
        </div>
      </div>

      {/* Search bar */}
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <RiSearchLine className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Explore"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <RiFilter3Line size={30} className="filter-btn" />
      </div>

      {/* Category filters */}
      <div className="filter-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <h3 className="explore">Explore your Categories</h3>

      {/* Products Grid */}
      {loading ? (
        <p className="loader">Loading products...</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((p) => {
            const isFav = favourites.find((f) => f.id === p.id);
            const categoryName = categoryMap[p.category] || "Uncategorized";

            return (
              <div key={p._id} className="product-card">
                <div className="image-wrapper">
                  <img
                    src={p.images?.[0]?.url || "https://via.placeholder.com/150"}
                    alt={p.name}
                    className="product-image"
                  />
                </div>
                <div className="cat-wrapper">
                  <span className="product-category">{categoryName}</span>
                  <div
                    className={`fav-btn ${isFav ? "active" : ""}`}
                    onClick={() => toggleFavourite(p)}
                  >
                    {isFav ? (
                      <RiHeart3Fill size={18} className="heart-fill" />
                    ) : (
                      <RiHeart3Line size={18} className="heart-line" />
                    )}
                  </div>
                </div>
                <div className="pn-wrapper">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-price">
                    ₦{p.pricePerUnit?.toLocaleString() || "N/A"}
                  </p>
                </div>
                <button className="add-to-cart" onClick={() => addToCart(p)}>
                  Add to Cart
                </button>
                <Link to={`/product/${p._id}`} className="see-details">
                  See Details
                </Link>
              </div>
            );
          })}
        </div>
      )}

      <div className="bottom-nav-wrapper">
        <BottomNav />
      </div>
    </div>
  );
};

export default Products;
