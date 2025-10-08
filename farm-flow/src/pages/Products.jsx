import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "../Auth/AuthProvider";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import okra from "../Images/okra.svg";
import rice from "../Images/rice.svg";
import onions from "../Images/onions.svg";
import tomatoes from "../Images/tomatoes.jpeg";
import userAvatar from "../Images/userAvatar.svg";
import { RiNotification2Line } from "react-icons/ri";
import { RiShoppingCartLine } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { RiFilter3Line } from "react-icons/ri";
import { RiHeart3Line } from "react-icons/ri";
import { RiHeart3Fill } from "react-icons/ri";
import BottomNav from "../components/BottomNav";
import "./Products.css";

const Products = () => {
  const { user } = useAuth();

  const initialProducts = [
    {
      id: 1,
      name: "Green Okra",
      price: "₦115 / KG",
      image: okra,
      category: "Vegetables",
    },
    {
      id: 2,
      name: "Bag of Rice",
      price: "₦95,000 / Bag",
      image: rice,
      category: "Grains & Cereals",
    },
    {
      id: 3,
      name: "Bag of Onions",
      price: "₦9,500 / Bag",
      image: onions,
      category: "Vegetables",
    },
    {
      id: 4,
      name: "Tomatoes Basket",
      price: "₦15,000 / Basket",
      image: tomatoes,
      category: "Vegetables",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const { favourites, toggleFavourite, addToCart, cart } = useShop();

  const fetchMoreProducts = () => {
    if (products.length >= 30) {
      setHasMore(false);
      return;
    }

    const newProducts = Array.from({ length: 6 }).map((_, i) => ({
      id: products.length + i + 1,
      name: `Product ${products.length + i + 1}`,
      price: `₦${(Math.random() * 10000 + 1000).toFixed(0)}`,
      image: "/okra.jpg",
      category: i % 2 === 0 ? "Vegetables" : "Grains & Cereals",
    }));

    setTimeout(() => {
      setProducts((prev) => [...prev, ...newProducts]);
    }, 1500);
  };

  // Filter + search
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="products-page">
      {/* Top Header with User + Basket + Notification */}
      <div className="products-header">
        <div className="user-info">
          <img src={userAvatar} alt="User" className="user-avatar" />
          <div className="user-text">
            <p className="welcome-text">Welcome</p>
            <h3 className="user-name">
              {" "}
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : "User"}
            </h3>
          </div>
        </div>
        <div className="header-actions">
          <Link to="/checkout" className="basket-btn">
          <RiShoppingCartLine  className="cart" size={20}/>
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

      {/* Filter buttons */}
      <div className="filter-buttons">
        {["All", "Grains & Cereals", "Vegetables"].map((cat) => (
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
      {/* Products grid */}
      <InfiniteScroll
        dataLength={filteredProducts.length}
        next={fetchMoreProducts}
        hasMore={hasMore}
        loader={<p className="loader">Loading more products...</p>}
        endMessage={
          <p className="end-message">You have seen all products 🎉</p>
        }
        className="products-grid"
      >
        {filteredProducts.map((p) => {
          const isFav = favourites.find((f) => f.id === p.id);
          return (
            <div key={p.id} className="product-card">
              <div className="image-wrapper">
                <img src={p.image} alt={p.name} className="product-image" />
              </div>
              <div className="cat-wrapper">
                <span className="product-category">{p.category}</span>
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
                <p className="product-price">{p.price}</p>
              </div>

              <button className="add-to-cart" onClick={() => addToCart(p)}>
                Add to Cart
              </button>
              <Link to={`/product/${p.id}`} className="see-details">
                See Details
              </Link>
            </div>
          );
        })}
      </InfiniteScroll>

      {/* bottom nav bar (only for shop pages) */}
      <div className="bottom-nav-wrapper">
        <BottomNav />
      </div>
    </div>
  );
};

export default Products;
