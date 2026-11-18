'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('audit_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('audit_cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to save cart', e);
      }
    }
  }, [cart, isLoaded]);

  const addToCart = (service) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === service.id);
      if (existing) {
        return prev.map((item) =>
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountCode('');
    setDiscountPercent(0);
  };

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'UAE2026' || clean === 'AUDIT10') {
      setDiscountCode(clean);
      setDiscountPercent(10);
      return { success: true, message: '10% Corporate Discount applied!' };
    }
    if (clean === 'VIPGOLD') {
      setDiscountCode(clean);
      setDiscountPercent(15);
      return { success: true, message: '15% VIP Gold Partner Discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try UAE2026 or VIPGOLD' };
  };

  const removePromo = () => {
    setDiscountCode('');
    setDiscountPercent(0);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const discountedSubtotal = subtotal - discountAmount;
  const vatAmount = Math.round(discountedSubtotal * 0.05); // 5% UAE VAT
  const grandTotal = discountedSubtotal + vatAmount;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discountPercent,
        discountCode,
        discountAmount,
        vatAmount,
        grandTotal,
        applyPromo,
        removePromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
