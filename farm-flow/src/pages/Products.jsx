// src/pages/Products.jsx
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
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

      {/* Products grid with infinite scroll */}
      <InfiniteScroll
        dataLength={filteredProducts.length}
        next={fetchMoreProducts}
        hasMore={hasMore}
        loader={<p className="loader">Loading more products...</p>}
        endMessage={<p className="end-message">You have seen all products 🎉</p>}
        className="products-grid"
      >
        {filteredProducts.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} className="product-image" />
            <span className="product-category">{p.category}</span>
            <h3 className="product-name">{p.name}</h3>
            <p className="product-price">{p.price}</p>

            <button className="add-to-cart">Add to Cart</button>
            <Link to={`/product/${p.id}`} className="see-details">
              See Details
            </Link>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Products;
