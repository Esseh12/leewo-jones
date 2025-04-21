// Pages/AboutPage.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className='container mx-auto px-4 py-12 max-w-5xl'>
			<div className='bg-white shadow-lg rounded-lg overflow-hidden'>
				<div className='relative h-96'>
					<img
						src='/api/placeholder/1200/400'
						alt='Leewo Jones at work'
						className='w-full h-full object-cover'
					/>
					<div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
						<h1 className='text-5xl font-bold text-white tracking-wide'>
							About Leewo Jones
						</h1>
					</div>
				</div>

				<div className='p-8 md:p-12'>
					<div className='flex flex-col md:flex-row gap-8 mb-12'>
						<div className='md:w-1/3'>
							<img
								src='/api/placeholder/400/500'
								alt='Leewo Jones Portrait'
								className='rounded-lg shadow-md w-full'
							/>
						</div>
						<div className='md:w-2/3'>
							<h2 className='text-3xl font-semibold mb-4 text-gray-800'>
								My Story
							</h2>
							<p className='text-gray-700 mb-4 leading-relaxed'>
								For over 15 years, I've been capturing the extraordinary in the
								ordinary, finding beauty in unexpected places through my lens.
								My journey into photography began when I was gifted my first
								camera at the age of 16, and since then, I've been captivated by
								the power of visual storytelling.
							</p>
							<p className='text-gray-700 mb-4 leading-relaxed'>
								Based in Portland, Oregon, I draw inspiration from the stunning
								natural landscapes of the Pacific Northwest, vibrant urban
								scenes, and the raw authenticity of candid human moments. My
								work has been featured in various galleries across the country
								and in publications such as National Geographic Traveler and
								Outdoor Photography Magazine.
							</p>
							<p className='text-gray-700 leading-relaxed'>
								Each photograph available in my collection represents a moment
								frozen in time, a story waiting to be told, and a piece of the
								world as I see it. I believe that photography has the power to
								evoke emotions, challenge perspectives, and connect humans
								across different walks of life.
							</p>
						</div>
					</div>

					<div className='mb-12'>
						<h2 className='text-3xl font-semibold mb-6 text-gray-800'>
							My Approach
						</h2>
						<div className='grid md:grid-cols-3 gap-6'>
							<div className='bg-gray-50 p-6 rounded-lg shadow-sm'>
								<h3 className='text-xl font-medium mb-3 text-gray-800'>
									Vision
								</h3>
								<p className='text-gray-700'>
									I believe in capturing authentic moments rather than creating
									artificial ones. My photography reflects life as it unfolds,
									with all its imperfections and beauty.
								</p>
							</div>
							<div className='bg-gray-50 p-6 rounded-lg shadow-sm'>
								<h3 className='text-xl font-medium mb-3 text-gray-800'>
									Technique
								</h3>
								<p className='text-gray-700'>
									While embracing modern digital technology, I maintain a
									respect for traditional photographic principles. Each image is
									thoughtfully composed and minimally processed.
								</p>
							</div>
							<div className='bg-gray-50 p-6 rounded-lg shadow-sm'>
								<h3 className='text-xl font-medium mb-3 text-gray-800'>
									Ethics
								</h3>
								<p className='text-gray-700'>
									I'm committed to responsible photography practices, respecting
									my subjects, their environments, and maintaining the integrity
									of the moments I capture.
								</p>
							</div>
						</div>
					</div>

					<div>
						<h2 className='text-3xl font-semibold mb-6 text-gray-800'>
							Professional Experience
						</h2>
						<div className='space-y-6'>
							<div className='border-l-4 border-gray-300 pl-4'>
								<h3 className='text-xl font-medium text-gray-800'>
									National Geographic Contributor
								</h3>
								<p className='text-gray-600 italic mb-2'>2018 - Present</p>
								<p className='text-gray-700'>
									Contributing photographer for special wilderness projects and
									environmental documentation series.
								</p>
							</div>
							<div className='border-l-4 border-gray-300 pl-4'>
								<h3 className='text-xl font-medium text-gray-800'>
									Portland Art Museum Exhibitions
								</h3>
								<p className='text-gray-600 italic mb-2'>2016, 2019, 2022</p>
								<p className='text-gray-700'>
									Featured artist for three major photography exhibitions
									focusing on urban transformation.
								</p>
							</div>
							<div className='border-l-4 border-gray-300 pl-4'>
								<h3 className='text-xl font-medium text-gray-800'>
									Photography Workshop Instructor
								</h3>
								<p className='text-gray-600 italic mb-2'>2015 - Present</p>
								<p className='text-gray-700'>
									Conducting seasonal workshops for aspiring photographers,
									focusing on landscape and street photography techniques.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default AboutPage;
