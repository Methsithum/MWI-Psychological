import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTwitter, FaEnvelope, FaPhoneAlt, FaWhatsapp, FaClock, FaTiktok } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Lecturer", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "How to Apply", path: "/how-to-apply" },
    { name: "Contact Us", path: "/contact" }
  ];

  const programs = [
    "Diploma in HRM & Behavioral Psychology",
    "Diploma in Buddhist Counselling",
    "Duration: 6 Months",
    "Mode: Online Learning",
    "Medium: Sinhala"
  ];

  return (
    <footer className="bg-[#0B1F3A] text-white relative overflow-hidden">
      {/* Decorative Top Gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
      
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          
          {/* Brand Section */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
              {/* Bigger Logo Image */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#D4AF37] to-[#C49B2C] flex items-center justify-center shadow-lg">
                <img 
                  src={logo} 
                  alt="MWI Psychological Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-bold text-lg md:text-xl text-white">MWI Psychological</h2>
                <p className="text-xs text-[#D4AF37] font-medium tracking-wide">
                  Professional Diploma Programmes
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mt-4">
              Transforming lives through psychology, counselling, HRM, and behavioral education.
            </p>

            {/* Social Icons with React Icons */}
            <div className="flex gap-3 mt-5 justify-center sm:justify-start">
              <a
                href="https://www.facebook.com/share/1CjeFTX9Cu/?mibextid=wwXIfr"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#1877f2] transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF size={14} />
              </a>
              
              <a
                href="https://youtube.com/@mindfulwithisuruni?si=FUzCdlfb4njMhGiX"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#ff0000] transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube size={14} />
              </a>

              <a
                href="https://www.tiktok.com/@.psychological.in?_r=1&_t=ZS-96Zxb5kJrz6"
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#da148e] transition-all duration-300 hover:scale-110"
                aria-label="Tiktok "
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-5 text-[#D4AF37] flex items-center gap-2 justify-center sm:justify-start">
              <span className="w-1 h-4 bg-[#D4AF37] rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-[#D4AF37] transition duration-300 text-sm flex items-center gap-2 justify-center sm:justify-start group"
                  >
                    <span className="w-1 h-1 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Program Section */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-5 text-[#D4AF37] flex items-center gap-2 justify-center sm:justify-start">
              <span className="w-1 h-4 bg-[#D4AF37] rounded-full"></span>
              Our Programs
            </h3>
            <ul className="space-y-2.5">
              {programs.map((program, idx) => (
                <li key={idx}>
                  <span className="text-gray-300 text-sm flex items-center gap-2 justify-center sm:justify-start">
                    <span className="text-[#D4AF37] text-xs">•</span>
                    {program}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-5 text-[#D4AF37] flex items-center gap-2 justify-center sm:justify-start">
              <span className="w-1 h-4 bg-[#D4AF37] rounded-full"></span>
              Contact Us
            </h3>
            
            <div className="space-y-3">
              <a 
                href="mailto:psychologicalinstitute351@gmail.com" 
                className="flex items-center gap-3 text-gray-300 hover:text-[#D4AF37] transition duration-300 text-sm group justify-center sm:justify-start"
              >
                <FaEnvelope className="text-lg group-hover:scale-110 transition" />
                <span className="break-all">psychologicalinstitute351@gmail.com</span>
              </a>
              
              <a 
                href="tel:0768856172" 
                className="flex items-center gap-3 text-gray-300 hover:text-[#D4AF37] transition duration-300 text-sm group justify-center sm:justify-start"
              >
                <FaPhoneAlt className="text-lg group-hover:scale-110 transition" />
                <span>+94 76 885 6172</span>
              </a>
              
              <a 
                href="https://wa.me/94768856172" 
                className="flex items-center gap-3 text-gray-300 hover:text-[#D4AF37] transition duration-300 text-sm group justify-center sm:justify-start"
              >
                <FaWhatsapp className="text-lg group-hover:scale-110 transition" />
                <span>WhatsApp • Registration • Support</span>
              </a>

              <div className="pt-3">
                <div className="bg-[#D4AF37]/10 rounded-xl p-3 text-center sm:text-left">
                  <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold mb-1">
                    <FaClock size={12} />
                    <span>Office Hours</span>
                  </div>
                  <p className="text-gray-300 text-xs">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-300 text-xs">Saturday: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-10 mb-8 pt-8 border-t border-white/10">
          <div className="bg-gradient-to-r from-[#D4AF37]/10 to-transparent rounded-2xl p-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h4 className="font-semibold text-white text-sm md:text-base">Subscribe to Our Newsletter</h4>
                <p className="text-gray-400 text-xs mt-1">Get updates about new batches and programs</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#D4AF37] transition"
                />
                <button className="px-5 py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-full font-semibold text-sm hover:bg-[#C49B2C] transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs md:text-sm text-center">
            © {new Date().getFullYear()} MWI Psychological. All Rights Reserved.
          </p>
          
          <div className="flex gap-4 text-xs text-gray-400">
            <Link to="/privacy" className="hover:text-[#D4AF37] transition">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-[#D4AF37] transition">Terms of Service</Link>
            <span>|</span>
            <Link to="/refund" className="hover:text-[#D4AF37] transition">Refund Policy</Link>
          </div>
          
          <p className="text-[#D4AF37] text-xs md:text-sm text-center">
            Empowering Minds Through Psychology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;