// App.jsx - Main Application Component
import React from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import HomePage from './Pages/Homepage';
import CategoryPage from './Pages/CategoryPage';
import ProductPage from './Pages/ProductPage';
import CartPage from './Pages/CartPage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import SearchPage from './pages/SearchPage';
import CheckoutPage from './Pages/CheckoutPage';
import './index.css';

function App() {
	const location = useLocation();
	return (
		<div className='flex flex-col min-h-screen bg-gray-50'>
			<Navbar />
			<main className='flex-grow'>
				<AnimatePresence mode='wait'>
					<Routes
						s
						location={location}
						key={location.pathname}>
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
						<Route
							path='/cart'
							element={<CartPage />}
						/>
						<Route
							path='/about'
							element={<AboutPage />}
						/>
						<Route
							path='/contact'
							element={<ContactPage />}
						/>
						<Route
							path='/search'
							element={<SearchPage />}
						/>
						<Route
							path='/checkout'
							element={<CheckoutPage />}
						/>
					</Routes>
				</AnimatePresence>
			</main>
			<Footer />
		</div>
	);
}

export default App;
