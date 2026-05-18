import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0B1F3A] text-white relative overflow-hidden">

      {/* TOP GOLD LINE */}
      <div className="h-1 bg-[#D4AF37]" />

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0B1F3A] font-bold">
                PWI
              </div>
              <div>
                <h2 className="font-bold text-lg">PWI Psychological</h2>
                <p className="text-sm text-gray-300">
                  Diploma in Psychology
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              Transforming lives through psychology, counselling, HRM, and behavioral education.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D4AF37]">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li><Link className="hover:text-[#D4AF37] transition" to="/">Home</Link></li>
              <li><Link className="hover:text-[#D4AF37] transition" to="/about">About</Link></li>
              <li><Link className="hover:text-[#D4AF37] transition" to="/how-to-apply">How to Apply</Link></li>
              <li><Link className="hover:text-[#D4AF37] transition" to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* PROGRAM INFO */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D4AF37]">
              Program
            </h3>

            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Diploma in HRM & Psychology</li>
              <li>Diploma in Buddhist Counselling</li>
              <li>Duration: 6 Months / 1 Year</li>
              <li>Mode: Online Learning</li>
              <li>Medium: Sinhala</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D4AF37]">
              Contact Us
            </h3>

            <div className="space-y-3 text-gray-300 text-sm">

              <p className="hover:text-white transition">
                📧 psychologicalinstitute351@gmal.com
              </p>

              <p className="hover:text-white transition">
                📞 +94 76 885 6172
              </p>

              <p className="text-xs text-gray-400 mt-2">
                WhatsApp • Registration • Support
              </p>

            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between">

          <p className="text-gray-400 text-sm">
            © 2026 PWI Psychological. All Rights Reserved.
          </p>

          <p className="text-[#D4AF37] text-sm mt-2 md:mt-0">
            Empowering Minds Through Psychology
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;