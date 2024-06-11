import React, { createContext, useEffect, useState } from "react";
import LocalStorageHandler from "../util/localStorage/LocalStorageHandler";

export const CartContext = createContext<{
  cart: CartItem[];
  addItemToCart: (product: IProduct, quantity: number) => void;
  removeItemFromCart: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
}>(
  {} as {
    cart: CartItem[];
    addItemToCart: (product: IProduct, quantity: number) => void;
    removeItemFromCart: (item: CartItem, quantity: number) => void;
    clearCart: () => void;
  },
);
const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(
    () => LocalStorageHandler.getItem<CartItem[]>("CART") || [],
  );

  const addItemToCart = (product: IProduct, quantity: number) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.product._id === product._id,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newLine: CartItem = {
        product: product,
        productId: product._id,
        quantity: quantity,
        price: product.price,
        discount: product.discount,
      };
      cart.push(newLine);
    }
    setCart([...cart]);
  };

  const removeItemFromCart = (item: CartItem, quantity: number) => {
    const index = cart.findIndex(
      (cartItem) => cartItem.productId === item.productId,
    );
    if (index !== -1) {
      const updatedItem = cart[index];
      updatedItem.quantity -= quantity;
      if (updatedItem.quantity <= 0) {
        cart.splice(index, 1);
      }
      setCart([...cart]);
    }
  };

  const clearCart = () => setCart([]);

  useEffect(() => {
    LocalStorageHandler.setItem("CART", cart);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addItemToCart, removeItemFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
