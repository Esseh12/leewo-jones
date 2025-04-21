// Pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	FiSearch,
	FiFilter,
	FiX,
	FiChevronDown,
	FiChevronUp,
} from 'react-icons/fi';
import productData from '../data/productData';

const SearchPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const initialQuery = queryParams.get('q') || '';

	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [showFilters, setShowFilters] = useState(false);
	const [filters, setFilters] = useState({
		categories: [],
		priceRange: {
			min: 0,
			max: 1000,
		},
		sortBy: 'relevance',
	});

	// Function to handle search
	const performSearch = (query) => {
		setIsSearching(true);

		// Simulate API call with setTimeout
		setTimeout(() => {
			if (!query) {
				setSearchResults([]);
				setIsSearching(false);
				return;
			}

			// In a real app, you'd get this from your actual data
			// Using a placeholder for now
			const results = productData.products.filter((product) => {
				const matchesQuery =
					product.title.toLowerCase().includes(query.toLowerCase()) ||
					product.category.toLowerCase().includes(query.toLowerCase()) ||
					product.tags.some((tag) =>
						tag.toLowerCase().includes(query.toLowerCase())
					);

				// Apply category filters if any are selected
				const matchesCategory =
					filters.categories.length === 0 ||
					filters.categories.includes(product.category);

				// Apply price filter
				const matchesPrice =
					product.price >= filters.priceRange.min &&
					product.price <= filters.priceRange.max;

				return matchesQuery && matchesCategory && matchesPrice;
			});

			// Sort results
			let sortedResults = [...results];
			switch (filters.sortBy) {
				case 'price-low':
					sortedResults.sort((a, b) => a.price - b.price);
					break;
				case 'price-high':
					sortedResults.sort((a, b) => b.price - a.price);
					break;
				case 'popularity':
					sortedResults.sort((a, b) => b.popularity - a.popularity);
					break;
				default:
					// 'relevance' - keep original order
					break;
			}

			setSearchResults(sortedResults);
			setIsSearching(false);
		}, 500);
	};

	// Handle search form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		performSearch(searchQuery);

		// Update URL with search query
		const newSearchParams = new URLSearchParams(location.search);
		if (searchQuery) {
			newSearchParams.set('q', searchQuery);
		} else {
			newSearchParams.delete('q');
		}

		navigate({ search: newSearchParams.toString() });
	};

	// Handle filter changes
	const handleCategoryFilterChange = (category) => {
		setFilters((prevFilters) => {
			const updatedCategories = prevFilters.categories.includes(category)
				? prevFilters.categories.filter((c) => c !== category)
				: [...prevFilters.categories, category];

			return {
				...prevFilters,
				categories: updatedCategories,
			};
		});
	};

	const handlePriceFilterChange = (min, max) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			priceRange: { min, max },
		}));
	};

	const handleSortChange = (sortValue) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			sortBy: sortValue,
		}));
	};

	// Apply filters when they change
	useEffect(() => {
		if (searchQuery) {
			performSearch(searchQuery);
		}
	}, [filters]);

	// Perform initial search if query parameter exists
	useEffect(() => {
		if (initialQuery) {
			performSearch(initialQuery);
		}
	}, []);

	// Get unique categories from product data
	const categories = [
		'landscape',
		'portrait',
		'city',
		'nature',
		'abstract',
		'seascape',
	];

	return (
		<div className='bg-white'>
			<div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-8'>
					<motion.h1
						className='text-3xl font-bold text-gray-900 mb-4 md:mb-0'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}>
						Search Results{' '}
						{searchQuery && (
							<span className='text-gray-500'>for "{searchQuery}"</span>
						)}
					</motion.h1>

					<div className='flex items-center'>
						<button
							className='md:hidden flex items-center px-4 py-2 bg-gray-100 rounded-md text-gray-700 mr-4'
							onClick={() => setShowFilters(!showFilters)}>
							<FiFilter className='mr-2' />
							Filters
							{showFilters ? (
								<FiChevronUp className='ml-2' />
							) : (
								<FiChevronDown className='ml-2' />
							)}
						</button>

						<div className='flex items-center'>
							<span className='mr-2 text-gray-700'>Sort by:</span>
							<select
								value={filters.sortBy}
								onChange={(e) => handleSortChange(e.target.value)}
								className='px-3 py-2 bg-gray-100 rounded-md text-gray-700 border-none focus:ring-2 focus:ring-blue-500'>
								<option value='relevance'>Relevance</option>
								<option value='price-low'>Price: Low to High</option>
								<option value='price-high'>Price: High to Low</option>
								<option value='popularity'>Popularity</option>
							</select>
						</div>
					</div>
				</div>

				<motion.form
					onSubmit={handleSubmit}
					className='flex mb-8 rounded-lg overflow-hidden shadow-md'
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}>
					<input
						type='text'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder='Search photos, categories, or keywords...'
						className='flex-grow px-6 py-4 border-none focus:ring-0 text-gray-800'
					/>
					<button
						type='submit'
						className='px-6 py-4 bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center'>
						<FiSearch className='mr-2' /> Search
					</button>
				</motion.form>

				<div className='flex flex-col md:flex-row gap-8'>
					{/* Filters sidebar */}
					<motion.div
						className={`md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}>
						<div className='bg-white p-6 rounded-lg shadow-lg'>
							<div className='flex items-center justify-between mb-6'>
								<h2 className='text-xl font-semibold text-gray-900'>Filters</h2>
								<button
									className='md:hidden text-gray-500 hover:text-gray-700'
									onClick={() => setShowFilters(false)}>
									<FiX size={20} />
								</button>
							</div>

							<div className='mb-8'>
								<h3 className='font-medium mb-4 text-gray-700'>Categories</h3>
								<div className='space-y-3'>
									{categories.map((category) => (
										<div
											key={category}
											className='flex items-center'>
											<input
												type='checkbox'
												id={`category-${category}`}
												checked={filters.categories.includes(category)}
												onChange={() => handleCategoryFilterChange(category)}
												className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
											/>
											<label
												htmlFor={`category-${category}`}
												className='ml-3 text-gray-600 capitalize'>
												{category}
											</label>
										</div>
									))}
								</div>
							</div>

							<div className='mb-8'>
								<h3 className='font-medium mb-4 text-gray-700'>Price Range</h3>
								<div className='space-y-4 px-2'>
									<div className='flex items-center justify-between'>
										<span className='text-gray-700 font-medium'>
											${filters.priceRange.min}
										</span>
										<span className='text-gray-700 font-medium'>
											${filters.priceRange.max}
										</span>
									</div>
									<div className='relative'>
										<input
											type='range'
											min='0'
											max='500'
											step='10'
											value={filters.priceRange.min}
											onChange={(e) =>
												handlePriceFilterChange(
													parseInt(e.target.value),
													filters.priceRange.max
												)
											}
											className='w-full accent-blue-600 h-2 rounded-lg appearance-none cursor-pointer bg-gray-200'
										/>
									</div>
									<div className='relative'>
										<input
											type='range'
											min='0'
											max='1000'
											step='10'
											value={filters.priceRange.max}
											onChange={(e) =>
												handlePriceFilterChange(
													filters.priceRange.min,
													parseInt(e.target.value)
												)
											}
											className='w-full accent-blue-600 h-2 rounded-lg appearance-none cursor-pointer bg-gray-200'
										/>
									</div>
								</div>
							</div>

							<div>
								<button
									onClick={() => {
										setFilters({
											categories: [],
											priceRange: { min: 0, max: 1000 },
											sortBy: 'relevance',
										});
									}}
									className='w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition'>
									Reset all filters
								</button>
							</div>
						</div>
					</motion.div>

					{/* Search results */}
					<motion.div
						className='md:w-3/4'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}>
						{isSearching ? (
							<div className='flex justify-center items-center h-64'>
								<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600'></div>
							</div>
						) : (
							<>
								{searchResults.length > 0 ? (
									<>
										<p className='text-gray-600 mb-6'>
											Found {searchResults.length} result
											{searchResults.length === 1 ? '' : 's'}
										</p>

										<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
											{searchResults.map((product) => (
												<motion.div
													key={product.id}
													whileHover={{ y: -5, transition: { duration: 0.2 } }}
													className='bg-white rounded-lg overflow-hidden shadow-lg'>
													<Link to={`/product/${product.id}`}>
														<div className='relative aspect-w-4 aspect-h-3'>
															<img
																src={
																	product.imageUrl || '/api/placeholder/400/300'
																}
																alt={product.title}
																className='w-full h-48 object-cover'
															/>
															{product.discount > 0 && (
																<div className='absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full'>
																	{Math.round(product.discount * 100)}% OFF
																</div>
															)}
														</div>
													</Link>

													<div className='p-5'>
														<div className='flex items-center mb-2'>
															<Link
																to={`/category/${product.category.toLowerCase()}`}
																className='text-blue-600 text-sm hover:underline'>
																{product.category}
															</Link>
															{product.subcategory && (
																<>
																	<span className='mx-2 text-gray-400'>/</span>
																	<Link
																		to={`/category/${product.subcategory.toLowerCase()}`}
																		className='text-blue-600 text-sm hover:underline'>
																		{product.subcategory}
																	</Link>
																</>
															)}
														</div>

														<Link to={`/product/${product.id}`}>
															<h3 className='text-lg font-medium text-gray-900 mb-2 hover:text-blue-600 transition'>
																{product.title}
															</h3>
														</Link>

														<div className='flex items-center mb-4'>
															<div className='flex items-center'>
																<span className='text-yellow-400 mr-1'>★</span>
																<span className='text-gray-700'>
																	{product.popularity?.toFixed(1) || '4.5'}
																</span>
															</div>
															{product.downloads && (
																<>
																	<span className='mx-2 text-gray-300'>•</span>
																	<span className='text-gray-500'>
																		{product.downloads} downloads
																	</span>
																</>
															)}
														</div>

														<div className='flex items-center justify-between'>
															<div className='flex items-center'>
																<span className='font-bold text-gray-900'>
																	$
																	{(product.discount > 0
																		? product.price * (1 - product.discount)
																		: product.price
																	).toFixed(2)}
																</span>
																{product.discount > 0 && (
																	<span className='ml-2 text-sm text-gray-500 line-through'>
																		${product.price.toFixed(2)}
																	</span>
																)}
															</div>

															<div className='flex flex-wrap gap-1'>
																{product.tags?.slice(0, 2).map((tag) => (
																	<Link
																		key={tag}
																		to={`/search?q=${tag}`}
																		className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200'>
																		{tag}
																	</Link>
																))}
															</div>
														</div>
													</div>
												</motion.div>
											))}
										</div>
									</>
								) : (
									searchQuery && (
										<div className='py-12 text-center'>
											<div className='inline-block p-4 rounded-full bg-gray-100 mb-4'>
												<FiSearch
													size={32}
													className='text-gray-400'
												/>
											</div>
											<h3 className='text-xl font-medium text-gray-900 mb-2'>
												No results found
											</h3>
											<p className='text-gray-600 max-w-md mx-auto'>
												We couldn't find any photos matching "{searchQuery}".
												Try using different keywords or removing some filters.
											</p>
										</div>
									)
								)}
							</>
						)}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
