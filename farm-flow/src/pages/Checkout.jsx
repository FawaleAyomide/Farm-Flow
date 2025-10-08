// src/pages/Checkout.jsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext"; // ✅ Correct import path
import { RiMore2Line, RiArrowLeftLine, RiDeleteBinLine } from "react-icons/ri";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, updateCart, removeFromCart, clearCart } = useShop();
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch product data from API
  useEffect(() => {
    const fetchProducts = async () => {
      if (cart.length === 0) return;

      setLoading(true);
      try {
        const response = await fetch(
          "https://farmarket.up.railway.app/api/products"
        );
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

    fetchProducts();
  }, [cart]);

  // ✅ Merge cart items with API product data
  const mergedCart = useMemo(() => {
    return cart.map((item) => {
      const match = fetchedProducts.find((p) => p.id === item.id);
      if (match) {
        return {
          ...item,
          name: match.name,
          price: match.pricePerUnit || item.price,
          image: match.images?.[0]?.url || item.image,
          category: match.category,
          availableQuantity: match.quantity,
        };
      }
      return item;
    });
  }, [cart, fetchedProducts]);

  // ✅ Dynamic Calculations
  const subtotal = mergedCart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const deliveryFee = subtotal > 0 ? 1500 : 0; // Flat delivery rate
  const total = subtotal + deliveryFee;

  // ✅ Go Back
  const handleBack = () => navigate(-1);

  // ✅ Handle Checkout
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
        headers: {
          "Content-Type": "application/json",
        },
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
                <p className="cart-item-price">
                  ₦{item.price?.toLocaleString()}
                </p>
                <p className="cart-item-category">{item.category}</p>
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

// src/pages/Checkout.jsx
// import { useNavigate } from "react-router-dom";
// import { useShop } from "../context/ShopContext";
// import { RiMore2Line } from "react-icons/ri";
// import { RiArrowLeftLine } from "react-icons/ri";
// import { RiDeleteBinLine } from "react-icons/ri";
// import "./Checkout.css";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cart, updateCart, removeFromCart } = useShop(); // use context methods

//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="checkout-page">
//       <div className="head">
//         <RiArrowLeftLine
//           size={25}
//           className="arrow-left-icon"
//           onClick={handleBack}
//         />
//         <h1>My Cart</h1>
//         <RiMore2Line size={25} className="arrow-left-icon" />
//       </div>

//       {/* Cart Summary */}
//       <div className="cart-summary">
//         {cart.length === 0 ? (
//           <p className="empty">Your basket is empty 🛒</p>
//         ) : (
//           cart.map((item) => (
//             <div key={item.id} className="cart-item">
//               {/* Item Image */}
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="cart-item-image"
//               />

//               {/* Item Info */}
//               <div className="cart-item-info">
//                 <h4 className="cart-item-name">{item.name}</h4>
//                 <p className="cart-item-price">{item.price}</p>

//               </div>

//               {/* Item Total + Remove */}
//               <div className="cart-item-actions">
//                 {/* <span className="item-total">
//                   ₦{item.price * item.quantity}
//                 </span> */}
//                 <RiDeleteBinLine className="remove-btn"
//                   onClick={() => removeFromCart(item.id)} />
//                 {/* Quantity Controls */}
//                 <div className="quantity-controls">
//                   <button
//                     onClick={() =>
//                       updateCart(item.id, Math.max(item.quantity - 1, 1))
//                     }
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => updateCart(item.id, item.quantity + 1)}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//       <div className="checkout-wrapper">
//         <div className="cart-total">
//           <p>Sub Total</p>
//           <span>₦{total}</span>
//         </div>
//         <div className="cart-total">
//           <p>Delivery Fee</p>
//           <span>₦{total}</span>
//         </div>
//         <button className="place-order-btn">Check Out ₦{total}</button>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
