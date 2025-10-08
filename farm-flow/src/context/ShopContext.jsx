import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favourites, setFavourites] = useState([]);

  // Add to Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
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

  // Toggle Favourites
  const toggleFavourite = (product) => {
    setFavourites((prevFavs) => {
      const exists = prevFavs.find((item) => item.id === product.id);
      return exists
        ? prevFavs.filter((item) => item.id !== product.id)
        : [...prevFavs, product];
    });
  };

  return (
    <ShopContext.Provider
      value={{ cart, addToCart, updateCart, removeFromCart, favourites, toggleFavourite }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;

export const useShop = () => useContext(ShopContext);
