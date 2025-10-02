// src/pages/Checkout.jsx
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext"; 
import "./Checkout.css";

const Checkout = () => {
  const { cart, updateCart, removeFromCart } = useShop();  // use context methods

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      {/* Cart Summary */}
      <div className="cart-summary">
        {cart.length === 0 ? (
          <p>Your basket is empty 🛒</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              {/* Item Image */}
              <img src={item.image} alt={item.name} className="cart-item-image" />

              {/* Item Info */}
              <div className="cart-item-info">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-price">₦{item.price}</p>

                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateCart(item.id, Math.max(item.quantity - 1, 1))
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCart(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
              </div>

              {/* Item Total + Remove */}
              <div className="cart-item-actions">
                <span className="item-total">₦{item.price * item.quantity}</span>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <>
            <hr />
            <div className="cart-total">
              <strong>Total:</strong>
              <span>₦{total}</span>
            </div>
          </>
        )}
      </div>

      {/* Billing Form */}
      {cart.length > 0 && (
        <form className="checkout-form">
          <h3 className="form-title">Billing Details</h3>
          <input type="text" placeholder="Full Name" required />
          <input type="text" placeholder="Address" required />
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="Phone Number" required />

          <h3 className="form-title">Payment Method</h3>
          <label>
            <input type="radio" name="payment" defaultChecked /> Pay on Delivery
          </label>
          <label>
            <input type="radio" name="payment" /> Bank Transfer
          </label>
          <label>
            <input type="radio" name="payment" /> Card Payment
          </label>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      )}

      <Link to="/" className="back-to-shop">← Back to Shop</Link>
    </div>
  );
};

export default Checkout;
