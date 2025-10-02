import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const Favourites = () => {
  const { favourites, addToCart } = useShop();

  return (
    <div className="favourites-page">
      <h2>My Favourites</h2>
      {favourites.length === 0 ? (
        <p>No favourites yet 💔</p>
      ) : (
        <div className="products-grid">
          {favourites.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.image} alt={p.name} className="product-image" />
              <h3>{p.name}</h3>
              <p>{p.price}</p>
              <button onClick={() => addToCart(p)}>Add to Cart</button>
              <Link to={`/product/${p.id}`}>See Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
