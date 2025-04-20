// Continuing from ProductPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
	FiShoppingCart,
	FiHeart,
	FiShare2,
	FiCheck,
	FiX,
} from 'react-icons/fi';
import { CartContext } from '../App';
import productData from '../data/productData';
import ProductGrid from '../Components/ProductGrid';

const ProductPage = () => {
	const { id } = useParams();
	const { addToCart, cart } = useContext(CartContext);
	const [product, setProduct] = useState(null);
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [selectedSize, setSelectedSize] = useState('medium');
	const [selectedFormat, setSelectedFormat] = useState('digital');
	const [isInCart, setIsInCart] = useState(false);
	const [addedToCart, setAddedToCart] = useState(false);

	useEffect(() => {
		// Find the product by ID
		const foundProduct = productData.products.find((p) => p.id === id);

		if (foundProduct) {
			setProduct(foundProduct);

			// Get related products from the same category
			const related = productData.products
				.filter((p) => p.category === foundProduct.category && p.id !== id)
				.slice(0, 4);
			setRelatedProducts(related);
		}

		// Check if product is in cart
		const cartItem = cart.find((item) => item.id === id);
		setIsInCart(!!cartItem);
	}, [id, cart]);

	// Anti-screenshot and download protections
	const handleContextMenu = (e) => {
		e.preventDefault();
		return false;
	};

	const handleAddToCart = () => {
		if (product) {
			// Create a product with selected options
			const productWithOptions = {
				...product,
				selectedSize,
				selectedFormat,
			};
			addToCart(productWithOptions);
			setAddedToCart(true);
			setTimeout(() => setAddedToCart(false), 2000);
		}
	};

	if (!product) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
			</div>
		);
	}

	// Calculate the discounted price
	const discountedPrice =
		product.discount > 0
			? product.price * (1 - product.discount)
			: product.price;

	// Size pricing adjustments
	const sizePricing = {
		small: 0,
		medium: discountedPrice * 0.2,
		large: discountedPrice * 0.5,
		extraLarge: discountedPrice * 0.8,
	};

	// Format pricing adjustments
	const formatPricing = {
		digital: 0,
		print: discountedPrice * 0.3,
		canvas: discountedPrice * 0.6,
		framed: discountedPrice * 1,
	};

	// Calculate final price
	const finalPrice =
		discountedPrice + sizePricing[selectedSize] + formatPricing[selectedFormat];

	return (
		<div className='bg-white'>
			<div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					{/* Product Image */}
					<motion.div
						className='relative'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}>
						<div className='rounded-lg overflow-hidden shadow-lg relative'>
							{/* Product image with watermark and protection */}
							<div
								className='w-full aspect-w-4 aspect-h-3 bg-cover bg-center'
								style={{
									backgroundImage: `url(${product.imageUrl})`,
									userSelect: 'none',
									WebkitUserSelect: 'none',
									MozUserSelect: 'none',
									msUserSelect: 'none',
								}}
								onContextMenu={handleContextMenu}
								draggable='false'>
								{/* Watermark overlay */}
								<div className='absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none'>
									<div
										className='transform rotate-30 text-white text-3xl font-medium tracking-wider'
										style={{ whiteSpace: 'nowrap' }}>
										LeeWoJones Photography
									</div>
								</div>
							</div>

							{/* Discount tag */}
							{product.discount > 0 && (
								<div className='absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full'>
									{Math.round(product.discount * 100)}% OFF
								</div>
							)}
						</div>

						{/* Image info */}
						<div className='mt-6 bg-gray-50 rounded-lg p-4'>
							<h3 className='text-lg font-medium text-gray-900 mb-2'>
								Image Information
							</h3>
							<div className='grid grid-cols-2 gap-4 text-sm'>
								<div>
									<p className='text-gray-500'>Resolution</p>
									<p className='font-medium'>{product.resolution}</p>
								</div>
								<div>
									<p className='text-gray-500'>Format</p>
									<p className='font-medium'>{product.format}</p>
								</div>
								<div>
									<p className='text-gray-500'>Photographer</p>
									<p className='font-medium'>{product.photographer}</p>
								</div>
								<div>
									<p className='text-gray-500'>License</p>
									<p className='font-medium'>{product.license}</p>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Product Details */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}>
						<div className='flex items-center mb-2'>
							<Link
								to={`/category/${product.category.toLowerCase()}`}
								className='text-blue-600 text-sm hover:underline'>
								{product.category}
							</Link>
							<span className='mx-2 text-gray-400'>/</span>
							<Link
								to={`/category/${product.subcategory.toLowerCase()}`}
								className='text-blue-600 text-sm hover:underline'>
								{product.subcategory}
							</Link>
						</div>

						<h1 className='text-3xl font-bold text-gray-900'>
							{product.title}
						</h1>

						<div className='flex items-center mt-2'>
							<div className='flex items-center'>
								<span className='text-yellow-400 mr-1'>★</span>
								<span className='text-gray-700'>
									{product.popularity.toFixed(1)}
								</span>
							</div>
							<span className='mx-2 text-gray-300'>•</span>
							<span className='text-gray-500'>
								{product.downloads} downloads
							</span>
						</div>

						<p className='mt-4 text-gray-600'>{product.description}</p>

						{/* Price */}
						<div className='mt-6'>
							<div className='flex items-center'>
								<span className='text-2xl font-bold text-gray-900'>
									${finalPrice.toFixed(2)}
								</span>
								{product.discount > 0 && (
									<span className='ml-3 text-lg text-gray-500 line-through'>
										${product.price.toFixed(2)}
									</span>
								)}
							</div>
						</div>

						{/* Options */}
						<div className='mt-6'>
							<h3 className='text-sm font-medium text-gray-900'>Size</h3>
							<div className='grid grid-cols-4 gap-4 mt-2'>
								{['small', 'medium', 'large', 'extraLarge'].map((size) => (
									<button
										key={size}
										type='button'
										className={`px-4 py-2 text-sm font-medium rounded-md ${
											selectedSize === size
												? 'bg-gray-900 text-white'
												: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
										}`}
										onClick={() => setSelectedSize(size)}>
										{size.charAt(0).toUpperCase() + size.slice(1)}
										<span className='block text-xs mt-1'>
											+${sizePricing[size].toFixed(2)}
										</span>
									</button>
								))}
							</div>
						</div>

						<div className='mt-6'>
							<h3 className='text-sm font-medium text-gray-900'>Format</h3>
							<div className='grid grid-cols-4 gap-4 mt-2'>
								{['digital', 'print', 'canvas', 'framed'].map((format) => (
									<button
										key={format}
										type='button'
										className={`px-4 py-2 text-sm font-medium rounded-md ${
											selectedFormat === format
												? 'bg-gray-900 text-white'
												: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
										}`}
										onClick={() => setSelectedFormat(format)}>
										{format.charAt(0).toUpperCase() + format.slice(1)}
										<span className='block text-xs mt-1'>
											+${formatPricing[format].toFixed(2)}
										</span>
									</button>
								))}
							</div>
						</div>

						{/* Actions */}
						<div className='mt-8 flex space-x-4'>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className={`flex-1 flex items-center justify-center px-6 py-3 rounded-md font-medium text-white ${
									addedToCart ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
								}`}
								onClick={handleAddToCart}>
								{addedToCart ? (
									<>
										<FiCheck className='mr-2' /> Added to Cart
									</>
								) : (
									<>
										<FiShoppingCart className='mr-2' /> Add to Cart
									</>
								)}
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='p-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50'>
								<FiHeart />
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='p-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50'>
								<FiShare2 />
							</motion.button>
						</div>

						{/* Tags */}
						<div className='mt-8'>
							<h3 className='text-sm font-medium text-gray-900'>Tags</h3>
							<div className='flex flex-wrap gap-2 mt-2'>
								{product.tags.map((tag) => (
									<Link
										key={tag}
										to={`/search?q=${tag}`}
										className='inline-block px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200'>
										{tag}
									</Link>
								))}
							</div>
						</div>
					</motion.div>
				</div>

				{/* Related Products */}
				{relatedProducts.length > 0 && (
					<div className='mt-16'>
						<h2 className='text-2xl font-bold text-gray-900 mb-8'>
							You Might Also Like
						</h2>
						<ProductGrid products={relatedProducts} />
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductPage;
