import React, { createContext, useContext, useState } from "react";

// Sample initial products (move this to context)
const initialProducts = [
  { id: 1, name: "Green Okra", price: "₦115 / KG", image: "/okra.jpg", category: "Vegetables" },
  { id: 2, name: "Bag of Rice", price: "₦95,000 / Bag", image: "/rice.jpg", category: "Grains & Cereals" },
  { id: 3, name: "Bag of Onions", price: "₦9,500 / Bag", image: "/onion.jpg", category: "Vegetables" },
  { id: 4, name: "Tomatoes Basket", price: "₦15,000 / Basket", image: "/tomato.jpg", category: "Vegetables" },
];

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favourites, setFavourites] = useState([]); // store array of ids
  const [products, setProducts] = useState(initialProducts);

  // Add to Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Update Cart Quantity
  const updateCart = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Toggle Favourites (store only product id)
  const toggleFavourite = (product) => {
    setFavourites((prevFavs) => {
      const exists = prevFavs.includes(product.id);
      if (exists) {
        return prevFavs.filter((id) => id !== product.id);
      }
      return [...prevFavs, product.id];
    });
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        updateCart,
        removeFromCart,
        favourites,
        toggleFavourite,
        products,
        setProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);