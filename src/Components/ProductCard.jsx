import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiMaximize2 } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
	const { addToCart } = useContext(CartContext);
	const [isHovered, setIsHovered] = useState(false);

	const handleContextMenu = (e) => {
		e.preventDefault();
		return false;
	};

	return (
		<motion.div
			className='group relative w-full shadow-lg bg-white overflow-hidden'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			{/* Image Container */}
			<div className='relative aspect-[4/3] overflow-hidden bg-gray-100'>
				<Link to={`/product/${product.id}`}>
					<img
						src={product.imageUrl}
						alt={product.title}
						className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
						onContextMenu={handleContextMenu}
						draggable='false'
					/>
				</Link>

				{/* Overlay with actions (appears on hover) */}
				<div
					className={`absolute inset-0 bg-black/40 bg-opacity-40 transition-opacity duration-300 flex flex-col justify-between p-4 ${
						isHovered ? 'opacity-100' : 'opacity-0'
					}`}>
					{/* Top row */}
					<div className='flex justify-end'>
						{product.discount > 0 && (
							<span className='bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-sm'>
								{Math.round(product.discount * 100)}% OFF
							</span>
						)}
					</div>

					{/* Photographer name overlay */}
					<div className='flex justify-between items-end'>
						<span className='text-white text-sm font-medium'>
							{product.photographer}
						</span>

						{/* Action buttons */}
						<div className='flex space-x-2'>
							<Link
								to={`/product/${product.id}`}
								className='bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full text-white transition'>
								<FiMaximize2 size={18} />
							</Link>
							<button className='bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full text-white transition'>
								<FiHeart size={18} />
							</button>
							<button
								onClick={() => addToCart(product)}
								className='bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full text-white transition'>
								<FiShoppingCart size={18} />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Product Info */}
			<div className='py-3 px-1'>
				<Link to={`/product/${product.id}`}>
					<h3 className='text-base font-medium text-gray-900 truncate'>
						{product.title}
					</h3>
				</Link>

				<div className='mt-2 flex justify-between items-center'>
					<div className='flex items-center'>
						<span className='text-yellow-400 mr-1'>★</span>
						<span className='text-sm text-gray-600'>
							{product.popularity.toFixed(1)}
						</span>
					</div>

					<div>
						{product.discount > 0 ? (
							<div className='flex items-baseline space-x-2'>
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
				</div>
			</div>
		</motion.div>
	);
};

export default ProductCard;
