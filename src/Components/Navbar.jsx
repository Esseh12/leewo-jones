import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { CartContext } from '../App';
import Logo from './Logo';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const { totalItems } = useContext(CartContext);
	const navigate = useNavigate();

	const categories = [
		{ name: 'Bikes', path: '/category/bikes' },
		{ name: 'Weddings', path: '/category/weddings' },
		{ name: 'Nature', path: '/category/nature' },
		{ name: 'Urban', path: '/category/urban' },
		{ name: 'Portrait', path: '/category/portrait' },
	];

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
			setSearchQuery('');
			setIsOpen(false);
		}
	};

	return (
		<nav className='bg-white shadow-md sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16'>
					<div className='flex-shrink-0 flex items-center'>
						<Logo />
					</div>

					{/* Desktop menu */}
					<div className='hidden md:flex items-center space-x-8'>
						<div className='flex space-x-6'>
							{categories.map((category) => (
								<Link
									key={category.name}
									to={category.path}
									className='text-gray-600 hover:text-gray-900 px-2 py-1 text-sm font-medium'>
									{category.name}
								</Link>
							))}
							<Link
								to='/about'
								className='text-gray-600 hover:text-gray-900 px-2 py-1 text-sm font-medium'>
								About
							</Link>
							<Link
								to='/contact'
								className='text-gray-600 hover:text-gray-900 px-2 py-1 text-sm font-medium'>
								Contact
							</Link>
						</div>

						<div className='flex items-center space-x-2'>
							<form
								onSubmit={handleSearch}
								className='relative'>
								<input
									type='text'
									placeholder='Search photos...'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className='bg-gray-100 px-3 py-1 rounded-full text-sm w-36 focus:w-48 transition-all duration-300 focus:outline-none'
								/>
								<button
									type='submit'
									className='absolute right-2 top-1.5 text-gray-500'>
									<FiSearch size={16} />
								</button>
							</form>

							<Link
								to='/cart'
								className='relative p-1'>
								<FiShoppingCart
									size={20}
									className='text-gray-600'
								/>
								{totalItems > 0 && (
									<motion.span
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
										{totalItems}
									</motion.span>
								)}
							</Link>
						</div>
					</div>

					{/* Mobile menu button */}
					<div className='md:hidden flex items-center'>
						<Link
							to='/cart'
							className='relative p-2 mr-2'>
							<FiShoppingCart
								size={20}
								className='text-gray-600'
							/>
							{totalItems > 0 && (
								<motion.span
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
									{totalItems}
								</motion.span>
							)}
						</Link>
						<button
							onClick={() => setIsOpen(!isOpen)}
							className='p-2 rounded-md text-gray-700 focus:outline-none'>
							{isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			<motion.div
				initial={{ height: 0, opacity: 0 }}
				animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
				transition={{ duration: 0.3 }}
				className='md:hidden overflow-hidden'>
				<div className='px-2 pt-2 pb-3 space-y-1'>
					<form
						onSubmit={handleSearch}
						className='relative mb-3 px-2'>
						<input
							type='text'
							placeholder='Search photos...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='bg-gray-100 px-3 py-2 rounded-lg text-sm w-full focus:outline-none'
						/>
						<button
							type='submit'
							className='absolute right-4 top-2.5 text-gray-500'>
							<FiSearch size={18} />
						</button>
					</form>

					{categories.map((category) => (
						<Link
							key={category.name}
							to={category.path}
							className='block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md'
							onClick={() => setIsOpen(false)}>
							{category.name}
						</Link>
					))}
					<Link
						to='/about'
						className='block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md'
						onClick={() => setIsOpen(false)}>
						About
					</Link>
					<Link
						to='/contact'
						className='block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md'
						onClick={() => setIsOpen(false)}>
						Contact
					</Link>
				</div>
			</motion.div>
		</nav>
	);
};

export default Navbar;
