// pages/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import ProductGrid from '../components/ProductGrid';
import productData from '../data/productData';

const CategoryPage = () => {
	const { category } = useParams();
	const location = useLocation();

	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	// Filter state
	const [priceRange, setPriceRange] = useState([0, 100]);
	const [selectedSubcategories, setSelectedSubcategories] = useState([]);
	const [selectedFormats, setSelectedFormats] = useState([]);
	const [sortBy, setSortBy] = useState('popularity');

	// Get unique subcategories based on category
	const subcategories = [
		...new Set(
			productData.products
				.filter((p) => p.category.toLowerCase() === category.toLowerCase())
				.map((p) => p.subcategory)
		),
	];

	// Get unique formats
	const formats = [...new Set(productData.products.map((p) => p.format))];

	useEffect(() => {
		let filteredByCategory;

		// Check if we're in a special category
		if (category === 'featured') {
			filteredByCategory = [...productData.products]
				.sort((a, b) => b.popularity - a.popularity)
				.slice(0, 20);
		} else if (category === 'new') {
			filteredByCategory = [...productData.products]
				.sort((a, b) => new Date(b.dateUploaded) - new Date(a.dateUploaded))
				.slice(0, 20);
		} else {
			filteredByCategory = productData.products.filter(
				(p) => p.category.toLowerCase() === category.toLowerCase()
			);
		}

		setProducts(filteredByCategory);
		setFilteredProducts(filteredByCategory);

		// Reset filters when category changes
		setSelectedSubcategories([]);
		setSelectedFormats([]);
		setPriceRange([0, 100]);
		setSortBy('popularity');
	}, [category]);

	useEffect(() => {
		applyFilters();
	}, [selectedSubcategories, selectedFormats, priceRange, sortBy]);

	const applyFilters = () => {
		let result = [...products];

		// Apply subcategory filter
		if (selectedSubcategories.length > 0) {
			result = result.filter((p) =>
				selectedSubcategories.includes(p.subcategory)
			);
		}

		// Apply format filter
		if (selectedFormats.length > 0) {
			result = result.filter((p) => selectedFormats.includes(p.format));
		}

		// Apply price range
		const minPrice = priceRange[0];
		const maxPrice = priceRange[1];

		result = result.filter((p) => {
			const actualPrice = p.discount > 0 ? p.price * (1 - p.discount) : p.price;
			return actualPrice >= minPrice && actualPrice <= maxPrice;
		});

		// Apply sorting
		switch (sortBy) {
			case 'price-low':
				result.sort((a, b) => {
					const priceA = a.discount > 0 ? a.price * (1 - a.discount) : a.price;
					const priceB = b.discount > 0 ? b.price * (1 - b.discount) : b.price;
					return priceA - priceB;
				});
				break;
			case 'price-high':
				result.sort((a, b) => {
					const priceA = a.discount > 0 ? a.price * (1 - a.discount) : a.price;
					const priceB = b.discount > 0 ? b.price * (1 - b.discount) : b.price;
					return priceB - priceA;
				});
				break;
			case 'newest':
				result.sort(
					(a, b) => new Date(b.dateUploaded) - new Date(a.dateUploaded)
				);
				break;
			case 'popularity':
			default:
				result.sort((a, b) => b.popularity - a.popularity);
				break;
		}

		setFilteredProducts(result);
	};

	const toggleSubcategory = (subcategory) => {
		setSelectedSubcategories((prev) => {
			if (prev.includes(subcategory)) {
				return prev.filter((s) => s !== subcategory);
			} else {
				return [...prev, subcategory];
			}
		});
	};

	const toggleFormat = (format) => {
		setSelectedFormats((prev) => {
			if (prev.includes(format)) {
				return prev.filter((f) => f !== format);
			} else {
				return [...prev, format];
			}
		});
	};

	// Get category title with proper casing
	const getCategoryTitle = () => {
		if (category === 'featured') return 'Featured Photos';
		if (category === 'new') return 'New Arrivals';
		return category.charAt(0).toUpperCase() + category.slice(1);
	};

	return (
		<div className='bg-gray-50 min-h-screen'>
			<div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900'>
						{getCategoryTitle()}
					</h1>
					<p className='mt-2 text-gray-600'>
						{filteredProducts.length}{' '}
						{filteredProducts.length === 1 ? 'result' : 'results'}
					</p>
				</div>

				{/* Filters and Product Grid */}
				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Mobile Filter Toggle */}
					<div className='lg:hidden mb-4'>
						<button
							onClick={() => setIsFilterOpen(!isFilterOpen)}
							className='flex items-center justify-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50'>
							<FiFilter className='mr-2' />
							Filters
							{isFilterOpen ? (
								<FiChevronDown className='ml-2 transform rotate-180' />
							) : (
								<FiChevronDown className='ml-2' />
							)}
						</button>
					</div>

					{/* Filters Sidebar */}
					<motion.div
						className={`${isFilterOpen ? 'block' : 'hidden'} lg:block lg:w-1/4`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}>
						<div className='bg-white p-6 rounded-lg shadow'>
							<div className='flex justify-between items-center mb-4'>
								<h2 className='text-lg font-medium text-gray-900'>Filters</h2>
								<button
									onClick={() => setIsFilterOpen(false)}
									className='lg:hidden text-gray-500 hover:text-gray-700'>
									<FiX size={20} />
								</button>
							</div>

							{/* Subcategories Filter */}
							{subcategories.length > 0 && (
								<div className='mb-6'>
									<h3 className='text-sm font-medium text-gray-900 mb-3'>
										Subcategories
									</h3>
									<div className='space-y-2'>
										{subcategories.map((subcategory) => (
											<label
												key={subcategory}
												className='flex items-center'>
												<input
													type='checkbox'
													className='h-4 w-4 text-blue-600 rounded'
													checked={selectedSubcategories.includes(subcategory)}
													onChange={() => toggleSubcategory(subcategory)}
												/>
												<span className='ml-2 text-sm text-gray-700'>
													{subcategory}
												</span>
											</label>
										))}
									</div>
								</div>
							)}

							{/* Price Range Filter */}
							<div className='mb-6'>
								<h3 className='text-sm font-medium text-gray-900 mb-3'>
									Price Range
								</h3>
								<div className='flex items-center space-x-4'>
									<div className='relative mt-1 rounded-md shadow-sm'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<span className='text-gray-500 sm:text-sm'>$</span>
										</div>
										<input
											type='number'
											min='0'
											max={priceRange[1]}
											value={priceRange[0]}
											onChange={(e) =>
												setPriceRange([parseInt(e.target.value), priceRange[1]])
											}
											className='pl-7 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm'
											placeholder='Min'
										/>
									</div>
									<span className='text-gray-500'>to</span>
									<div className='relative mt-1 rounded-md shadow-sm'>
										<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
											<span className='text-gray-500 sm:text-sm'>$</span>
										</div>
										<input
											type='number'
											min={priceRange[0]}
											value={priceRange[1]}
											onChange={(e) =>
												setPriceRange([priceRange[0], parseInt(e.target.value)])
											}
											className='pl-7 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm'
											placeholder='Max'
										/>
									</div>
								</div>
							</div>

							{/* File Format Filter */}
							<div className='mb-6'>
								<h3 className='text-sm font-medium text-gray-900 mb-3'>
									File Format
								</h3>
								<div className='space-y-2'>
									{formats.map((format) => (
										<label
											key={format}
											className='flex items-center'>
											<input
												type='checkbox'
												className='h-4 w-4 text-blue-600 rounded'
												checked={selectedFormats.includes(format)}
												onChange={() => toggleFormat(format)}
											/>
											<span className='ml-2 text-sm text-gray-700'>
												{format}
											</span>
										</label>
									))}
								</div>
							</div>

							{/* Sort By Option */}
							<div>
								<h3 className='text-sm font-medium text-gray-900 mb-3'>
									Sort By
								</h3>
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'>
									<option value='popularity'>Popularity</option>
									<option value='newest'>Newest First</option>
									<option value='price-low'>Price: Low to High</option>
									<option value='price-high'>Price: High to Low</option>
								</select>
							</div>
						</div>
					</motion.div>

					{/* Product Grid */}
					<div className='lg:w-3/4'>
						{filteredProducts.length > 0 ? (
							<ProductGrid products={filteredProducts} />
						) : (
							<div className='flex flex-col items-center justify-center bg-white rounded-lg shadow p-8 h-64'>
								<p className='text-lg text-gray-600 mb-4'>
									No products found matching your criteria.
								</p>
								<button
									onClick={() => {
										setSelectedSubcategories([]);
										setSelectedFormats([]);
										setPriceRange([0, 100]);
									}}
									className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
									Reset Filters
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryPage;
