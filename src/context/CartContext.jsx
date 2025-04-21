// src/context/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Create context with totalPrice as a function by default
export const CartContext = createContext({
	cart: [],
	totalItems: 0,
	totalPrice: () => 0,
	addToCart: () => {},
	removeFromCart: () => {},
	updateQuantity: () => {},
	clearCart: () => {},
});

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const [rawTotal, setRawTotal] = useState(0);

	// Recalculate totals anytime cart changes
	useEffect(() => {
		let items = 0;
		let price = 0;

		cart.forEach((item) => {
			items += item.quantity;
			price += item.price * item.quantity;
		});

		setTotalItems(items);
		setRawTotal(price);
	}, [cart]);

	// Expose totalPrice as a function to be called in components
	const totalPrice = () => rawTotal;

	const addToCart = (product) => {
		setCart((curr) =>
			curr.some((i) => i.id === product.id)
				? curr.map((i) =>
						i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
				  )
				: [...curr, { ...product, quantity: 1 }]
		);
	};

	const removeFromCart = (id) => {
		setCart((curr) => curr.filter((i) => i.id !== id));
	};

	const updateQuantity = (id, quantity) => {
		if (quantity <= 0) {
			removeFromCart(id);
		} else {
			setCart((curr) =>
				curr.map((i) => (i.id === id ? { ...i, quantity } : i))
			);
		}
	};

	const clearCart = () => setCart([]);

	return (
		<CartContext.Provider
			value={{
				cart,
				totalItems,
				totalPrice,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
			}}>
			{children}
		</CartContext.Provider>
	);
}
