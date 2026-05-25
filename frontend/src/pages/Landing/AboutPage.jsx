import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import lecturerImage from "../../assets/lectimg.jpeg";

import {FaWhatsapp } from 'react-icons/fa';


const AboutPage = () => {
  const qualifications = [
    "BA (Hons) Psychology – University of Kelaniya",
    "MPhil Psychology (Reading) – University of Peradeniya",
    "Diploma in Counselling – University of Kelaniya",
    "Diploma in Psychology & Counselling",
    "Diploma in Ayurvedic Panchakarma & Therapy",
    "Diploma in HRM",
    "Diploma in English & British English"
  ];

  const experienceAreas = [
    "Psychology Education",
    "Counselling & Guidance",
    "Behavioural Psychology",
    "Emotional Wellbeing",
    "HRM & Workplace Psychology",
    "Mindfulness Training"
  ];

  const whyChoose = [
    {
      icon: "🎯",
      title: "Focused Learning",
      description: "Direct lecturer guidance and structured learning",
    },
    {
      icon: "💻",
      title: "Online Education",
      description: "Learn anytime from anywhere with flexible schedules",
    },
    {
      icon: "🎓",
      title: "Professional Diploma",
      description: "Industry-relevant certification recognized widely",
    }
  ];

  // WhatsApp configuration
  const whatsappNumber = "94768856172";
  const whatsappMessage = "Hello! I'm interested in the psychology diploma programs at MWI Psychological. I would like to get more information about the courses and admission process.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-[#FCFAF5]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#0B1F3A]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-56 h-56 md:w-96 md:h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#D4AF37]/15 rounded-full mb-4 md:mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
            <span className="text-xs md:text-sm font-medium text-[#D4AF37] tracking-wide">ABOUT US</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-5 leading-tight">
            About{' '}
            <span className="text-[#D4AF37] relative inline-block">
              Director
              <svg className="absolute bottom-0 left-0 w-full h-2 md:h-3 text-[#D4AF37]/40" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5 T 200 5" stroke="currentColor" fill="none" strokeWidth="2"/>
              </svg>
            </span>
          </h1>
          
          <p className="text-sm md:text-lg text-[#D1D8E0] max-w-2xl mx-auto px-4">
            Your trusted partner in psychological education and professional development
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1 order-2 lg:order-1">
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Our Story</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B1F3A] mt-2 md:mt-3 mb-3 md:mb-5">
                 Established Psychological Institute
              </h2>
              <div className="w-12 h-0.5 bg-[#D4AF37] mb-4 md:mb-6"></div>
              
              <p className="text-sm md:text-base text-[#5A6A7A] leading-relaxed mb-3 md:mb-4">
                MWI Psychological is an educational institute committed to providing
                 knowledge and training in psychology, counselling, HRM, and behavioral development.
              </p>

              <p className="text-sm md:text-base text-[#5A6A7A] leading-relaxed mb-3 md:mb-4">
                Our mission is to provide practical, affordable, and high-quality
                psychological education for students and professionals.
              </p>

              <p className="text-sm md:text-base text-[#5A6A7A] leading-relaxed">
                We combine modern teaching methods with real-world psychological practice
                to create impactful learning experiences.
              </p>

              <div className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs md:text-sm text-[#5A6A7A]">Quality Education</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs md:text-sm text-[#5A6A7A]">Expert Faculty</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs md:text-sm text-[#5A6A7A]">Flexible Learning</span>
                </div>
              </div>
            </div>

            <div className="flex-1 order-1 lg:order-2 w-full">
              <div className="relative">
                <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-20 h-20 md:w-24 md:h-24 bg-[#D4AF37]/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-24 h-24 md:w-32 md:h-32 bg-[#0B1F3A]/10 rounded-full blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-[#0B1F3A] to-[#1A3A5A] rounded-2xl md:rounded-3xl p-6 md:p-8 text-center shadow-2xl border border-[#D4AF37]/20">
                  <div className="text-5xl md:text-7xl mb-3 md:mb-4">🎓</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">First Batch Open</h3>
                  <p className="text-sm md:text-base text-[#D1D8E0] mb-3 md:mb-4">Join our pioneering batch of psychology learners</p>
                  <div className="inline-block px-3 py-1 md:px-4 md:py-2 bg-[#D4AF37]/20 rounded-full">
                    <span className="text-[#D4AF37] text-xs md:text-sm font-semibold">Limited Seats Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lecturer Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F8F4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Meet Your Mentor</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B1F3A] mt-2 md:mt-3">
              Lecturer & Founder
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-3 md:mt-4"></div>
          </div>

          {/* Horizontal Card Design */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/10">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-2/5 relative">
                <div 
                  className="h-100 md:h-96 lg:h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${lecturerImage})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-l-2xl"></div>
                </div>
                
                {/* Name Badge - Mobile */}
                <div className="absolute bottom-4 left-4 right-4 lg:hidden">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-[#D4AF37]/20">
                    <h3 className="text-lg font-bold text-[#0B1F3A]">K.M. Imasha Isurune</h3>
                    <p className="text-[#D4AF37] text-xs mt-0.5">Psychologist | Lecturer | Counsellor</p>
                    <p className="text-gray-500 text-xs mt-0.5">ඉසුරුණී මුදලිගේ</p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-3/5 p-5 md:p-6 lg:p-8">
                {/* Name - Desktop only */}
                <div className="hidden lg:block mb-5">
                  <h3 className="text-2xl font-bold text-[#0B1F3A]">K.M. Imasha Isurune</h3>
                  <p className="text-[#D4AF37] text-sm mt-1">Psychology Lecturer | Counsellor | Ayurvedic Therapist</p>
                  <p className="text-gray-500 text-sm mt-1">ඉසුරුණී මුදලිගේ</p>
                  <div className="w-12 h-0.5 bg-[#D4AF37] mt-3"></div>
                </div>

                <p className="text-sm md:text-base text-[#5A6A7A] leading-relaxed mb-5 md:mb-6">
                  K.M. Imasha Isurune is a psychology lecturer, counsellor, and
                  behavioural psychology educator specializing in emotional wellbeing,
                  counselling, mindfulness, and human behaviour studies.
                </p>

                {/* Qualifications */}
                <div className="mb-5 md:mb-6">
                  <h4 className="text-base md:text-lg font-bold text-[#0B1F3A] mb-3 flex items-center gap-2">
                    <span className="text-[#D4AF37] text-lg">📚</span>
                    Educational Qualifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {qualifications.map((qual, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs md:text-sm text-[#5A6A7A] bg-[#F8F4EC] p-2 rounded-lg">
                        <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#D4AF37] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{qual}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Tags */}
                <div className="mb-5 md:mb-6">
                  <h4 className="text-base md:text-lg font-bold text-[#0B1F3A] mb-3 flex items-center gap-2">
                    <span className="text-[#D4AF37] text-lg">💼</span>
                    Professional Experience
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experienceAreas.map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] text-white rounded-full text-xs md:text-sm shadow-md"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Card with WhatsApp */}
                <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#F5E6A8]/20 rounded-xl p-4 border border-[#D4AF37]/20">
                  <h4 className="font-bold text-[#0B1F3A] mb-2 text-sm md:text-base flex items-center gap-2">
                    <span>📞</span>
                    Contact Information
                  </h4>
                  <div className="space-y-2">
                    <a href="mailto:psychologicalinstitute351@gmail.com" className="text-[#5A6A7A] text-xs md:text-sm flex items-center gap-2 break-all hover:text-[#D4AF37] transition">
                      <span>📧</span> psychologicalinstitute351@gmail.com
                    </a>
                    <a href="tel:+94768856172" className="text-[#5A6A7A] text-xs md:text-sm flex items-center gap-2 hover:text-[#D4AF37] transition">
                      <span>📞</span> 076 885 6172
                    </a>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-green-600 text-xs md:text-sm flex items-center gap-2 hover:text-green-700 transition">
                      <span>💬</span> 076 885 6172 (WhatsApp)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Why Choose Us</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B1F3A] mt-2 md:mt-3">
              Reasons to Trust MWI
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-3 md:mt-4"></div>
            <p className="text-sm md:text-base text-[#5A6A7A] max-w-2xl mx-auto mt-3 md:mt-4 px-4">
              We provide everything you need for a successful learning journey
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {whyChoose.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl md:rounded-2xl p-5 md:p-8 text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-[#0B1F3A]/5 hover:border-[#D4AF37]/30"
              >
                <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-[#D4AF37]/10 to-[#E7CFA0]/20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-5 group-hover:scale-110 transition-transform">
                  <span className="text-3xl md:text-4xl">{item.icon}</span>
                </div>
                <h3 className="text-base md:text-xl font-bold text-[#0B1F3A] mb-1 md:mb-3">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#6B7A8A] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Contact Banner */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="text-4xl"><FaWhatsapp size={60} color="white" /></span>
                <div>
                  <h3 className="text-white font-bold text-xl">Have Questions?</h3>
                  <p className="text-green-100 text-sm">Chat with us directly on WhatsApp</p>
                </div>
              </div>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <span className="text-xl"><FaWhatsapp size={16} /></span>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative">
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
            <p className="text-sm md:text-base text-[#D1D8E0] mb-5 md:mb-8">
              Join our upcoming batch and begin your psychology education today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button className="inline-flex items-center gap-2 px-5 md:px-8 py-2 md:py-3 bg-[#D4AF37] text-[#0B1F3A] rounded-full font-bold text-sm md:text-base hover:bg-[#C49B2C] hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                  Enroll Now
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 md:px-8 py-2 md:py-3 bg-white/20 text-white rounded-full font-bold text-sm md:text-base hover:bg-white/30 transition-all duration-300"
              >
                <span><FaWhatsapp size={20} color="white" /></span>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 group"
      >
        <span className="text-2xl"><FaWhatsapp size={30} color="white" /></span>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:bg-[#128C7E] transition whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>

      <Footer />
    </div>
  );
};

export default AboutPage;