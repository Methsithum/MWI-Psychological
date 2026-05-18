import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full z-50 top-0 border-b border-[#D4AF37]/20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-20">

          {/* LOGO */}
          <div className="flex items-center">

            <Link to="/" className="flex items-center space-x-3">

              <div className="w-12 h-12 bg-gradient-to-br from-[#0B1F3A] to-[#08162A] rounded-full flex items-center justify-center shadow-lg border-2 border-[#D4AF37]">

                <span className="text-[#D4AF37] font-bold text-lg">
                  PWI
                </span>

              </div>

              <div className="hidden sm:block">

                <span className="font-bold text-xl text-[#0B1F3A] tracking-wide">
                  PWI Psychological
                </span>

                <span className="block text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">
                  Professional Diploma Programmes
                </span>

              </div>

            </Link>

          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">

            <Link
              to="/"
              className="text-[#0B1F3A] hover:text-[#D4AF37] transition duration-300 font-medium relative group"
            >
              Home

              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/about"
              className="text-[#0B1F3A] hover:text-[#D4AF37] transition duration-300 font-medium relative group"
            >
              About Lecturer

              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/courses"
              className="text-[#0B1F3A] hover:text-[#D4AF37] transition duration-300 font-medium relative group"
            >
              Courses

              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/how-to-apply"
              className="text-[#0B1F3A] hover:text-[#D4AF37] transition duration-300 font-medium relative group"
            >
              How to Apply

              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/contact"
              className="text-[#0B1F3A] hover:text-[#D4AF37] transition duration-300 font-medium relative group"
            >
              Contact Us

              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>

          </div>

          {/* AUTH BUTTONS */}
          <div className="hidden md:flex items-center space-x-4">

            <Link to="/login">

              <button className="px-5 py-2.5 text-[#0B1F3A] border-2 border-[#0B1F3A] rounded-xl hover:bg-[#0B1F3A] hover:text-white transition duration-300 font-semibold">

                Sign In

              </button>

            </Link>

            <Link to="/register">

              <button className="px-6 py-2.5 bg-[#D4AF37] text-[#0B1F3A] rounded-xl hover:bg-[#C49B2C] transition duration-300 font-bold shadow-lg hover:scale-105 transform">

                Register Now

              </button>

            </Link>

          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0B1F3A] focus:outline-none"
            >

              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >

                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}

              </svg>

            </button>

          </div>

        </div>

        {/* MOBILE MENU */}
        {isOpen && (

          <div className="md:hidden pb-6 pt-2 border-t border-[#D4AF37]/20 animate-fadeIn">

            <div className="flex flex-col space-y-3 mt-4">

              <Link
                to="/"
                className="px-4 py-3 rounded-xl text-[#0B1F3A] hover:bg-[#F5E6A8]/20 hover:text-[#D4AF37] transition font-medium"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="px-4 py-3 rounded-xl text-[#0B1F3A] hover:bg-[#F5E6A8]/20 hover:text-[#D4AF37] transition font-medium"
              >
                About Lecturer
              </Link>

              <Link
                to="/courses"
                className="px-4 py-3 rounded-xl text-[#0B1F3A] hover:bg-[#F5E6A8]/20 hover:text-[#D4AF37] transition font-medium"
              >
                Courses
              </Link>

              <Link
                to="/how-to-apply"
                className="px-4 py-3 rounded-xl text-[#0B1F3A] hover:bg-[#F5E6A8]/20 hover:text-[#D4AF37] transition font-medium"
              >
                How to Apply
              </Link>

              <Link
                to="/contact"
                className="px-4 py-3 rounded-xl text-[#0B1F3A] hover:bg-[#F5E6A8]/20 hover:text-[#D4AF37] transition font-medium"
              >
                Contact Us
              </Link>

            </div>

            {/* MOBILE BUTTONS */}
            <div className="pt-6 space-y-3">

              <Link to="/login" className="block">

                <button className="w-full px-4 py-3 text-[#0B1F3A] border-2 border-[#0B1F3A] rounded-xl hover:bg-[#0B1F3A] hover:text-white transition duration-300 font-semibold">

                  Sign In

                </button>

              </Link>

              <Link to="/register" className="block">

                <button className="w-full px-4 py-3 bg-[#D4AF37] text-[#0B1F3A] rounded-xl hover:bg-[#C49B2C] transition duration-300 font-bold shadow-lg">

                  Register Now

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