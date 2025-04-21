// components/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{products.map((product) => (
					<div
						key={product.id}
						className='flex'>
						<ProductCard product={product} />
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductGrid;
