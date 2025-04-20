// pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';
import ProductGrid from '../components/ProductGrid';
import productData from '../data/productData';

const HomePage = () => {
	const [featuredProducts, setFeaturedProducts] = useState([]);
	const [newArrivals, setNewArrivals] = useState([]);

	useEffect(() => {
		// Get featured products (highest popularity)
		const featured = [...productData.products]
			.sort((a, b) => b.popularity - a.popularity)
			.slice(0, 8);

		// Get new arrivals (most recent by date)
		const arrivals = [...productData.products]
			.sort((a, b) => new Date(b.dateUploaded) - new Date(a.dateUploaded))
			.slice(0, 4);

		setFeaturedProducts(featured);
		setNewArrivals(arrivals);
	}, []);

	// Categories for our feature sections
	const categories = [
		{
			name: 'Bikes',
			path: '/category/bikes',
			image: '/images/categories/bikes.jpg',
			description:
				'Stunning photographs of motorcycles, racing bikes, and custom builds',
		},
		{
			name: 'Weddings',
			path: '/category/weddings',
			image: '/images/categories/weddings.jpg',
			description:
				'Capture the essence of special moments with our premium wedding photography',
		},
		{
			name: 'Nature',
			path: '/category/nature',
			image: '/images/categories/nature.jpg',
			description: 'Breathtaking landscapes, wildlife, and natural phenomena',
		},
		{
			name: 'Urban',
			path: '/category/urban',
			image: '/images/categories/urban.jpg',
			description: 'City life, street photography, and architectural wonders',
		},
	];

	return (
		<div>
			{/* Hero Section */}
			<section className='relative h-96 sm:h-[80vh] overflow-hidden'>
				<div
					className='absolute inset-0 bg-cover bg-center'
					style={{ backgroundImage: 'url(/images/hero-image.jpg)' }}>
					{/* Watermark overlay */}
					<div className='absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none'>
						<div
							className='transform rotate-45 text-white text-4xl font-medium text-shadow-lg'
							style={{ whiteSpace: 'nowrap', letterSpacing: '5px' }}>
							LeeWoJones Photography
						</div>
					</div>
				</div>
				<div className='absolute inset-0 bg-black bg-opacity-40' />
				<div className='absolute inset-0 flex items-center'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
						<motion.h1
							className='text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-3xl mx-auto'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}>
							Capture moments that last forever
						</motion.h1>
						<motion.p
							className='mt-4 text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}>
							Premium photography prints for every occasion
						</motion.p>
						<motion.div
							className='mt-8 flex justify-center'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}>
							<Link
								to='/category/featured'
								className='bg-white text-gray-900 px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition duration-300'>
								Explore Collection
							</Link>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Categories Section */}
			<section className='py-16 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2 className='text-3xl font-bold text-gray-900 text-center mb-12'>
						Browse Categories
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
						{categories.map((category, index) => (
							<motion.div
								key={category.name}
								className='rounded-lg overflow-hidden shadow-md relative group'
								whileHover={{ y: -5 }}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}>
								<Link to={category.path}>
									<div className='aspect-w-4 aspect-h-3 relative'>
										<div
											className='w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-300'
											style={{ backgroundImage: `url(${category.image})` }}
										/>
										<div className='absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300' />
										<div className='absolute inset-0 flex items-center justify-center'>
											<div className='text-center'>
												<h3 className='text-2xl font-bold text-white'>
													{category.name}
												</h3>
												<p className='text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
													{category.description}
												</p>
											</div>
										</div>
									</div>
								</Link>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Featured Products Section */}
			<section className='py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center mb-8'>
						<h2 className='text-3xl font-bold text-gray-900'>
							Featured Photos
						</h2>
						<Link
							to='/category/featured'
							className='text-blue-600 hover:text-blue-800 flex items-center'>
							View All <FiChevronRight className='ml-1' />
						</Link>
					</div>
					<ProductGrid products={featuredProducts} />
				</div>
			</section>

			{/* New Arrivals Section */}
			<section className='py-16 bg-gray-50'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center mb-8'>
						<h2 className='text-3xl font-bold text-gray-900'>New Arrivals</h2>
						<Link
							to='/category/new'
							className='text-blue-600 hover:text-blue-800 flex items-center'>
							View All <FiChevronRight className='ml-1' />
						</Link>
					</div>
					<ProductGrid products={newArrivals} />
				</div>
			</section>

			{/* Testimonials Section */}
			<section className='py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<h2 className='text-3xl font-bold text-gray-900 text-center mb-12'>
						What Our Customers Say
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{[
							{
								text: "The quality of LeeWo's prints exceeded all my expectations. The colors are vibrant and the detail is incredible.",
								author: 'Sarah Johnson',
								role: 'Interior Designer',
							},
							{
								text: "I've purchased multiple prints for my office, and I've received countless compliments. Outstanding quality and service!",
								author: 'Michael Chen',
								role: 'Marketing Executive',
							},
							{
								text: 'LeeWo captured our wedding day perfectly. The prints are absolutely stunning and will be treasured for generations.',
								author: 'Emily & David Wilson',
								role: 'Newlyweds',
							},
						].map((testimonial, index) => (
							<motion.div
								key={index}
								className='bg-white p-6 rounded-lg shadow-md'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}>
								<p className='text-gray-600 italic mb-4'>
									"{testimonial.text}"
								</p>
								<div>
									<p className='font-semibold text-gray-900'>
										{testimonial.author}
									</p>
									<p className='text-sm text-gray-500'>{testimonial.role}</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
