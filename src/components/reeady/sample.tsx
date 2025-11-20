// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
const App: React.FC = () => {
const [email, setEmail] = useState('');
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [cartOpen, setCartOpen] = useState(false);
const [cartItems, setCartItems] = useState<any[]>([]);
const toggleMenu = () => {
setIsMenuOpen(!isMenuOpen);
};
const toggleCart = () => {
setCartOpen(!cartOpen);
};
const addToCart = (product: any) => {
setCartItems([...cartItems, product]);
// Show toast notification
const toast = document.getElementById('toast');
if (toast) {
toast.classList.remove('hidden');
setTimeout(() => {
toast.classList.add('hidden');
}, 3000);
}
};
return (
<div className="min-h-screen bg-white">
{/* Toast Notification */}
<div id="toast" className="fixed top-20 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 hidden">
Product added to cart!
</div>
{/* Header */}
<header className="sticky top-0 bg-white shadow-md z-40">
<div className="container mx-auto px-4 py-4 flex items-center justify-between">
{/* Logo */}
<div className="flex items-center">
<h1 className="text-2xl font-bold text-gray-800">Limpopo<span className="text-amber-600"> Furniture</span></h1>
</div>
{/* Desktop Navigation */}
<nav className="hidden md:flex space-x-8">
<a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Home</a>
<div className="relative group">
<a href="#" className="text-gray-700 hover:text-amber-600 font-medium flex items-center">
Categories
<i className="fas fa-chevron-down ml-1 text-xs"></i>
</a>
<div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 hidden group-hover:block">
<a href="#" className="block px-4 py-2 text-gray-700 hover:bg-amber-50 rounded-md">Sofas</a>
<a href="#" className="block px-4 py-2 text-gray-700 hover:bg-amber-50 rounded-md">Beds</a>
<a href="#" className="block px-4 py-2 text-gray-700 hover:bg-amber-50 rounded-md">Tables</a>
<a href="#" className="block px-4 py-2 text-gray-700 hover:bg-amber-50 rounded-md">Chairs</a>
<a href="#" className="block px-4 py-2 text-gray-700 hover:bg-amber-50 rounded-md">Storage</a>
</div>
</div>
<a href="#" className="text-gray-700 hover:text-amber-600 font-medium">New Arrivals</a>
<a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Sale</a>
<a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Contact</a>
</nav>
{/* Search, Cart, Account */}
<div className="flex items-center space-x-6">
<div className="relative hidden md:block">
<input
type="text"
placeholder="Search products..."
className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
/>
<i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
</div>
<button className="text-gray-700 hover:text-amber-600 cursor-pointer">
<i className="fas fa-search md:hidden text-xl"></i>
</button>
<button className="text-gray-700 hover:text-amber-600 relative cursor-pointer" onClick={toggleCart}>
<i className="fas fa-shopping-bag text-xl"></i>
{cartItems.length > 0 && (
<span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
{cartItems.length}
</span>
)}
</button>
<button className="text-gray-700 hover:text-amber-600 cursor-pointer">
<i className="fas fa-user text-xl"></i>
</button>
<button className="md:hidden text-gray-700 hover:text-amber-600 cursor-pointer" onClick={toggleMenu}>
<i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
</button>
</div>
</div>
{/* Mobile Menu */}
<div className={`md:hidden bg-white shadow-inner ${isMenuOpen ? 'block' : 'hidden'}`}>
<div className="px-4 py-3">
<input
type="text"
placeholder="Search products..."
className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
/>
<i className="fas fa-search absolute left-7 top-[4.7rem] transform -translate-y-1/2 text-gray-400"></i>
</div>
<div className="px-2 pt-2 pb-4 space-y-1">
<a href="#" className="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md">Home</a>
<div className="relative">
<button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md flex justify-between items-center">
Categories
<i className="fas fa-chevron-down text-xs"></i>
</button>
<div className="pl-4">
<a href="#" className="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md">Sofas</a>
<a href="#" className="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md">Beds</a>
<a href="#" className="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md">Tables</a>
<a href="#" className="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md">Chairs</a>
<a href="#" className="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md">Storage</a>
</div>
</div>
<a href="#" className="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md">New Arrivals</a>
<a href="#" className="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md">Sale</a>
<a href="#" className="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded-md">Contact</a>
</div>
</div>
</header>
{/* Cart Sidebar */}
<div className={`fixed inset-0 z-50 ${cartOpen ? 'block' : 'hidden'}`}>
<div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleCart}></div>
<div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300">
<div className="p-6">
<div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
<button onClick={toggleCart} className="text-gray-500 hover:text-gray-700 cursor-pointer">
<i className="fas fa-times text-xl"></i>
</button>
</div>
{cartItems.length === 0 ? (
<div className="text-center py-12">
<i className="fas fa-shopping-bag text-gray-300 text-5xl mb-4"></i>
<p className="text-gray-500">Your cart is empty</p>
<button onClick={toggleCart} className="mt-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium !rounded-button whitespace-nowrap cursor-pointer">
Continue Shopping
</button>
</div>
) : (
<div className="space-y-4">
{/* Sample cart item */}
<div className="flex items-center space-x-4 border-b pb-4">
<img src="https://readdy.ai/api/search-image?query=A%20minimalist%20modern%20wooden%20chair%20with%20a%20comfortable%20cushion%2C%20photographed%20against%20a%20simple%20white%20background%2C%20professional%20product%20photography%2C%20high%20resolution%2C%20detailed%20texture%2C%20soft%20lighting&width=100&height=100&seq=1&orientation=squarish" alt="Modern Chair" className="w-20 h-20 object-cover rounded-md" />
<div className="flex-1">
<h3 className="text-gray-800 font-medium">Modern Wooden Chair</h3>
<p className="text-gray-500 text-sm">Qty: 1</p>
<p className="text-amber-600 font-medium">$249.99</p>
</div>
<button className="text-gray-400 hover:text-red-500 cursor-pointer">
<i className="fas fa-trash"></i>
</button>
</div>
<div className="pt-4 border-t">
<div className="flex justify-between mb-2">
<span className="text-gray-600">Subtotal</span>
<span className="text-gray-800 font-medium">KSh 34,999</span>
</div>
<div className="flex justify-between mb-6">
<span className="text-gray-600">Shipping</span>
<span className="text-gray-800 font-medium">Calculated at checkout</span>
</div>
<button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium mb-3 !rounded-button whitespace-nowrap cursor-pointer">
Checkout
</button>
<button onClick={toggleCart} className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium !rounded-button whitespace-nowrap cursor-pointer">
Continue Shopping
</button>
</div>
</div>
)}
</div>
</div>
</div>
<main>
{/* Hero Section */}
<section className="relative h-[600px] overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
<img
src="https://readdy.ai/api/search-image?query=A%20modern%2C%20elegant%20living%20room%20with%20stylish%20furniture%20including%20a%20plush%20sofa%2C%20coffee%20table%2C%20and%20accent%20chairs.%20The%20room%20has%20large%20windows%20with%20natural%20light%20streaming%20in%2C%20wooden%20floors%2C%20and%20tasteful%20decor%20elements.%20The%20atmosphere%20is%20warm%20and%20inviting%20with%20a%20sophisticated%20color%20palette.&width=1440&height=600&seq=2&orientation=landscape"
alt="Modern Furniture Collection"
className="absolute inset-0 w-full h-full object-cover object-top"
/>
<div className="container mx-auto px-4 h-full flex items-center relative z-20">
<div className="max-w-xl">
<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Transform Your Space</h1>
<p className="text-xl text-gray-200 mb-8">Discover our new collection of handcrafted furniture designed for modern living.</p>
<div className="flex flex-wrap gap-4">
<button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium !rounded-button whitespace-nowrap cursor-pointer">
Shop Now
</button>
<button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-gray-900 transition !rounded-button whitespace-nowrap cursor-pointer">
View Collections
</button>
</div>
</div>
</div>
</section>
{/* Categories Section */}
<section className="py-16 bg-gray-50">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
{/* Category 1 */}
<div className="group relative h-64 rounded-lg overflow-hidden shadow-md cursor-pointer">
<img
src="https://readdy.ai/api/search-image?query=A%20modern%20elegant%20sofa%20with%20clean%20lines%20in%20a%20neutral%20color%2C%20placed%20in%20a%20minimalist%20living%20room%20setting%20with%20soft%20lighting%20and%20simple%20decor%2C%20professional%20product%20photography%20against%20a%20light%20background&width=400&height=300&seq=3&orientation=landscape"
alt="Sofas"
className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
/>
<div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
<div className="absolute bottom-0 left-0 p-5">
<h3 className="text-xl font-bold text-white mb-1">Sofas</h3>
<p className="text-gray-200 text-sm">42 Products</p>
</div>
</div>
{/* Category 2 */}
<div className="group relative h-64 rounded-lg overflow-hidden shadow-md cursor-pointer">
<img
src="https://readdy.ai/api/search-image?query=A%20stylish%20modern%20bed%20frame%20with%20a%20comfortable%20mattress%20and%20elegant%20bedding%20in%20a%20serene%20bedroom%20setting%2C%20soft%20natural%20lighting%2C%20minimalist%20decor%2C%20professional%20product%20photography%20against%20a%20light%20background&width=400&height=300&seq=4&orientation=landscape"
alt="Beds"
className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
/>
<div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
<div className="absolute bottom-0 left-0 p-5">
<h3 className="text-xl font-bold text-white mb-1">Beds</h3>
<p className="text-gray-200 text-sm">38 Products</p>
</div>
</div>
{/* Category 3 */}
<div className="group relative h-64 rounded-lg overflow-hidden shadow-md cursor-pointer">
<img
src="https://readdy.ai/api/search-image?query=A%20contemporary%20dining%20table%20with%20elegant%20chairs%20in%20a%20bright%20dining%20area%2C%20featuring%20clean%20lines%20and%20natural%20materials%2C%20professional%20product%20photography%20with%20soft%20lighting%20against%20a%20light%20background&width=400&height=300&seq=5&orientation=landscape"
alt="Tables"
className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
/>
<div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
<div className="absolute bottom-0 left-0 p-5">
<h3 className="text-xl font-bold text-white mb-1">Tables</h3>
<p className="text-gray-200 text-sm">56 Products</p>
</div>
</div>
{/* Category 4 */}
<div className="group relative h-64 rounded-lg overflow-hidden shadow-md cursor-pointer">
<img
src="https://readdy.ai/api/search-image?query=A%20set%20of%20stylish%20modern%20chairs%20with%20ergonomic%20design%2C%20showcased%20in%20a%20bright%20interior%20space%2C%20featuring%20clean%20lines%20and%20quality%20materials%2C%20professional%20product%20photography%20with%20soft%20lighting%20against%20a%20light%20background&width=400&height=300&seq=6&orientation=landscape"
alt="Chairs"
className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
/>
<div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
<div className="absolute bottom-0 left-0 p-5">
<h3 className="text-xl font-bold text-white mb-1">Chairs</h3>
<p className="text-gray-200 text-sm">63 Products</p>
</div>
</div>
</div>
</div>
</section>
{/* Featured Products */}
<section className="py-16">
<div className="container mx-auto px-4">
<div className="flex justify-between items-center mb-12">
<h2 className="text-3xl font-bold">Featured Products</h2>
<a href="#" className="text-amber-600 hover:text-amber-700 font-medium flex items-center cursor-pointer">
View All
<i className="fas fa-arrow-right ml-2"></i>
</a>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
{/* Product 1 */}
<div className="group">
<div className="relative rounded-lg overflow-hidden mb-4">
<img
src="https://readdy.ai/api/search-image?query=A%20luxurious%20modern%20sofa%20with%20plush%20cushions%20in%20a%20neutral%20beige%20color%2C%20photographed%20in%20a%20clean%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=400&height=400&seq=7&orientation=squarish"
alt="Comfort Lounge Sofa"
className="w-full h-80 object-cover object-top transition-transform duration-300 group-hover:scale-105"
/>
<div className="absolute top-4 right-4 flex flex-col gap-2">
<button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer">
<i className="far fa-heart text-gray-600"></i>
</button>
<button
className="bg-white p-2 rounded-full shadow-md hover:bg-amber-600 hover:text-white transition cursor-pointer"
onClick={() => addToCart({
name: 'Comfort Lounge Sofa',
price: '$1,299.99',
image: 'https://readdy.ai/api/search-image?query=A%20luxurious%20modern%20sofa%20with%20plush%20cushions%20in%20a%20neutral%20beige%20color%2C%20photographed%20in%20a%20clean%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=400&height=400&seq=7&orientation=squarish'
})}
>
<i className="fas fa-shopping-bag text-gray-600 group-hover:text-white"></i>
</button>
</div>
<div className="absolute top-4 left-4">
<span className="bg-amber-600 text-white text-sm px-3 py-1 rounded-full">New</span>
</div>
</div>
<h3 className="text-lg font-medium text-gray-800 mb-1">Comfort Lounge Sofa</h3>
<div className="flex items-center">
<p className="text-amber-600 font-medium mr-2">KSh 179,999</p>
<p className="text-gray-500 line-through text-sm">KSh 199,999</p>
</div>
</div>
{/* Product 2 */}
<div className="group">
<div className="relative rounded-lg overflow-hidden mb-4">
<img
src="https://readdy.ai/api/search-image?query=A%20stylish%20minimalist%20wooden%20dining%20table%20with%20elegant%20chairs%2C%20photographed%20in%20a%20bright%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=400&height=400&seq=8&orientation=squarish"
alt="Nordic Dining Set"
className="w-full h-80 object-cover object-top transition-transform duration-300 group-hover:scale-105"
/>
<div className="absolute top-4 right-4 flex flex-col gap-2">
<button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer">
<i className="far fa-heart text-gray-600"></i>
</button>
<button
className="bg-white p-2 rounded-full shadow-md hover:bg-amber-600 hover:text-white transition cursor-pointer"
onClick={() => addToCart({
name: 'Nordic Dining Set',
price: '$899.99',
image: 'https://readdy.ai/api/search-image?query=A%20stylish%20minimalist%20wooden%20dining%20table%20with%20elegant%20chairs%2C%20photographed%20in%20a%20bright%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=400&height=400&seq=8&orientation=squarish'
})}
>
<i className="fas fa-shopping-bag text-gray-600 group-hover:text-white"></i>
</button>
</div>
<div className="absolute top-4 left-4">
<span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">Sale</span>
</div>
</div>
<h3 className="text-lg font-medium text-gray-800 mb-1">Nordic Dining Set</h3>
<div className="flex items-center">
<p className="text-amber-600 font-medium mr-2">KSh 124,999</p>
<p className="text-gray-500 line-through text-sm">KSh 149,999</p>
</div>
</div>
{/* Product 3 */}
<div className="group">
<div className="relative rounded-lg overflow-hidden mb-4">
<img
src="https://readdy.ai/api/search-image?query=A%20modern%20king-size%20bed%20frame%20with%20a%20plush%20headboard%20in%20a%20neutral%20gray%20color%2C%20photographed%20in%20a%20clean%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=400&height=400&seq=9&orientation=squarish"
alt="Luxe King Bed"
className="w-full h-80 object-cover object-top transition-transform duration-300 group-hover:scale-105"
/>
<div className="absolute top-4 right-4 flex flex-col gap-2">
<button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer">
<i className="far fa-heart text-gray-600"></i>
</button>
<button
className="bg-gray-200 p-2 rounded-full shadow-md cursor-not-allowed"
disabled
>
<i className="fas fa-ban text-gray-400"></i>
</button>
</div>
</div>
<h3 className="text-lg font-medium text-gray-800 mb-1">Luxe King Bed</h3>
<div className="flex items-center">
<span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">Out of Stock</span>
<p className="text-gray-400 ml-2">KSh 189,999</p>
</div>
</div>
{/* Product 4 */}
<div className="group">
<div className="relative rounded-lg overflow-hidden mb-4">
<img
src="https://readdy.ai/api/search-image?query=A%20set%20of%20elegant%20modern%20accent%20chairs%20with%20wooden%20legs%20and%20comfortable%20upholstery%20in%20a%20light%20color%2C%20photographed%20in%20a%20clean%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=400&height=400&seq=10&orientation=squarish"
alt="Accent Lounge Chair"
className="w-full h-80 object-cover object-top transition-transform duration-300 group-hover:scale-105"
/>
<div className="absolute top-4 right-4 flex flex-col gap-2">
<button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer">
<i className="far fa-heart text-gray-600"></i>
</button>
<button
className="bg-white p-2 rounded-full shadow-md hover:bg-amber-600 hover:text-white transition cursor-pointer"
onClick={() => addToCart({
name: 'Accent Lounge Chair',
price: '$349.99',
image: 'https://readdy.ai/api/search-image?query=A%20set%20of%20elegant%20modern%20accent%20chairs%20with%20wooden%20legs%20and%20comfortable%20upholstery%20in%20a%20light%20color%2C%20photographed%20in%20a%20clean%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=400&height=400&seq=10&orientation=squarish'
})}
>
<i className="fas fa-shopping-bag text-gray-600 group-hover:text-white"></i>
</button>
</div>
</div>
<h3 className="text-lg font-medium text-gray-800 mb-1">Accent Lounge Chair</h3>
<div className="flex items-center">
<p className="text-amber-600 font-medium mr-2">KSh 44,999</p>
<p className="text-gray-500 line-through text-sm">KSh 54,999</p>
</div>
</div>
</div>
</div>
</section>
{/* Special Offer Banner */}
<section className="py-16 bg-gray-100">
<div className="container mx-auto px-4">
<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
<div className="flex flex-col md:flex-row">
<div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
<span className="text-amber-600 font-medium mb-2">Limited Time Offer</span>
<h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get 20% Off on All Bedroom Collections</h2>
<p className="text-gray-600 mb-8">Upgrade your bedroom with our premium collections. Use code <span className="font-bold">DREAM20</span> at checkout.</p>
<div>
<button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium !rounded-button whitespace-nowrap cursor-pointer">
Shop Bedroom
</button>
</div>
</div>
<div className="md:w-1/2 relative h-64 md:h-auto">
<img
src="https://readdy.ai/api/search-image?query=A%20luxurious%20bedroom%20interior%20with%20a%20stylish%20bed%2C%20nightstands%2C%20and%20elegant%20decor.%20The%20room%20features%20soft%20lighting%2C%20premium%20bedding%2C%20and%20a%20calming%20color%20palette.%20The%20image%20showcases%20a%20complete%20bedroom%20set%20with%20attention%20to%20detail%20and%20high-quality%20furniture&width=700&height=500&seq=11&orientation=landscape"
alt="Bedroom Collection"
className="absolute inset-0 w-full h-full object-cover object-top"
/>
</div>
</div>
</div>
</div>
</section>
{/* Customer Reviews */}
<section className="py-16">
<div className="container mx-auto px-4">
<div className="flex items-center justify-between mb-12">
<h2 className="text-3xl font-bold">Customer Reviews</h2>
<div className="flex items-center">
<div className="text-amber-500 text-xl mr-2">4.8</div>
<div className="text-amber-500">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
</div>
<span className="text-gray-500 ml-2">(2,384 reviews)</span>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{/* Review 1 */}
<div className="bg-white p-6 rounded-lg shadow-md">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full overflow-hidden mr-3">
<img
src="https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20smiling%20woman%20in%20her%2030s%20with%20shoulder-length%20brown%20hair%2C%20natural%20makeup%2C%20and%20a%20friendly%20expression%2C%20photographed%20against%20a%20neutral%20background%20with%20soft%20lighting&width=100&height=100&seq=12&orientation=squarish"
alt="Sarah Johnson"
className="w-full h-full object-cover"
/>
</div>
<div>
<h4 className="font-medium text-gray-800">Sarah Johnson</h4>
<p className="text-gray-500 text-sm">2 days ago</p>
</div>
</div>
<div className="flex items-center">
<div className="text-amber-500">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
</div>
<span className="ml-2 text-gray-600">5.0</span>
</div>
</div>
<h3 className="font-medium text-gray-800 mb-2">Perfect Comfort and Style</h3>
<p className="text-gray-600 mb-4">The quality of the furniture exceeded my expectations. The sofa is not only beautiful but also incredibly comfortable. Delivery was prompt and the assembly was straightforward.</p>
<div className="flex items-center justify-between text-sm">
<div className="flex items-center text-gray-500">
<i className="fas fa-thumbs-up mr-1"></i>
<span>Helpful (24)</span>
</div>
<button className="text-amber-600 hover:text-amber-700">Report</button>
</div>
</div>
{/* Review 2 */}
<div className="bg-white p-6 rounded-lg shadow-md">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full overflow-hidden mr-3">
<img
src="https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20man%20in%20his%2040s%20with%20short%20dark%20hair%20and%20glasses%2C%20smiling%20confidently%2C%20photographed%20against%20a%20neutral%20background%20with%20soft%20lighting&width=100&height=100&seq=13&orientation=squarish"
alt="Michael Chen"
className="w-full h-full object-cover"
/>
</div>
<div>
<h4 className="font-medium text-gray-800">Michael Chen</h4>
<p className="text-gray-500 text-sm">1 week ago</p>
</div>
</div>
<div className="flex items-center">
<div className="text-amber-500">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
</div>
<span className="ml-2 text-gray-600">5.0</span>
</div>
</div>
<h3 className="font-medium text-gray-800 mb-2">Excellent Service and Quality</h3>
<p className="text-gray-600 mb-4">I furnished my entire living room with pieces from Limpopo Furniture and couldn't be happier. The customer service was excellent, helping me choose pieces that work perfectly together.</p>
<div className="flex items-center justify-between text-sm">
<div className="flex items-center text-gray-500">
<i className="fas fa-thumbs-up mr-1"></i>
<span>Helpful (18)</span>
</div>
<button className="text-amber-600 hover:text-amber-700">Report</button>
</div>
</div>
{/* Review 3 */}
<div className="bg-white p-6 rounded-lg shadow-md">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full overflow-hidden mr-3">
<img
src="https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20woman%20in%20her%20late%2020s%20with%20curly%20hair%20and%20a%20bright%20smile%2C%20photographed%20against%20a%20neutral%20background%20with%20soft%20lighting&width=100&height=100&seq=14&orientation=squarish"
alt="Emily Rodriguez"
className="w-full h-full object-cover"
/>
</div>
<div>
<h4 className="font-medium text-gray-800">Emily Rodriguez</h4>
<p className="text-gray-500 text-sm">2 weeks ago</p>
</div>
</div>
<div className="flex items-center">
<div className="text-amber-500">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star-half-alt"></i>
</div>
<span className="ml-2 text-gray-600">4.5</span>
</div>
</div>
<h3 className="font-medium text-gray-800 mb-2">Outstanding Craftsmanship</h3>
<p className="text-gray-600 mb-4">The dining table I purchased is a masterpiece. The craftsmanship is outstanding and it's become the centerpiece of our home. Worth every penny for the quality received.</p>
<div className="flex items-center justify-between text-sm">
<div className="flex items-center text-gray-500">
<i className="fas fa-thumbs-up mr-1"></i>
<span>Helpful (31)</span>
</div>
<button className="text-amber-600 hover:text-amber-700">Report</button>
</div>
</div>
{/* Review 4 */}
<div className="bg-white p-6 rounded-lg shadow-md">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full overflow-hidden mr-3">
<img
src="https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20young%20man%20in%20his%20early%2030s%20with%20a%20casual%20style%20and%20friendly%20smile%2C%20photographed%20against%20a%20neutral%20background%20with%20soft%20lighting&width=100&height=100&seq=15&orientation=squarish"
alt="David Wilson"
className="w-full h-full object-cover"
/>
</div>
<div>
<h4 className="font-medium text-gray-800">David Wilson</h4>
<p className="text-gray-500 text-sm">3 weeks ago</p>
</div>
</div>
<div className="flex items-center">
<div className="text-amber-500">
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
<i className="fas fa-star"></i>
</div>
<span className="ml-2 text-gray-600">5.0</span>
</div>
</div>
<h3 className="font-medium text-gray-800 mb-2">Modern Design, Great Value</h3>
<p className="text-gray-600 mb-4">The bedroom set I ordered has transformed my space completely. The modern design and quality materials make it look much more expensive than it was. Very satisfied with my purchase.</p>
<div className="flex items-center justify-between text-sm">
<div className="flex items-center text-gray-500">
<i className="fas fa-thumbs-up mr-1"></i>
<span>Helpful (15)</span>
</div>
<button className="text-amber-600 hover:text-amber-700">Report</button>
</div>
</div>
</div>
<div className="text-center mt-8">
<button className="bg-white border border-amber-600 text-amber-600 hover:bg-amber-50 px-6 py-2 rounded-full font-medium !rounded-button whitespace-nowrap cursor-pointer">
Load More Reviews
</button>
</div>
</div>
</section>
{/* Newsletter */}
<section className="py-16 bg-amber-50">
<div className="container mx-auto px-4">
<div className="max-w-3xl mx-auto text-center">
<h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Newsletter</h2>
<p className="text-gray-600 mb-8">Subscribe to receive updates on new arrivals, special offers and other discount information.</p>
<div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
<input
type="email"
placeholder="Your email address"
className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium !rounded-button whitespace-nowrap cursor-pointer">
Subscribe
</button>
</div>
<p className="text-gray-500 text-sm mt-4">By subscribing you agree to our Terms of Service and Privacy Policy.</p>
</div>
</div>
</section>
</main>
{/* Footer */}
<footer className="bg-gray-900 text-white pt-16 pb-8">
<div className="container mx-auto px-4">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
<div>
<h3 className="text-xl font-bold mb-4">Limpopo<span className="text-amber-500"> Furniture</span></h3>
<p className="text-gray-400 mb-4">We provide quality furniture for homes and offices at affordable prices.</p>
<div className="flex space-x-4">
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">
<i className="fab fa-facebook-f"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">
<i className="fab fa-twitter"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">
<i className="fab fa-instagram"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">
<i className="fab fa-pinterest-p"></i>
</a>
</div>
</div>
<div>
<h4 className="text-lg font-medium mb-4">Shop</h4>
<ul className="space-y-2">
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Living Room</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Bedroom</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Dining Room</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Office</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Outdoor</a></li>
</ul>
</div>
<div>
<h4 className="text-lg font-medium mb-4">Customer Service</h4>
<ul className="space-y-2">
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">My Account</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Track Your Order</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Returns & Exchanges</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Shipping Policy</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">FAQ</a></li>
</ul>
</div>
<div>
<h4 className="text-lg font-medium mb-4">Contact Us</h4>
<ul className="space-y-2">
<li className="flex items-start">
<i className="fas fa-map-marker-alt mt-1 mr-3 text-amber-500"></i>
<span className="text-gray-400">123 Furniture Street, Design District, City</span>
</li>
<li className="flex items-center">
<i className="fas fa-phone-alt mr-3 text-amber-500"></i>
<span className="text-gray-400">+1 (555) 123-4567</span>
</li>
<li className="flex items-center">
<i className="fas fa-envelope mr-3 text-amber-500"></i>
<span className="text-gray-400">info@limpopofurniture.com</span>
</li>
</ul>
</div>
</div>
<div className="border-t border-gray-800 pt-8">
<div className="flex flex-col md:flex-row justify-between items-center">
<p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Limpopo Furniture. All rights reserved.</p>
<div className="flex items-center space-x-4">
<span className="text-gray-400 text-sm">Payment Methods:</span>
<i className="fab fa-cc-visa text-xl text-gray-300"></i>
<i className="fab fa-cc-mastercard text-xl text-gray-300"></i>
<i className="fab fa-cc-paypal text-xl text-gray-300"></i>
<i className="fab fa-cc-apple-pay text-xl text-gray-300"></i>
</div>
</div>
</div>
</div>
</footer>
</div>
);
};
export default App