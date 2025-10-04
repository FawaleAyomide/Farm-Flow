import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "./Favourites.css";

const Favourites = () => {
  const { favourites, addToCart, toggleFavourite, products } = useShop();
  const favouriteProducts = products.filter((p) => favourites.includes(p.id));

  return (
    <div className="favourites-page">
      <div className="favourites-container">
        <h2>My Favourites</h2>
        {favouriteProducts.length === 0 ? (
          <p>No favourites yet 💔</p>
        ) : (
          <div className="favourites-grid">
            {favouriteProducts.map((p) => (
              <div key={p.id} className="favourite-card">
                <div className="image-wrapper">
                  <Link to={`/product/${p.id}`}>
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="product-image" />
                    ) : (
                      <div className="product-image placeholder">No Image</div>
                    )}
                  </Link>
                </div>
                <span className="product-category">
                  <button
                    className="fav-btn active"
                    onClick={() => toggleFavourite(p)}
                    aria-label="Remove from favourites"
                    type="button"
                  >
                    💚
                  </button>
                  {p.category}
                </span>
                <h3 className="product-name">{p.name}</h3>
                <p className="product-price">{p.price}</p>
                <button className="add-to-cart" onClick={() => addToCart(p)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;