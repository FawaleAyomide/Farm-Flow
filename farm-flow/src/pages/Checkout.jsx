// src/pages/Checkout.jsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import {
  RiMore2Line,
  RiArrowLeftLine,
  RiDeleteBinLine,
} from "react-icons/ri";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, updateCart, removeFromCart, clearCart } = useShop();

  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Fetch categories to map IDs → names
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://farmarket.up.railway.app/api/categories");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load categories");

      const map = {};
      (data.data || []).forEach((c) => {
        map[c._id] = c.name;
      });
      setCategoryMap(map);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // ✅ Fetch products to update cart item info (image, price, etc.)
  const fetchProducts = async () => {
    if (cart.length === 0) return;
    setLoading(true);

    try {
      const response = await fetch("https://farmarket.up.railway.app/api/products");
      const data = await response.json();

      if (response.ok && data.data) {
        const productsFromApi = Array.isArray(data.data)
          ? data.data
          : [data.data];
        setFetchedProducts(productsFromApi);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [cart]);

  // ✅ Merge cart items with updated product info
  const mergedCart = useMemo(() => {
    return cart.map((item) => {
      const match =
        fetchedProducts.find(
          (p) => p._id === item.id || p.id === item.id
        ) || {};
      return {
        ...item,
        name: match.name || item.name,
        price: match.pricePerUnit || item.price,
        image: match.images?.[0]?.url || item.image,
        category: match.category || item.category,
      };
    });
  }, [cart, fetchedProducts]);

  // ✅ Totals
  const subtotal = mergedCart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const deliveryFee = subtotal > 0 ? 1500 : 0;
  const total = subtotal + deliveryFee;

  // ✅ Handlers
  const handleBack = () => navigate(-1);

  const handleCheckout = async () => {
    if (mergedCart.length === 0) return alert("Your cart is empty!");

    const orderPayload = {
      items: mergedCart.map((p) => ({
        productId: p.id,
        quantity: p.quantity,
        price: p.price,
      })),
      subtotal,
      deliveryFee,
      total,
      status: "pending",
    };

    try {
      const res = await fetch("https://farmarket.up.railway.app/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Order placed successfully!");
        clearCart();
        navigate("/orders");
      } else {
        alert(data.message || "Error placing order");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("⚠️ Network error while placing order");
    }
  };

  return (
    <div className="checkout-page">
      {/* Header */}
      <div className="head">
        <RiArrowLeftLine
          size={25}
          className="arrow-left-icon"
          onClick={handleBack}
        />
        <h1>My Cart</h1>
        <RiMore2Line size={25} className="arrow-left-icon" />
      </div>

      {/* Cart Items */}
      <div className="cart-summary">
        {loading ? (
          <p className="loading">Loading latest product data...</p>
        ) : mergedCart.length === 0 ? (
          <p className="empty">Your basket is empty 🛒</p>
        ) : (
          mergedCart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image || "https://via.placeholder.com/100"}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-info">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-category">
                  {categoryMap[item.category] ||
                    item.category?.name ||
                    "Uncategorized"}
                </p>
                <p className="cart-item-price">
                  ₦{item.price?.toLocaleString()}
                </p>
              </div>

              <div className="cart-item-actions">
                <RiDeleteBinLine
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                />
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateCart(item.id, Math.max(item.quantity - 1, 1))
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateCart(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Totals + Checkout */}
      {mergedCart.length > 0 && (
        <div className="checkout-wrapper">
          <div className="cart-total">
            <p>Sub Total</p>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>

          <div className="cart-total">
            <p>Delivery Fee</p>
            <span>₦{deliveryFee.toLocaleString()}</span>
          </div>

          <div className="cart-total total">
            <p>Total</p>
            <span>₦{total.toLocaleString()}</span>
          </div>

          <button className="place-order-btn" onClick={handleCheckout}>
            Check Out ₦{total.toLocaleString()}
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;