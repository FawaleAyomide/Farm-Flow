// src/pages/Favourites.jsx
import { Link } from "react-router-dom";
import { RiHeart3Fill } from "react-icons/ri";
import { useShop } from "../context/ShopContext"; // ✅ make sure to use the same context as Products
import BottomNav from "../components/BottomNav";
import "./Favourites.css";

const Favourites = () => {
  const { favourites, addToCart, toggleFavourite } = useShop();

  return (
    <div className="favourites-container">
      <h2>My Favourites</h2>

      {!favourites || favourites.length === 0 ? (
        <p>No favourites yet 💔</p>
      ) : (
        <div className="favourites-grid">
          {favourites.map((p) => (
            <div key={p.id} className="product-card">
              {/* ✅ Product Image */}
              <div className="image-wrapper">
                <img
                  src={p.images?.[0]?.url || "https://via.placeholder.com/150"}
                  alt={p.name}
                  className="product-image"
                />
              </div>

              {/* ✅ Category + Favorite button */}
              <div className="cat-wrapper">
                <span className="product-category">
                  {/* {p.category?.name || p.category || "Uncategorized"} */}
                  Category
                </span>
                <div
                  className="fav-btn active"
                  onClick={() => toggleFavourite(p)}
                  title="Remove from favourites"
                >
                  <RiHeart3Fill size={18} className="heart-fill" />
                </div>
              </div>

              {/* ✅ Product name + price */}
              <div className="pn-wrapper">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-price">
                  ₦{p.pricePerUnit?.toLocaleString() || p.price || "N/A"}
                </p>
              </div>

              {/* ✅ Add to cart + link to product details */}
              <button className="add-to-cart" onClick={() => addToCart(p)}>
                Add to Cart
              </button>

              <Link to={`/product/${p.id}`} className="see-details">
                See Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Bottom navigation bar */}
      <div className="bottom-nav-wrapper">
        <BottomNav />
      </div>
    </div>
  );
};

export default Favourites;
