// src/pages/ProductDetail.jsx
import { useParams, Link } from "react-router-dom";
import "./ProductDetail.css"; // import the CSS

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="product-detail-page">
      <h2 className="product-detail-title">Product Details</h2>

      <div className="product-detail-card">
        <p className="product-detail-text">
          Showing details for product ID: <span className="highlight">{id}</span>
        </p>
        <p className="product-detail-description">
          This is where product name, category, description, price, and image will appear.
        </p>
      </div>

      <Link to="/" className="back-button">
        ← Back to Products
      </Link>
    </div>
  );
};

export default ProductDetail;
