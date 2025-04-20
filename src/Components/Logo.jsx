import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logo = () => {
	return (
		<Link to='/'>
			<motion.div
				className='relative'
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}>
				<h1 className='text-3xl font-script text-gray-800'>LeeWo Jones</h1>
				<span className='text-sm tracking-wider font-light block text-gray-600'>
					PHOTOGRAPHY
				</span>
			</motion.div>
		</Link>
	);
};

export default Logo;
