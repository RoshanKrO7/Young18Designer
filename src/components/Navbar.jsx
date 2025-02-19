import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-white text-2xl font-bold flex items-center">
                <img src={require('../images/NewwhiteBgColor.png')} alt="Young18Designer" style={{ width: '150px', height: '60px' }}  />
            </Link>
            <div className="space-x-4 flex items-center">
                <Link to="/" className="text-white hover:text-gray-200">
                    Home
                </Link>
                {/* <Link to="/dashboard" className="text-white hover:text-gray-200">
                    Dashboard
                </Link> */}
                <Link to="/services" className="text-white hover:text-gray-200">
                    Services
                </Link>
                <Link to="/contact" className="text-white hover:text-gray-200">
                    Contact
                </Link>
                <Link to="/cart" className="text-white hover:text-gray-200 flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-1" />
                    Cart
                </Link>
            </div>
        </div>
    </nav>
);
};

export default Navbar;