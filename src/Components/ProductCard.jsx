// components/ProductCard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
	const { addToCart } = useContext(CartContext);

	// Anti-screenshot and download protections
	const handleContextMenu = (e) => {
		e.preventDefault();
		return false;
	};

	return (
		<motion.div
			className='bg-white rounded-lg shadow-md overflow-hidden'
			whileHover={{ y: -5 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}>
			<div className='relative'>
				{/* Image container with watermark */}
				<div className='aspect-w-3 aspect-h-2 relative overflow-hidden'>
					{/* Main image with CSS protections */}
					<div
						className='w-full h-full bg-cover bg-center'
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
						<div className='absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none'>
							<div
								className='transform rotate-45 text-white text-xl font-medium text-shadow-lg'
								style={{ whiteSpace: 'nowrap' }}>
								LeeWoJones Photography
							</div>
						</div>
					</div>

					{/* Discount tag */}
					{product.discount > 0 && (
						<div className='absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>
							{Math.round(product.discount * 100)}% OFF
						</div>
					)}

					{/* Action buttons */}
					<div className='absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex justify-between'>
						<Link
							to={`/product/${product.id}`}
							className='bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100'>
							<FiEye size={18} />
						</Link>
						<button
							onClick={() => addToCart(product)}
							className='bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100'>
							<FiShoppingCart size={18} />
						</button>
					</div>
				</div>
			</div>

			<div className='p-4'>
				<Link to={`/product/${product.id}`}>
					<h3 className='text-lg font-medium text-gray-900 truncate'>
						{product.title}
					</h3>
				</Link>
				<p className='text-sm text-gray-500 mt-1'>{product.photographer}</p>
				<div className='mt-2 flex justify-between items-center'>
					<div>
						{product.discount > 0 ? (
							<div className='flex items-center space-x-2'>
								<span className='text-lg font-bold text-gray-900'>
									${(product.price * (1 - product.discount)).toFixed(2)}
								</span>
								<span className='text-sm text-gray-500 line-through'>
									${product.price.toFixed(2)}
								</span>
							</div>
						) : (
							<span className='text-lg font-bold text-gray-900'>
								${product.price.toFixed(2)}
							</span>
						)}
					</div>
					<div className='flex items-center'>
						<span className='text-yellow-400 mr-1'>★</span>
						<span className='text-sm text-gray-600'>
							{product.popularity.toFixed(1)}
						</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ProductCard;
