import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import your logo image (replace with your actual logo path)
import logo from '../../assets/logo.png';
import auth from '../../utils/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.getUser());
  }, []);

  const handleLogout = () => {
    auth.logout();
    setUser(null);
    // reload to reset UI; alternatively use context/router
    window.location.href = '/';
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg fixed w-full z-50 top-0 border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">

          {/* LOGO */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              {/* Logo Image */}
              <div className="w-10 h-10 md:w-15 md:h-15 relative">
                <img 
                  src={logo} 
                  alt="PWI Psychological Logo"
                  className="w-full h-full object-contain "
                />
              </div>

              {/* Text Logo (fallback if image fails) */}
              <div className="hidden sm:block">
                <span className="font-bold text-lg md:text-xl text-[#0B1F3A] tracking-wide">
                  PWI Psychological
                </span>
                <span className="block text-[10px] md:text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">
                  Professional Diploma Programmes
                </span>
              </div>
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/"
              className="text-[#0B1F3A] hover:text-[#D4AF37] transition duration-300 font-medium relative group text-sm lg:text-base"
            >
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/about"
              className="text-[#0B1F3A] hover:text-[#D4AF37] transition duration-300 font-medium relative group text-sm lg:text-base"
            >
              About Lecturer
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/courses"
              className="text-[#0B1F3A] hover:text-[#D4AF37] transition duration-300 font-medium relative group text-sm lg:text-base"
            >
              Courses
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/how-to-apply"
              className="text-[#0B1F3A] hover:text-[#D4AF37] transition duration-300 font-medium relative group text-sm lg:text-base"
            >
              How to Apply
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/contact"
              className="text-[#0B1F3A] hover:text-[#D4AF37] transition duration-300 font-medium relative group text-sm lg:text-base"
            >
              Contact Us
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* AUTH BUTTONS - Modern Design */}
          <div className="hidden md:flex items-center space-x-3">
            {!user ? (
              <>
                <Link to="/signin">
                  <button className="px-5 py-2 text-[#0B1F3A] border border-[#0B1F3A]/20 rounded-full hover:border-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-amber-50 transition duration-300 font-medium text-sm">
                    Sign In
                  </button>
                </Link>

                <Link to="/register">
                  <button className="px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] rounded-full hover:shadow-lg hover:scale-105 transform transition duration-300 font-bold text-sm">
                    Register Now
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="text-sm font-medium text-[#0B1F3A] hover:text-[#D4AF37]">
                  {user.fullName || user.email}
                </Link>
                <button onClick={handleLogout} className="px-4 py-2 text-sm bg-white border rounded-full hover:bg-[#F8F4EC]">Logout</button>
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#0B1F3A] focus:outline-none p-2 rounded-lg hover:bg-[#D4AF37]/10 transition"
            >
              <svg
                className="h-6 w-6"
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

        {/* MOBILE MENU - Modern Design */}
        {isOpen && (
          <div className="md:hidden pb-5 pt-2 border-t border-[#D4AF37]/20 animate-fadeIn">
            <div className="flex flex-col space-y-2 mt-3">
              <Link
                to="/"
                className="px-4 py-3 rounded-xl text-[#0B1F3A] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-transparent hover:text-[#D4AF37] transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/about"
                className="px-4 py-3 rounded-xl text-[#0B1F3A] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-transparent hover:text-[#D4AF37] transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                About Lecturer
              </Link>

              <Link
                to="/courses"
                className="px-4 py-3 rounded-xl text-[#0B1F3A] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-transparent hover:text-[#D4AF37] transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                Courses
              </Link>

              <Link
                to="/how-to-apply"
                className="px-4 py-3 rounded-xl text-[#0B1F3A] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-transparent hover:text-[#D4AF37] transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                How to Apply
              </Link>

              <Link
                to="/contact"
                className="px-4 py-3 rounded-xl text-[#0B1F3A] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-transparent hover:text-[#D4AF37] transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </div>

            {/* MOBILE BUTTONS */}
            <div className="pt-5 space-y-3">
              <Link to="/login" className="block" onClick={() => setIsOpen(false)}>
                <button className="w-full px-4 py-3 text-[#0B1F3A] border border-[#0B1F3A]/20 rounded-full hover:border-[#0B1F3A] hover:bg-[#0B1F3A]/5 transition duration-300 font-medium">
                  Sign In
                </button>
              </Link>

              {!user ? (
                <Link to="/register" className="block" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] rounded-full hover:shadow-lg transition duration-300 font-bold">
                    Register Now
                  </button>
                </Link>
              ) : (
                <div className="px-4">
                  <button onClick={handleLogout} className="w-full px-4 py-3 bg-white text-[#0B1F3A] rounded-full border">Logout</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;