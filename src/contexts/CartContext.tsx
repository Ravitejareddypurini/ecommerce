import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem, Product } from '@/types';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      let newItems: CartItem[];
      if (existing) {
        newItems = prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        newItems = [...prev, { product, quantity }];
      }
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
    toast.success(`${product.name} added to cart`);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => {
      const newItems = prev.filter(i => i.product.id !== productId);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev => {
      const newItems = prev.map(i =>
        i.product.id === productId ? { ...i, quantity } : i
      );
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  }, [removeItem]);

  const clearCart = useCallback(() => {
    saveCart([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
