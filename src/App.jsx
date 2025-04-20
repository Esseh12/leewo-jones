// App.jsx - Main Application Component
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './Pages/HomePage';
import CategoryPage from './Pages/CategoryPage';
import ProductPage from './Pages/ProductPage';
import './index.css';
// import productData from './data/productData';
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
// import SearchPage from './pages/SearchPage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';
// import productData from './data/productData';

// Context for cart functionality
export const CartContext = React.createContext();

function App() {
	const [cart, setCart] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	// Calculate cart totals whenever cart changes
	useEffect(() => {
		let items = 0;
		let price = 0;

		cart.forEach((item) => {
			items += item.quantity;
			price += item.price * item.quantity;
		});

		setTotalItems(items);
		setTotalPrice(price);
	}, [cart]);

	const addToCart = (product) => {
		const existingItem = cart.find((item) => item.id === product.id);

		if (existingItem) {
			setCart(
				cart.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			);
		} else {
			setCart([...cart, { ...product, quantity: 1 }]);
		}
	};

	const removeFromCart = (productId) => {
		setCart(cart.filter((item) => item.id !== productId));
	};

	const updateQuantity = (productId, quantity) => {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}

		setCart(
			cart.map((item) => (item.id === productId ? { ...item, quantity } : item))
		);
	};

	const clearCart = () => {
		setCart([]);
	};

	const cartContextValue = {
		cart,
		totalItems,
		totalPrice,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
	};

	return (
		<CartContext.Provider value={cartContextValue}>
			<Router>
				<div className='flex flex-col min-h-screen bg-gray-50'>
					<Navbar />
					<main className='flex-grow'>
						<AnimatePresence mode='wait'>
							<Routes>
								<Route
									path='/'
									element={<HomePage />}
								/>
								<Route
									path='/category/:category'
									element={<CategoryPage />}
								/>
								<Route
									path='/product/:id'
									element={<ProductPage />}
								/>
								{/*
								
								<Route
									path='/cart'
									element={<CartPage />}
								/>
								<Route
									path='/checkout'
									element={<CheckoutPage />}
								/>
								<Route
									path='/search'
									element={<SearchPage />}
								/>
								<Route
									path='/about'
									element={<AboutPage />}
								/>
								<Route
									path='/contact'
									element={<ContactPage />}
								/> */}
							</Routes>
						</AnimatePresence>
					</main>
					<Footer />
				</div>
			</Router>
		</CartContext.Provider>
	);
}

export default App;
