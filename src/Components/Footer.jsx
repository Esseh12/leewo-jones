import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import Logo from './Logo';

const Footer = () => {
	return (
		<footer className='bg-gray-800 text-white py-8'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					<div className='space-y-4'>
						<div className='text-white'>
							<Logo />
						</div>
						<p className='text-sm text-gray-300'>
							Capturing moments that last forever. Premium photography for all
							occasions.
						</p>
						<div className='flex space-x-4'>
							<a
								href='https://facebook.com'
								target='_blank'
								rel='noopener noreferrer'
								className='text-gray-300 hover:text-white'>
								<FiFacebook size={20} />
							</a>
							<a
								href='https://instagram.com'
								target='_blank'
								rel='noopener noreferrer'
								className='text-gray-300 hover:text-white'>
								<FiInstagram size={20} />
							</a>
							<a
								href='https://twitter.com'
								target='_blank'
								rel='noopener noreferrer'
								className='text-gray-300 hover:text-white'>
								<FiTwitter size={20} />
							</a>
						</div>
					</div>

					<div>
						<h3 className='text-lg font-semibold mb-4'>Categories</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									to='/category/bikes'
									className='text-gray-300 hover:text-white'>
									Bikes
								</Link>
							</li>
							<li>
								<Link
									to='/category/weddings'
									className='text-gray-300 hover:text-white'>
									Weddings
								</Link>
							</li>
							<li>
								<Link
									to='/category/nature'
									className='text-gray-300 hover:text-white'>
									Nature
								</Link>
							</li>
							<li>
								<Link
									to='/category/urban'
									className='text-gray-300 hover:text-white'>
									Urban
								</Link>
							</li>
							<li>
								<Link
									to='/category/portrait'
									className='text-gray-300 hover:text-white'>
									Portrait
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold mb-4'>Customer Service</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									to='/faq'
									className='text-gray-300 hover:text-white'>
									FAQ
								</Link>
							</li>
							<li>
								<Link
									to='/shipping'
									className='text-gray-300 hover:text-white'>
									Shipping & Returns
								</Link>
							</li>
							<li>
								<Link
									to='/terms'
									className='text-gray-300 hover:text-white'>
									Terms & Conditions
								</Link>
							</li>
							<li>
								<Link
									to='/privacy'
									className='text-gray-300 hover:text-white'>
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
						<ul className='space-y-2 text-gray-300'>
							<li>123 Photo Street</li>
							<li>New York, NY 10001</li>
							<li>info@leewojones.com</li>
							<li>(555) 123-4567</li>
						</ul>
					</div>
				</div>

				<div className='border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400'>
					&copy; {new Date().getFullYear()} LeeWo Jones Photography. All rights
					reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
