// Pages/ContactPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [formStatus, setFormStatus] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Simulate form submission
		setFormStatus('sending');

		// In a real app, you would send the form data to your backend here
		setTimeout(() => {
			setFormStatus('success');
			setFormData({
				name: '',
				email: '',
				subject: '',
				message: '',
			});
		}, 1500);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className='container mx-auto px-4 py-12 max-w-6xl'>
			<div className='flex flex-col md:flex-row gap-8'>
				<div className='md:w-1/2'>
					<h1 className='text-4xl font-bold mb-6 text-gray-800'>
						Get in Touch
					</h1>
					<p className='text-gray-700 mb-8 max-w-md'>
						Have questions about my work, print options, or commission
						opportunities? Fill out the form, and I'll get back to you within 48
						hours.
					</p>

					<div className='bg-white shadow-md rounded-lg p-6 mb-8'>
						<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
							Contact Information
						</h2>
						<div className='space-y-4'>
							<div className='flex items-start'>
								<div className='bg-gray-100 p-2 rounded-full mr-4'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6 text-gray-600'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
										/>
									</svg>
								</div>
								<div>
									<p className='font-medium text-gray-800'>Email</p>
									<p className='text-gray-600'>contact@leewojones.com</p>
								</div>
							</div>

							<div className='flex items-start'>
								<div className='bg-gray-100 p-2 rounded-full mr-4'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6 text-gray-600'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
										/>
									</svg>
								</div>
								<div>
									<p className='font-medium text-gray-800'>Phone</p>
									<p className='text-gray-600'>(503) 555-0123</p>
								</div>
							</div>

							<div className='flex items-start'>
								<div className='bg-gray-100 p-2 rounded-full mr-4'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6 text-gray-600'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
										/>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
										/>
									</svg>
								</div>
								<div>
									<p className='font-medium text-gray-800'>Studio Location</p>
									<p className='text-gray-600'>123 Pearl District Ave</p>
									<p className='text-gray-600'>Portland, OR 97209</p>
								</div>
							</div>
						</div>
					</div>

					<div className='bg-white shadow-md rounded-lg p-6'>
						<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
							Studio Hours
						</h2>
						<div className='grid grid-cols-2 gap-2'>
							<div>
								<p className='font-medium text-gray-800'>Monday - Friday</p>
								<p className='text-gray-600'>10:00 AM - 6:00 PM</p>
							</div>
							<div>
								<p className='font-medium text-gray-800'>Saturday</p>
								<p className='text-gray-600'>11:00 AM - 4:00 PM</p>
							</div>
							<div className='col-span-2'>
								<p className='font-medium text-gray-800'>Sunday</p>
								<p className='text-gray-600'>By appointment only</p>
							</div>
						</div>
					</div>
				</div>

				<div className='md:w-1/2'>
					<div className='bg-white shadow-md rounded-lg p-6'>
						<h2 className='text-2xl font-semibold mb-6 text-gray-800'>
							Send a Message
						</h2>

						<form onSubmit={handleSubmit}>
							<div className='mb-4'>
								<label
									htmlFor='name'
									className='block text-gray-700 font-medium mb-2'>
									Your Name
								</label>
								<input
									type='text'
									id='name'
									name='name'
									value={formData.name}
									onChange={handleChange}
									className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
									required
								/>
							</div>

							<div className='mb-4'>
								<label
									htmlFor='email'
									className='block text-gray-700 font-medium mb-2'>
									Email Address
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleChange}
									className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
									required
								/>
							</div>

							<div className='mb-4'>
								<label
									htmlFor='subject'
									className='block text-gray-700 font-medium mb-2'>
									Subject
								</label>
								<input
									type='text'
									id='subject'
									name='subject'
									value={formData.subject}
									onChange={handleChange}
									className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
									required
								/>
							</div>

							<div className='mb-6'>
								<label
									htmlFor='message'
									className='block text-gray-700 font-medium mb-2'>
									Your Message
								</label>
								<textarea
									id='message'
									name='message'
									value={formData.message}
									onChange={handleChange}
									rows='5'
									className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
									required></textarea>
							</div>

							<button
								type='submit'
								disabled={formStatus === 'sending'}
								className={`w-full py-3 px-4 rounded-md text-white font-medium transition ${
									formStatus === 'sending'
										? 'bg-blue-400 cursor-not-allowed'
										: 'bg-blue-600 hover:bg-blue-700'
								}`}>
								{formStatus === 'sending' ? 'Sending...' : 'Send Message'}
							</button>

							{formStatus === 'success' && (
								<div className='mt-4 p-3 bg-green-100 text-green-700 rounded-md'>
									Thank you! Your message has been sent successfully. I'll get
									back to you soon.
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ContactPage;
