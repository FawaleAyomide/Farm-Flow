// src/pages/ProductDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext"; // ✅ make sure to use the same context as Products
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useShop();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch single product details from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://farmarket.up.railway.app/api/products/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to load product");

        setProduct(data.data || data); // handle either "data" or direct object
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Loading / Error states
  if (loading) {
    return <p className="loading-text">Loading product details...</p>;
  }

  if (error) {
    return (
      <div className="error-text">
        <p>Failed to load product 😞</p>
        <p>{error}</p>
        <Link to="/" className="back-button">
          ← Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-text">
        <p>Product not found.</p>
        <Link to="/" className="back-button">
          ← Back to Products
        </Link>
      </div>
    );
  }

  // ✅ Safe destructuring
  const {
    name,
    description,
    category,
    inStock,
    pricePerUnit,
    images,
    location,
    farmer,
  } = product;

  const imageUrl =
    images?.[0]?.url ||
    "https://via.placeholder.com/400x300?text=No+Image+Available";

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="product-detail-page">
      {/* Product Image */}
      <img src={imageUrl} alt={name} className="detail-image" />

      {/* Category */}
      <span className="detail-category">
        {category?.name || category || "Uncategorized"}
      </span>

      {/* Product Info */}
      <h2 className="detail-name">{name}</h2>
      <p className="detail-price">₦{pricePerUnit?.toLocaleString()}</p>
      <p className={`detail-stock ${inStock ? "in-stock" : "out-stock"}`}>
        {inStock ? "In Stock" : "Out of Stock"}
      </p>

      {/* Quantity Selector */}
      <div className="quantity-selector">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity((q) => q + 1)}>+</button>
      </div>

      {/* Add to Cart Button */}
      <button className="add-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>

      {/* Description */}
      {description && (
        <>
          <h3 className="section-title">Description</h3>
          <p className="detail-description">{description}</p>
        </>
      )}

      {/* Location */}
      {location && (
        <>
          <h3 className="section-title">Location</h3>
          <p className="detail-location">{location}</p>
        </>
      )}

      {/* Farmer Info */}
      {farmer && (
        <>
          <h3 className="section-title">Farmer</h3>
          <div className="farmer-info">
            <img
              src={
                farmer.avatar ||
                "https://via.placeholder.com/80x80?text=Farmer"
              }
              alt={farmer.name || "Farmer"}
              className="farmer-avatar"
            />
            <span className="farmer-name">{farmer.name || "Unknown Farmer"}</span>
            <Link to={`/farmer/${farmer.id || "#"}`} className="farmer-link">
              View Profile
            </Link>
          </div>
        </>
      )}

      {/* Back Button */}
      <Link to="/" className="back-button">
        ← Back to Products
      </Link>
    </div>
  );
};

export default ProductDetail;
