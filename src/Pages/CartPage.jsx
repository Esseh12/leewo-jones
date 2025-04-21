import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
	const { cart, removeFromCart, updateQuantity, totalPrice } =
		useContext(CartContext);
	const navigate = useNavigate();

	// Prevent right-click screenshot or download
	const handleContextMenu = (e) => {
		e.preventDefault();
		return false;
	};

	// Handler for checkout button
	const handleCheckout = () => {
		navigate('/checkout');
	};

	if (!cart || cart.length === 0) {
		return (
			<div
				className='max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center'
				onContextMenu={handleContextMenu}>
				<h2 className='text-3xl font-bold text-gray-900 mb-4'>
					Your Cart is Empty
				</h2>
				<p className='text-lg text-gray-600 mb-8'>
					Looks like you haven't added any items to your cart yet.
				</p>
				<Link
					to='/'
					className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700'>
					<FiArrowLeft className='mr-2' /> Continue Shopping
				</Link>
			</div>
		);
	}

	return (
		<div
			className='bg-white'
			onContextMenu={handleContextMenu}>
			<div className='max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-10'>
					Shopping Cart
				</h1>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Cart Items List */}
					<div className='lg:col-span-2'>
						<div className='border rounded-lg overflow-hidden shadow-sm'>
							<table className='min-w-full divide-y divide-gray-200'>
								<thead className='bg-gray-50'>
									<tr>
										<th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Product
										</th>
										<th className='py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Options
										</th>
										<th className='py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Price
										</th>
										<th className='py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Qty
										</th>
										<th className='py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Total
										</th>
										<th className='relative py-3 px-3'>
											<span className='sr-only'>Remove</span>
										</th>
									</tr>
								</thead>
								<AnimatePresence>
									<tbody className='bg-white divide-y divide-gray-200'>
										{cart.map((item) => {
											// Base price after discount
											const basePrice =
												item.discount > 0
													? item.price * (1 - item.discount)
													: item.price;

											// Price adjustments
											const sizePricing = {
												small: 0,
												medium: basePrice * 0.2,
												large: basePrice * 0.5,
												extraLarge: basePrice * 0.8,
											};
											const formatPricing = {
												digital: 0,
												print: basePrice * 0.3,
												canvas: basePrice * 0.6,
												framed: basePrice,
											};

											const size = item.selectedSize || 'medium';
											const format = item.selectedFormat || 'digital';
											const unitPrice =
												basePrice +
												(sizePricing[size] || 0) +
												(formatPricing[format] || 0);
											const lineTotal = unitPrice * item.quantity;

											return (
												<motion.tr
													key={item.id}
													initial={{ opacity: 0, x: -20 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0, x: 20 }}
													transition={{ duration: 0.3 }}>
													<td className='py-4 px-4 whitespace-nowrap'>
														<div className='flex items-center'>
															{item.imageUrl && (
																<img
																	src={item.imageUrl}
																	alt={item.title}
																	className='h-16 w-16 rounded-md object-cover mr-4'
																/>
															)}
															<div>
																<p className='text-sm font-medium text-gray-900'>
																	{item.title}
																</p>
																{item.variant && (
																	<p className='text-xs text-gray-500'>
																		{item.variant}
																	</p>
																)}
															</div>
														</div>
													</td>
													<td className='py-4 px-3 whitespace-nowrap text-sm text-gray-700'>
														<p>Size: {size}</p>
														<p>Format: {format}</p>
													</td>
													<td className='py-4 px-3 whitespace-nowrap text-sm font-medium text-gray-900'>
														${unitPrice.toFixed(2)}
													</td>
													<td className='py-4 px-3 whitespace-nowrap'>
														<input
															type='number'
															min='1'
															value={item.quantity}
															onChange={(e) =>
																updateQuantity(
																	item.id,
																	parseInt(e.target.value, 10)
																)
															}
															className='w-16 border rounded-md text-center text-sm'
														/>
													</td>
													<td className='py-4 px-3 whitespace-nowrap text-sm font-medium text-gray-900'>
														${lineTotal.toFixed(2)}
													</td>
													<td className='py-4 px-3 whitespace-nowrap text-right text-sm font-medium'>
														<button
															onClick={() => removeFromCart(item.id)}
															aria-label='Remove item'
															className='p-2 hover:text-red-600'>
															<FiTrash2 size={18} />
														</button>
													</td>
												</motion.tr>
											);
										})}
									</tbody>
								</AnimatePresence>
							</table>
						</div>
					</div>

					{/* Order Summary */}
					<div className='bg-gray-50 p-6 rounded-lg shadow'>
						<h2 className='text-lg font-medium text-gray-900 mb-4'>
							Order Summary
						</h2>
						<div className='flex justify-between text-gray-700 mb-2'>
							<span>Subtotal</span>
							<span>${totalPrice().toFixed(2)}</span>
						</div>
						{/* Add tax, shipping logic here if needed */}
						<div className='border-t mt-2 mb-4'></div>
						<button
							onClick={handleCheckout}
							className='w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700'>
							Proceed to Checkout <FiArrowRight className='ml-2' />
						</button>
						<Link
							to='/'
							className='mt-4 block text-center text-sm text-blue-600 hover:underline'>
							Continue Shopping
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
