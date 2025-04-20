// // pages/CartPage.jsx
// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiTrash2, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
// import { CartContext } from '../App';

// const CartPage = () => {
//   const { cart, removeFromCart, updateQuantity, totalPrice } = useContext(CartContext);
//   const navigate = useNavigate();

//   // Anti-screenshot and download protections
//   const handleContextMenu = (e) => {
//     e.preventDefault();
//     return false;
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
//           <p className="text-lg text-gray-600 mb-8">Looks like you haven't added any photos to your cart yet.</p>
//           <Link
//             to="/"
//             className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white">
//       <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-10">Shopping Cart</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2">
//             <div className="border rounded-lg overflow-hidden shadow-sm">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="py-3 pl-4 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Product
//                     </th>
//                     <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Options
//                     </th>
//                     <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Price
//                     </th>
//                     <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Quantity
//                     </th>
//                     <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Total
//                     </th>
//                     <th scope="col" className="relative px-3 py-3">
//                       <span className="sr-only">Remove</span>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {cart.map((item) => {
//                     // Calculate the actual price based on options
//                     const basePrice = item.discount > 0
//                       ? item.price * (1 - item.discount)
//                       : item.price;

//                     // Size pricing adjustments
//                     const sizePricing = {
//                       small: 0,
//                       medium: basePrice * 0.2,
//                       large: basePrice * 0.5,
//                       extraLarge: basePrice * 0.8
//                     };

//                     // Format pricing adjustments
//                     const formatPricing = {
//                       digital: 0,
//                       print: basePrice * 0.3,
//                       canvas: basePrice * 0.6,
//                       framed: basePrice * 1
//                     };

//                     const itemSize = item.selectedSize || 'medium';
//                     const itemFormat = item.selectedFormat || 'digital';

//                     // Calculate final price per item
//                     const finalPrice = basePrice + sizePricing[itemSize] + formatPricing[itemFormat];

//                     return (
//                       <motion.tr
//                         key={item.id}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                       >
//                         <td className="py-4 pl-4 pr-3 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className
