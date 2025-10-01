import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "./Products.css";

const Products = () => {
  const initialProducts = [
    { id: 1, name: "Green Okra", price: "₦115 / KG", image: "/okra.jpg", category: "Vegetables" },
    { id: 2, name: "Bag of Rice", price: "₦95,000 / Bag", image: "/rice.jpg", category: "Grains & Cereals" },
    { id: 3, name: "Bag of Onions", price: "₦9,500 / Bag", image: "/onion.jpg", category: "Vegetables" },
    { id: 4, name: "Tomatoes Basket", price: "₦15,000 / Basket", image: "/tomato.jpg", category: "Vegetables" },
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
          <img src="/user.jpg" alt="User" className="user-avatar" />
          <div className="user-text">
            <p className="welcome-text">Welcome</p>
            <h3 className="user-name">John Doe</h3>
          </div>
        </div>
        <div className="header-actions">
          <Link to="/checkout" className="basket-btn">
            🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </Link>
          <button className="notification-btn">🔔</button>
        </div>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Explore"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="filter-btn">☰</button>
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

      {/* Products grid */}
      <InfiniteScroll
        dataLength={filteredProducts.length}
        next={fetchMoreProducts}
        hasMore={hasMore}
        loader={<p className="loader">Loading more products...</p>}
        endMessage={<p className="end-message">You have seen all products 🎉</p>}
        className="products-grid"
      >
        {filteredProducts.map((p) => {
          const isFav = favourites.find((f) => f.id === p.id);
          return (
            <div key={p.id} className="product-card">
              <div className="image-wrapper">
                <img src={p.image} alt={p.name} className="product-image" />
                <button
                  className={`fav-btn ${isFav ? "active" : ""}`}
                  onClick={() => toggleFavourite(p)}
                >
                  {isFav ? "💚" : "🤍"}
                </button>
              </div>
              <span className="product-category">{p.category}</span>
              <h3 className="product-name">{p.name}</h3>
              <p className="product-price">{p.price}</p>

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
    </div>
  );
};

export default Products;
