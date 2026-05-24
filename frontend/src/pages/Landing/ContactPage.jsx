import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-3xl md:text-4xl" />,
      title: "Visit Us",
      description: "MWI Psychological Learning Center, Colombo, Sri Lanka",
      color: "from-[#0B1F3A] to-[#1A3A5A]"
    },
    {
      icon: <FaEnvelope className="text-3xl md:text-4xl" />,
      title: "Email Us",
      description: "psychologicalinstitute351@gmail.com",
      link: "mailto:psychologicalinstitute351@gmail.com",
      color: "from-[#D4AF37] to-[#C49B2C]"
    },
    {
      icon: <FaPhoneAlt className="text-3xl md:text-4xl" />,
      title: "Call Us",
      description: "076 885 6172",
      link: "tel:0768856172",
      color: "from-[#0B1F3A] to-[#1A3A5A]"
    },
    {
      icon: <FaWhatsapp className="text-3xl md:text-4xl" />,
      title: "WhatsApp Us",
      description: "076 885 6172",
      link: "https://wa.me/94768856172",
      color: "from-[#25D366] to-[#128C7E]",
      isWhatsApp: true
    }
  ];

  const faqs = [
    {
      q: "When does the next batch start?",
      a: "The next batch starts in January 2025 with limited seats available. Early registration is recommended."
    },
    {
      q: "Is the diploma recognized?",
      a: "Yes, we provide a professional diploma certificate upon successful completion of the program."
    },
    {
      q: "Can I pay in installments?",
      a: "Yes, we offer flexible payment plans including monthly installments. Contact us for details."
    },
    {
      q: "Is it fully online?",
      a: "Yes, the program is 100% online with live Zoom lectures, recordings, and online support."
    },
    {
      q: "What is the duration of the program?",
      a: "Each diploma program is 6 months long with flexible learning schedules."
    },
    {
      q: "Do I get study materials?",
      a: "Yes, you will receive PDF notes, lecture recordings, and additional reference materials."
    }
  ];

  const socialLinks = [
    { 
      icon: <FaFacebookF />, 
      name: "Facebook", 
      url: "https://www.facebook.com/share/1CjeFTX9Cu/?mibextid=wwXIfr", 
      color: "hover:bg-[#1877f2]" 
    },  { 
      icon: <FaYoutube />, 
      name: "YouTube", 
      url: "https://youtube.com/@mindfulwithisuruni?si=FUzCdlfb4njMhGiX", 
      color: "hover:bg-[#ff0000]" 
    },
     { 
      icon: <FaTiktok />, 
      name: "TikTok", 
      url: "https://www.tiktok.com/@mindfulwithisuruni", 
      color: "hover:bg-[#da148e]" 
    }, 
   
    { 
      icon: <FaWhatsapp />, 
      name: "WhatsApp", 
      url: "https://wa.me/94768856172", 
      color: "hover:bg-[#25D366]" 
    }
  ];

  return (
    <div className="min-h-screen bg-[#FCFAF5]">
      <Navbar />

      {/* Hero Section - Modern Design */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#0B1F3A]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-56 h-56 md:w-96 md:h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#D4AF37]/15 rounded-full mb-4 md:mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
            <span className="text-xs md:text-sm font-medium text-[#D4AF37] tracking-wide">GET IN TOUCH</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-5 leading-tight">
            Contact{' '}
            <span className="text-[#D4AF37] relative inline-block">
              Us
              <svg className="absolute bottom-0 left-0 w-full h-2 md:h-3 text-[#D4AF37]/40" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5 T 200 5" stroke="currentColor" fill="none" strokeWidth="2"/>
              </svg>
            </span>
          </h1>
          
          <p className="text-sm md:text-lg text-[#D1D8E0] max-w-2xl mx-auto">
            We're here to support your learning journey
          </p>
        </div>
      </section>

      {/* Floating WhatsApp Button - Clickable */}
      <a
        href="https://wa.me/94768856172"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={30} />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Chat with us on WhatsApp
        </span>
      </a>

      {/* Contact Info & Form Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            
            {/* Contact Information Cards */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-6 md:mb-8">
                Get in Touch
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                {contactInfo.map((item, i) => (
                  <div
                    key={i}
                    className={`group bg-gradient-to-br ${item.color} rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div className="mb-3">{item.icon}</div>
                    <h3 className="font-semibold text-sm md:text-base mb-1">{item.title}</h3>
                    {item.link ? (
                      <a 
                        href={item.link} 
                        target={item.isWhatsApp ? "_blank" : "_self"}
                        rel={item.isWhatsApp ? "noopener noreferrer" : ""}
                        className="text-white/80 text-xs md:text-sm hover:text-white transition break-words flex items-center gap-1"
                      >
                        {item.description}
                        {item.isWhatsApp && <span className="text-xs">↗</span>}
                      </a>
                    ) : (
                      <p className="text-white/80 text-xs md:text-sm">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Social Links with React Icons */}
              <div className="mt-8 pt-6 border-t border-[#D4AF37]/20">
                <h3 className="font-semibold text-[#0B1F3A] mb-4">Follow Us</h3>
                <div className="flex gap-3 flex-wrap">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-[#0B1F3A]/10 rounded-full flex items-center justify-center text-[#0B1F3A] hover:text-white transition-all duration-300 hover:scale-110 ${social.color}`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 border border-[#D4AF37]/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
                  <FaEnvelope className="text-xl text-[#D4AF37]" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A]">
                  Send Message
                </h2>
              </div>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm animate-fadeIn">
                  ✅ Thank you for your message! We will get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#0B1F3A] mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B1F3A] mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B1F3A] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="076 885 6172"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0B1F3A] mb-1">Your Message *</label>
                  <textarea
                    placeholder="Tell us about your inquiry..."
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  Send Message
                </button>

                <p className="text-xs text-center text-gray-400 pt-2">
                  We'll respond within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Location</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mt-2">
              Find Us Here
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-3"></div>
          </div>
          
          <div className="bg-[#F8F4EC] rounded-2xl p-6 md:p-8 text-center">
            <div className="w-full h-48 md:h-64 bg-gray-200 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#0B1F3A] to-[#1A3A5A]">
              <div className="text-center text-white">
                <FaMapMarkerAlt className="text-5xl mb-3 mx-auto" />
                <p className="text-sm md:text-base">MWI Psychological Learning Center</p>
                <p className="text-white/70 text-xs md:text-sm mt-1">Colombo, Sri Lanka</p>
                <p className="text-[#D4AF37] text-xs mt-3">Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#F8F4EC] to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">FAQ</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B1F3A] mt-2">
              Frequently Asked Questions
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-3"></div>
            <p className="text-sm md:text-base text-[#5A6A7A] mt-3 max-w-2xl mx-auto">
              Everything you need to know about our programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#D4AF37] text-sm font-bold">?</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1F3A] text-sm md:text-base mb-2">
                      {item.q}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] to-[#08162A]"></div>
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" width="40" height="40">
            <circle cx="20" cy="20" r="1.5" fill="#D4AF37" />
          </svg>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/20">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-sm md:text-base text-[#D1D8E0] mb-4 md:mb-6">
              Enroll now and begin your psychology education today
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register">
                <button className="px-6 md:px-8 py-2.5 md:py-3 bg-[#D4AF37] text-[#0B1F3A] rounded-full font-bold text-sm md:text-base hover:bg-[#C49B2C] hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                  Apply Now
                </button>
              </Link>
              <Link to="/how-to-apply">
                <button className="px-6 md:px-8 py-2.5 md:py-3 border-2 border-white/30 text-white rounded-full font-semibold text-sm md:text-base hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300">
                  How to Apply
                </button>
              </Link>
              <a
                href="https://wa.me/94768856172"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 md:px-8 py-2.5 md:py-3 bg-[#25D366] text-white rounded-full font-semibold text-sm md:text-base hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
              >
                <FaWhatsapp size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;