import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prev) => [...prev, product]);
        alert(`"${product.name}" додано до кошика!`);
    };

    const clearCart = () => setCartItems([]);

    const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, clearCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};