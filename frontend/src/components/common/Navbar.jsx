import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">PWI</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-gray-800">PWI Psychological</span>
                <span className="block text-xs text-blue-600">Diploma Course</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition duration-300 font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition duration-300 font-medium">About</Link>
            <Link to="/how-to-apply" className="text-gray-700 hover:text-blue-600 transition duration-300 font-medium">How to Apply</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition duration-300 font-medium">Contact</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <button className="px-5 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition duration-300 font-medium">
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-medium shadow-md">
                Enroll Now
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:text-blue-600">About</Link>
            <Link to="/how-to-apply" className="block py-2 text-gray-700 hover:text-blue-600">How to Apply</Link>
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-blue-600">Contact</Link>
            <div className="pt-4 space-y-2">
              <Link to="/login" className="block">
                <button className="w-full px-4 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50">
                  Sign In
                </button>
              </Link>
              <Link to="/register" className="block">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Enroll Now
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;