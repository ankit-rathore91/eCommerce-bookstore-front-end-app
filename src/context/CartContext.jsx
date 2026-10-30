import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (book, quantity = 1) => {
    setItems(current => {
      const existing = current.find(item => item.id === book.id);
      return existing
        ? current.map(item => item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { ...book, quantity }];
    });
  };

  const removeItem = id => setItems(current => current.filter(item => item.id !== id));
  const updateQuantity = (id, quantity) => setItems(current => quantity <= 0
    ? current.filter(item => item.id !== id)
    : current.map(item => item.id === id ? { ...item, quantity } : item));
  const clearCart = () => setItems([]);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  return <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, count, total }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
