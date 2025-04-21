// Pages/CheckoutPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
	FiCreditCard,
	FiLock,
	FiTruck,
	FiCheck,
	FiShoppingCart,
} from 'react-icons/fi';
import { CartContext } from '../context/CartContext';

const CheckoutPage = () => {
	const navigate = useNavigate();
	const { cart, clearCart } = useContext(CartContext);

	const [formData, setFormData] = useState({
		// Contact Information
		email: '',
		phone: '',

		// Shipping Information
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		state: '',
		zipCode: '',
		country: 'United States',

		// Payment Information
		cardName: '',
		cardNumber: '',
		expiryDate: '',
		cvv: '',

		// Additional
		saveInfo: false,
		notes: '',
	});

	const [step, setStep] = useState(1);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [orderComplete, setOrderComplete] = useState(false);
	const [orderNumber, setOrderNumber] = useState('');

	// Calculate totals
	const subtotal = cart.reduce((sum, item) => {
		// Calculate the discounted price
		const discountedPrice =
			item.discount > 0 ? item.price * (1 - item.discount) : item.price;

		// Calculate size and format additions if they exist
		let totalPrice = discountedPrice;

		// Add price adjustments based on selected options
		if (item.selectedSize) {
			const sizePricing = {
				small: 0,
				medium: discountedPrice * 0.2,
				large: discountedPrice * 0.5,
				extraLarge: discountedPrice * 0.8,
			};
			totalPrice += sizePricing[item.selectedSize] || 0;
		}

		if (item.selectedFormat) {
			const formatPricing = {
				digital: 0,
				print: discountedPrice * 0.3,
				canvas: discountedPrice * 0.6,
				framed: discountedPrice * 1,
			};
			totalPrice += formatPricing[item.selectedFormat] || 0;
		}

		return sum + totalPrice * (item.quantity || 1);
	}, 0);

	const shipping = subtotal > 0 ? 12.99 : 0;
	const tax = subtotal * 0.085; // Assume 8.5% tax rate
	const total = subtotal + shipping + tax;

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === 'checkbox' ? checked : value,
		}));

		// Clear error for this field if exists
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: null,
			}));
		}
	};

	const validateStep = (currentStep) => {
		const newErrors = {};

		if (currentStep === 1) {
			if (!formData.email) newErrors.email = 'Email is required';
			else if (!/\S+@\S+\.\S+/.test(formData.email))
				newErrors.email = 'Email is invalid';

			if (!formData.phone) newErrors.phone = 'Phone number is required';
		}

		if (currentStep === 2) {
			if (!formData.firstName) newErrors.firstName = 'First name is required';
			if (!formData.lastName) newErrors.lastName = 'Last name is required';
			if (!formData.address) newErrors.address = 'Address is required';
			if (!formData.city) newErrors.city = 'City is required';
			if (!formData.state) newErrors.state = 'State is required';
			if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
		}

		if (currentStep === 3) {
			if (!formData.cardName) newErrors.cardName = 'Name on card is required';
			if (!formData.cardNumber)
				newErrors.cardNumber = 'Card number is required';
			else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, '')))
				newErrors.cardNumber = 'Card number is invalid';

			if (!formData.expiryDate)
				newErrors.expiryDate = 'Expiry date is required';
			else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate))
				newErrors.expiryDate = 'Expiry date is invalid (MM/YY)';

			if (!formData.cvv) newErrors.cvv = 'CVV is required';
			else if (!/^\d{3,4}$/.test(formData.cvv))
				newErrors.cvv = 'CVV is invalid';
		}

		return newErrors;
	};

	const goToNextStep = () => {
		const errorsInStep = validateStep(step);

		if (Object.keys(errorsInStep).length === 0) {
			setStep((prevStep) => prevStep + 1);
			window.scrollTo(0, 0);
		} else {
			setErrors(errorsInStep);
		}
	};

	const goToPrevStep = () => {
		setStep((prevStep) => prevStep - 1);
		window.scrollTo(0, 0);
	};

	const handleSubmitOrder = (e) => {
		e.preventDefault();

		const errorsInStep = validateStep(step);

		if (Object.keys(errorsInStep).length === 0) {
			setIsSubmitting(true);

			// Simulate order processing
			setTimeout(() => {
				// Generate a random order number
				const randomOrderNumber = `LWJ-${Math.floor(
					100000 + Math.random() * 900000
				)}`;
				setOrderNumber(randomOrderNumber);
				setOrderComplete(true);
				setIsSubmitting(false);
				clearCart();
				window.scrollTo(0, 0);
			}, 2000);
		} else {
			setErrors(errorsInStep);
		}
	};

	// Redirect if cart is empty and not completed order
	useEffect(() => {
		if (cart.length === 0 && !orderComplete) {
			navigate('/cart');
		}
	}, [cart, orderComplete, navigate]);

	if (orderComplete) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className='max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-12'>
					<div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6'>
						<FiCheck className='h-8 w-8 text-green-600' />
					</div>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
						Order Confirmed!
					</h1>
					<p className='text-lg text-gray-600 max-w-lg mx-auto'>
						Thank you for your purchase. Your order has been confirmed and will
						be processed shortly.
					</p>
				</div>

				<div className='bg-white rounded-lg shadow-lg overflow-hidden mb-8'>
					<div className='border-b border-gray-200 p-6'>
						<div className='flex justify-between items-center'>
							<div>
								<h2 className='text-lg font-medium text-gray-900'>
									Order Summary
								</h2>
								<p className='text-gray-600'>Order #{orderNumber}</p>
							</div>
							<div className='text-right'>
								<p className='text-gray-600'>Order Date</p>
								<p className='font-medium'>{new Date().toLocaleDateString()}</p>
							</div>
						</div>
					</div>

					<div className='p-6 space-y-6'>
						<div>
							<h3 className='font-medium text-gray-900 mb-3'>
								Shipping Information
							</h3>
							<p className='text-gray-600'>
								{formData.firstName} {formData.lastName}
							</p>
							<p className='text-gray-600'>{formData.address}</p>
							<p className='text-gray-600'>
								{formData.city}, {formData.state} {formData.zipCode}
							</p>
							<p className='text-gray-600'>{formData.country}</p>
						</div>

						<div>
							<h3 className='font-medium text-gray-900 mb-3'>Payment Method</h3>
							<p className='text-gray-600'>
								<span className='font-medium'>Credit Card</span> ending in{' '}
								{formData.cardNumber.slice(-4)}
							</p>
						</div>

						<div>
							<h3 className='font-medium text-gray-900 mb-3'>Order Details</h3>
							<div className='divide-y divide-gray-200'>
								{cart.map((item) => (
									<div
										key={item.id}
										className='py-4 flex justify-between'>
										<div className='flex'>
											<div className='w-16 h-16 bg-gray-100 rounded overflow-hidden mr-4'>
												<img
													src={item.imageUrl || '/api/placeholder/100/100'}
													alt={item.title}
													className='w-full h-full object-cover'
												/>
											</div>
											<div>
												<p className='font-medium text-gray-900'>
													{item.title}
												</p>
												<p className='text-sm text-gray-600'>
													{item.selectedSize &&
														`Size: ${
															item.selectedSize.charAt(0).toUpperCase() +
															item.selectedSize.slice(1)
														}`}
													{item.selectedSize && item.selectedFormat && ' / '}
													{item.selectedFormat &&
														`Format: ${
															item.selectedFormat.charAt(0).toUpperCase() +
															item.selectedFormat.slice(1)
														}`}
												</p>
												<p className='text-sm text-gray-600'>
													Qty: {item.quantity || 1}
												</p>
											</div>
										</div>
										<p className='font-medium text-gray-900'>
											${(item.finalPrice || item.price).toFixed(2)}
										</p>
									</div>
								))}
							</div>
						</div>

						<div className='border-t border-gray-200 pt-6'>
							<div className='flex justify-between mb-2'>
								<p className='text-gray-600'>Subtotal</p>
								<p className='font-medium'>${subtotal.toFixed(2)}</p>
							</div>
							<div className='flex justify-between mb-2'>
								<p className='text-gray-600'>Shipping</p>
								<p className='font-medium'>${shipping.toFixed(2)}</p>
							</div>
							<div className='flex justify-between mb-4'>
								<p className='text-gray-600'>Tax</p>
								<p className='font-medium'>${tax.toFixed(2)}</p>
							</div>
							<div className='flex justify-between text-lg font-medium'>
								<p>Total</p>
								<p>${total.toFixed(2)}</p>
							</div>
						</div>
					</div>
				</div>

				<div className='text-center'>
					<Link
						to='/'
						className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition'>
						Continue Shopping
					</Link>
				</div>
			</motion.div>
		);
	}

	return (
		<div className='bg-gray-50'>
			<div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-5xl mx-auto'>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className='mb-8'>
						<h1 className='text-3xl font-bold text-gray-900 mb-4'>Checkout</h1>

						{/* Checkout Steps */}
						<div className='flex justify-between items-center'>
							<div className='relative flex items-center justify-center w-full'>
								<div className='absolute inset-0 flex items-center'>
									<div className='h-1 w-full bg-gray-200'>
										<div
											className='h-1 bg-blue-600 transition-all duration-300'
											style={{
												width: step === 1 ? '0%' : step === 2 ? '50%' : '100%',
											}}></div>
									</div>
								</div>
								<div className='relative flex justify-between w-full'>
									<div className='flex flex-col items-center'>
										<div
											className={`${
												step >= 1 ? 'bg-blue-600' : 'bg-gray-200'
											} rounded-full h-12 w-12 flex items-center justify-center transition-colors duration-300`}>
											<FiShoppingCart
												className={`${
													step >= 1 ? 'text-white' : 'text-gray-600'
												} h-6 w-6`}
											/>
										</div>
										<p className='mt-2 text-sm font-medium text-gray-900'>
											Customer Info
										</p>
									</div>
									<div className='flex flex-col items-center'>
										<div
											className={`${
												step >= 2 ? 'bg-blue-600' : 'bg-gray-200'
											} rounded-full h-12 w-12 flex items-center justify-center transition-colors duration-300`}>
											<FiTruck
												className={`${
													step >= 2 ? 'text-white' : 'text-gray-600'
												} h-6 w-6`}
											/>
										</div>
										<p className='mt-2 text-sm font-medium text-gray-900'>
											Shipping
										</p>
									</div>
									<div className='flex flex-col items-center'>
										<div
											className={`${
												step >= 3 ? 'bg-blue-600' : 'bg-gray-200'
											} rounded-full h-12 w-12 flex items-center justify-center transition-colors duration-300`}>
											<FiCreditCard
												className={`${
													step >= 3 ? 'text-white' : 'text-gray-600'
												} h-6 w-6`}
											/>
										</div>
										<p className='mt-2 text-sm font-medium text-gray-900'>
											Payment
										</p>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					<div className='bg-white shadow-lg rounded-lg overflow-hidden'>
						<div className='p-6 md:p-8'>
							<form
								onSubmit={
									step === 3 ? handleSubmitOrder : (e) => e.preventDefault()
								}>
								{/* Step 1: Customer Information */}
								{step === 1 && (
									<motion.div
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3 }}>
										<h2 className='text-xl font-semibold text-gray-900 mb-6'>
											Contact Information
										</h2>

										<div className='space-y-6'>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
												<div className='col-span-2'>
													<label
														htmlFor='email'
														className='block text-sm font-medium text-gray-700 mb-1'>
														Email Address
													</label>
													<input
														type='email'
														id='email'
														name='email'
														value={formData.email}
														onChange={handleChange}
														className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
															errors.email
																? 'border-red-500'
																: 'border-gray-300'
														}`}
														placeholder='your@email.com'
													/>
													{errors.email && (
														<p className='mt-1 text-sm text-red-500'>
															{errors.email}
														</p>
													)}
												</div>

												<div className='col-span-2'>
													<label
														htmlFor='phone'
														className='block text-sm font-medium text-gray-700 mb-1'>
														Phone Number
													</label>
													<input
														type='tel'
														id='phone'
														name='phone'
														value={formData.phone}
														onChange={handleChange}
														className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
															errors.phone
																? 'border-red-500'
																: 'border-gray-300'
														}`}
														placeholder='(123) 456-7890'
													/>
													{errors.phone && (
														<p className='mt-1 text-sm text-red-500'>
															{errors.phone}
														</p>
													)}
												</div>
											</div>
										</div>
									</motion.div>
								)}

								{/* Step 2: Shipping Information */}
								{step === 2 && (
									<motion.div
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3 }}>
										<h2 className='text-xl font-semibold text-gray-900 mb-6'>
											Shipping Information
										</h2>

										<div className='space-y-6'>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
												<div>
													<label
														htmlFor='firstName'
														className='block text-sm font-medium text-gray-700 mb-1'>
														First Name
													</label>
													<input
														type='text'
														id='firstName'
														name='firstName'
														value={formData.firstName}
														onChange={handleChange}
														className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
															errors.firstName
																? 'border-red-500'
																: 'border-gray-300'
														}`}
													/>
													{errors.firstName && (
														<p className='mt-1 text-sm text-red-500'>
															{errors.firstName}
														</p>
													)}
												</div>

												<div>
													<label
														htmlFor='lastName'
														className='block text-sm font-medium text-gray-700 mb-1'>
														Last Name
													</label>
													<input
														type='text'
														id='lastName'
														name='lastName'
														value={formData.lastName}
														onChange={handleChange}
														className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
															errors.lastName
																? 'border-red-500'
																: 'border-gray-300'
														}`}
													/>
													{errors.lastName && (
														<p className='mt-1 text-sm text-red-500'>
															{errors.lastName}
														</p>
													)}
												</div>

												<div className='col-span-2'>
													<label
														htmlFor='address'
														className='block text-sm font-medium text-gray-700 mb-1'>
														Address
													</label>
													<input
														type='text'
														id='address'
														name='address'
														value={formData.address}
														onChange={handleChange}
														className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
															errors.address
																? 'border-red-500'
																: 'border-gray-300'
														}`}
													/>
													{errors.address && (
														<p className='mt-1 text-sm text-red-500'>
															{errors.address}
														</p>
													)}
												</div>

												<div>
													<label
														htmlFor='city'
														className='block text-sm font-medium text-gray-700 mb-1'>
														City
													</label>
													<input
														type='text'
														id='city'
														name='city'
														value={formData.city}
														onChange={handleChange}
														className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
															errors.city ? 'border-red-500' : 'border-gray-300'
														}`}
													/>
													{errors.city && (
														<p className='mt-1 text-sm text-red-500'>
															{errors.city}
														</p>
													)}
												</div>

												<div className='grid grid-cols-2 gap-4'>
													<div>
														<label
															htmlFor='state'
															className='block text-sm font-medium text-gray-700 mb-1'>
															State
														</label>
														<input
															type='text'
															id='state'
															name='state'
															value={formData.state}
															onChange={handleChange}
															className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
																errors.state
																	? 'border-red-500'
																	: 'border-gray-300'
															}`}
														/>
														{errors.state && (
															<p className='mt-1 text-sm text-red-500'>
																{errors.state}
															</p>
														)}
													</div>

													<div>
														<label
															htmlFor='zipCode'
															className='block text-sm font-medium text-gray-700 mb-1'>
															ZIP Code
														</label>
														<input
															type='text'
															id='zipCode'
															name='zipCode'
															value={formData.zipCode}
															onChange={handleChange}
															className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
																errors.zipCode
																	? 'border-red-500'
																	: 'border-gray-300'
															}`}
														/>
														{errors.zipCode && (
															<p className='mt-1 text-sm text-red-500'>
																{errors.zipCode}
															</p>
														)}
													</div>
												</div>

												<div>
													<label
														htmlFor='country'
														className='block text-sm font-medium text-gray-700 mb-1'>
														Country
													</label>
													<select
														id='country'
														name='country'
														value={formData.country}
														onChange={handleChange}
														className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'>
														<option value='United States'>United States</option>
														<option value='Canada'>Canada</option>
														<option value='Mexico'>Mexico</option>
														<option value='United Kingdom'>
															United Kingdom
														</option>
													</select>
												</div>

												<div className='col-span-2'>
													<label
														htmlFor='notes'
														className='block text-sm font-medium text-gray-700 mb-1'>
														Order Notes (Optional)
													</label>
													<textarea
														id='notes'
														name='notes'
														value={formData.notes}
														onChange={handleChange}
														rows='3'
														className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
														placeholder='Special delivery instructions or other notes'></textarea>
												</div>
											</div>
										</div>
									</motion.div>
								)}

								{/* Step 3: Payment Information */}
								{step === 3 && (
									<motion.div
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3 }}>
										<h2 className='text-xl font-semibold text-gray-900 mb-6'>
											Payment Information
										</h2>

										<div className='space-y-6'>
											<div className='flex items-center justify-start mb-4'>
												<FiLock className='h-5 w-5 text-gray-500 mr-2' />
												<p className='text-sm text-gray-600'>
													Your payment information is secure and encrypted
												</p>
											</div>

											<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
												<div className='col-span-2'>
													<label
														htmlFor='cardName'
														className='block text-sm font-medium text-gray-700 mb-1'>
														Name on Card
													</label>
													<input
														type='text'
														id='cardName'
														name='cardName'
														value={formData.cardName}
														onChange={handleChange}
														className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
															errors.cardName
																? 'border-red-500'
																: 'border-gray-300'
														}`}
													/>
													{errors.cardName && (
														<p className='mt-1 text-sm text-red-500'>
															{errors.cardName}
														</p>
													)}
												</div>

												<div className='col-span-2'>
													<label
														htmlFor='cardNumber'
														className='block text-sm font-medium text-gray-700 mb-1'>
														Card Number
													</label>
													<input
														type='text'
														id='cardNumber'
														name='cardNumber'
														value={formData.cardNumber}
														onChange={handleChange}
														placeholder='XXXX XXXX XXXX XXXX'
														className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
															errors.cardNumber
																? 'border-red-500'
																: 'border-gray-300'
														}`}
													/>
													{errors.cardNumber && (
														<p className='mt-1 text-sm text-red-500'>
															{errors.cardNumber}
														</p>
													)}
												</div>

												<div>
													<label
														htmlFor='expiryDate'
														className='block text-sm font-medium text-gray-700 mb-1'>
														Expiry Date
													</label>
													<input
														type='text'
														id='expiryDate'
														name='expiryDate'
														value={formData.expiryDate}
														onChange={handleChange}
														placeholder='MM/YY'
														className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
															errors.expiryDate
																? 'border-red-500'
																: 'border-gray-300'
														}`}
													/>
													{errors.expiryDate && (
														<p className='mt-1 text-sm text-red-500'>
															{errors.expiryDate}
														</p>
													)}
												</div>

												<div>
													<label
														htmlFor='cvv'
														className='block text-sm font-medium text-gray-700 mb-1'>
														CVV
													</label>
													<input
														type='text'
														id='cvv'
														name='cvv'
														value={formData.cvv}
														onChange={handleChange}
														placeholder='123'
														className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
															errors.cvv ? 'border-red-500' : 'border-gray-300'
														}`}
													/>
													{errors.cvv && (
														<p className='mt-1 text-sm text-red-500'>
															{errors.cvv}
														</p>
													)}
												</div>

												<div className='col-span-2'>
													<div className='flex items-center'>
														<input
															type='checkbox'
															id='saveInfo'
															name='saveInfo'
															checked={formData.saveInfo}
															onChange={handleChange}
															className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
														/>
														<label
															htmlFor='saveInfo'
															className='ml-2 block text-sm text-gray-700'>
															Save my payment information for future purchases
														</label>
													</div>
												</div>
											</div>
										</div>
									</motion.div>
								)}

								{/* Order Summary - Always visible */}
								<div className='mt-10 pt-6 border-t border-gray-200'>
									<h2 className='text-xl font-semibold text-gray-900 mb-4'>
										Order Summary
									</h2>

									<div className='space-y-4 max-h-64 overflow-y-auto mb-6'>
										{cart.map((item) => (
											<div
												key={item.id}
												className='flex items-center justify-between py-3 border-b border-gray-100'>
												<div className='flex items-center'>
													<div className='w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0'>
														<img
															src={item.imageUrl || '/api/placeholder/100/100'}
															alt={item.title}
															className='w-full h-full object-cover'
														/>
													</div>
													<div className='ml-4'>
														<p className='font-medium text-gray-900'>
															{item.title}
														</p>
														<p className='text-sm text-gray-600'>
															{item.selectedSize &&
																`Size: ${
																	item.selectedSize.charAt(0).toUpperCase() +
																	item.selectedSize.slice(1)
																}`}
															{item.selectedSize &&
																item.selectedFormat &&
																' / '}
															{item.selectedFormat &&
																`Format: ${
																	item.selectedFormat.charAt(0).toUpperCase() +
																	item.selectedFormat.slice(1)
																}`}
														</p>
														<p className='text-sm text-gray-600'>
															Qty: {item.quantity || 1}
														</p>
													</div>
												</div>
												<p className='font-medium text-gray-900'>
													$
													{(
														(item.finalPrice || item.price) *
														(item.quantity || 1)
													).toFixed(2)}
												</p>
											</div>
										))}
									</div>

									<div className='space-y-2'>
										<div className='flex justify-between'>
											<p className='text-gray-600'>Subtotal</p>
											<p className='font-medium'>${subtotal.toFixed(2)}</p>
										</div>
										<div className='flex justify-between'>
											<p className='text-gray-600'>Shipping</p>
											<p className='font-medium'>${shipping.toFixed(2)}</p>
										</div>
										<div className='flex justify-between'>
											<p className='text-gray-600'>Tax</p>
											<p className='font-medium'>${tax.toFixed(2)}</p>
										</div>
										<div className='border-t border-gray-200 pt-2 mt-2'>
											<div className='flex justify-between text-lg font-medium'>
												<p>Total</p>
												<p>${total.toFixed(2)}</p>
											</div>
										</div>
									</div>
								</div>

								{/* Navigation Buttons */}
								<div className='mt-8 flex justify-between'>
									{step > 1 ? (
										<button
											type='button'
											onClick={goToPrevStep}
											className='px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
											Back
										</button>
									) : (
										<Link
											to='/cart'
											className='px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
											Return to Cart
										</Link>
									)}

									{step < 3 ? (
										<button
											type='button'
											onClick={goToNextStep}
											className='px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
											Continue
										</button>
									) : (
										<button
											type='submit'
											disabled={isSubmitting}
											className={`${
												isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
											} px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center`}>
											{isSubmitting ? (
												<>
													<svg
														className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'>
														<circle
															className='opacity-25'
															cx='12'
															cy='12'
															r='10'
															stroke='currentColor'
															strokeWidth='4'></circle>
														<path
															className='opacity-75'
															fill='currentColor'
															d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
													</svg>
													Processing...
												</>
											) : (
												'Place Order'
											)}
										</button>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
