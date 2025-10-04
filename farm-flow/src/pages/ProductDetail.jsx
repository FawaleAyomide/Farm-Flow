// src/pages/ProductDetail.jsx
import { useParams, Link } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();

  // Dummy product data - before API
  const product = {
    id,
    name: "Fresh Green Okra",
    price: "₦3,000 / KG",
    category: "Vegetables",
    inStock: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Kaduna, Nigeria",
    farmer: { name: "Abubakar Usman", avatar: "/farmer.jpg" },
    image: "/okra.jpg",
  };

  return (
  <div className="product-detail-page">
    <div className="product-detail-container">
      
      {product.image ? (
        <img src={product.image} alt={product.name} className="detail-image" />
      ) : (
        <div className="detail-image">No Image</div>
      )}
      <span className="detail-category">{product.category}</span>
      <h2 className="detail-name">{product.name}</h2>
      <p className="detail-price">{product.price}</p>
      <p className={`detail-stock ${product.inStock ? "in-stock" : "out-stock"}`}>
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>
      <div className="quantity-selector">
        <button>-</button>
        <span>1</span>
        <button>+</button>
      </div>
      <button className="add-cart-btn">Add to Cart</button>
      <h3 className="section-title">Description</h3>
      <p className="detail-description">{product.description}</p>
      <h3 className="section-title">Location</h3>
      <p className="detail-location">{product.location}</p>
      <h3 className="section-title">Farmer</h3>
      <div className="farmer-info">
        <img src={product.farmer.avatar} alt={product.farmer.name} className="farmer-avatar" />
        <span className="farmer-name">{product.farmer.name}</span>
        <Link to="/" className="farmer-link">View Profile</Link>
      </div>
      <Link to="/" className="back-button">← Back to Products</Link>
    </div>
  </div>
);
};

export default ProductDetail;
