import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">PWI</span>
              </div>
              <div>
                <span className="font-bold text-lg">PWI Psychological</span>
                <p className="text-sm text-gray-400">Diploma in Psychology</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Transforming lives through psychological education and professional training.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 transition">About Us</Link></li>
              <li><Link to="/how-to-apply" className="text-gray-400 hover:text-blue-400 transition">How to Apply</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Program Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Program</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Diploma in Psychology</li>
              <li className="text-gray-400">Duration: 1 Year</li>
              <li className="text-gray-400">Mode: Online</li>
              <li className="text-gray-400">Certification: PWI Certified</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@pwipsychological.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+94 77 123 4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PWI Psychological. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;