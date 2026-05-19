import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const HowToApplyPage = () => {

  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up on our LMS portal with your basic information",
      icon: "📝"
    },
    {
      number: "02",
      title: "Fill Application",
      description: "Complete the online application form with your details",
      icon: "📋"
    },
    {
      number: "03",
      title: "Upload Documents",
      description: "Submit certificates, ID proof, and required documents",
      icon: "📎"
    },
    {
      number: "04",
      title: "Pay Application Fee",
      description: "Secure your application with payment confirmation",
      icon: "💳"
    },
    {
      number: "05",
      title: "Review Process",
      description: "Our academic team will verify your application",
      icon: "🔍"
    },
    {
      number: "06",
      title: "Start Learning",
      description: "Get LMS access and begin your psychology journey",
      icon: "🎓"
    }
  ];

  const requirements = [
    "High School Qualification or equivalent",
    "Basic English understanding",
    "Computer or smartphone with internet",
    "Commitment to complete the program",
    "Valid email & contact number"
  ];

  const documents = [
    "High School Certificate",
    "National ID / Passport",
    "Passport Size Photo",
    "Birth Certificate"
  ];

  const fees = [
    { item: "Application Fee", amount: "Rs. 1,500" },
    { item: "Full Course Fee", amount: "Rs. 45,000" },
    { item: "Monthly Installment", amount: "Rs. 4,000 x 12" },
    { item: "Exam Fee", amount: "Rs. 2,500" },
    { item: "Certificate Fee", amount: "Rs. 1,000" }
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
            <span className="text-xs md:text-sm font-medium text-[#D4AF37] tracking-wide">ADMISSIONS OPEN</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-5 leading-tight">
            How to{' '}
            <span className="text-[#D4AF37] relative inline-block">
              Apply
              <svg className="absolute bottom-0 left-0 w-full h-2 md:h-3 text-[#D4AF37]/40" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5 T 200 5" stroke="currentColor" fill="none" strokeWidth="2"/>
              </svg>
            </span>
          </h1>
          
          <p className="text-sm md:text-lg text-[#D1D8E0] max-w-2xl mx-auto">
            Simple 6-step admission process to join PWI Psychological
          </p>
        </div>
      </section>

      {/* Steps Section - Modern Timeline Style */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Simple Process</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B1F3A] mt-2 md:mt-3">
              Admission Process
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-3 md:mt-4"></div>
            <p className="text-sm md:text-base text-[#5A6A7A] mt-3 md:mt-4 max-w-2xl mx-auto px-4">
              Follow these steps to become a student at PWI Psychological
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-xl md:rounded-2xl p-5 md:p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-[#0B1F3A]/5 hover:border-[#D4AF37]/30"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] rounded-t-xl md:rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#D4AF37]/10 to-[#E7CFA0]/20 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl md:text-3xl">{step.icon}</span>
                  </div>
                  <span className="text-3xl md:text-4xl font-bold text-[#D4AF37]/20 group-hover:text-[#D4AF37]/30 transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base md:text-lg font-bold text-[#0B1F3A] mb-1 md:mb-2">
                  {step.title}
                </h3>

                <p className="text-xs md:text-sm text-[#6B7A8A] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Documents - Modern Two Column */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F8F4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            
            {/* Eligibility Requirements */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-[#D4AF37]/10 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl md:text-3xl">✓</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-[#0B1F3A]">
                  Eligibility Requirements
                </h2>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {requirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm md:text-base text-[#5A6A7A] p-2 rounded-lg hover:bg-[#F8F4EC] transition">
                    <span className="text-[#D4AF37] text-lg md:text-xl">✔</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-[#D4AF37]/10 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl md:text-3xl">📄</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-[#0B1F3A]">
                  Required Documents
                </h2>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {documents.map((doc, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm md:text-base text-[#5A6A7A] p-2 rounded-lg hover:bg-[#F8F4EC] transition">
                    <span className="text-[#D4AF37] text-lg md:text-xl">📎</span>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Fee Structure - Modern Card Design */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Investment</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B1F3A] mt-2 md:mt-3">
              Fee Structure
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-3 md:mt-4"></div>
            <p className="text-sm md:text-base text-[#5A6A7A] mt-3 md:mt-4">
              Affordable payment options for the Diploma in Psychology Program
            </p>
          </div>

          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/20">
            <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] text-white p-4 md:p-5">
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl">🎓</span>
                <span className="font-semibold text-sm md:text-base">Diploma in Psychology Program</span>
              </div>
            </div>

            <div className="divide-y divide-[#D4AF37]/10">
              {fees.map((fee, i) => (
                <div key={i} className="flex justify-between items-center p-4 md:p-5 hover:bg-[#F8F4EC] transition">
                  <span className="text-sm md:text-base text-[#5A6A7A]">{fee.item}</span>
                  <span className="text-[#D4AF37] font-bold text-sm md:text-base">{fee.amount}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#F5E6A8]/20 p-4 md:p-5 border-t border-[#D4AF37]/20">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#0B1F3A] text-sm md:text-base">Total Program Fee</span>
                <span className="text-[#D4AF37] font-bold text-base md:text-lg">Rs. 54,000</span>
              </div>
              <p className="text-xs text-[#6B7A8A] mt-2">
                * EMI options available. Contact for more details.
              </p>
            </div>
          </div>

          {/* Payment Note */}
          <div className="mt-6 md:mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#D4AF37]/10 rounded-full">
              <span className="text-[#D4AF37] text-sm md:text-base">💳</span>
              <span className="text-xs md:text-sm text-[#5A6A7A]">Secure online payment • Bank transfer available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F8F4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5 md:gap-8">
            
            <div className="text-center bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-lg border border-[#D4AF37]/10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-2xl md:text-3xl">📅</span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-[#0B1F3A] mb-1">Application Deadline</h3>
              <p className="text-[#D4AF37] font-semibold text-sm md:text-base">December 15, 2024</p>
            </div>

            <div className="text-center bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-lg border border-[#D4AF37]/10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-2xl md:text-3xl">🎓</span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-[#0B1F3A] mb-1">Batch Starts</h3>
              <p className="text-[#D4AF37] font-semibold text-sm md:text-base">January 15, 2025</p>
            </div>

            <div className="text-center bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-lg border border-[#D4AF37]/10">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-2xl md:text-3xl">⏰</span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-[#0B1F3A] mb-1">Duration</h3>
              <p className="text-[#D4AF37] font-semibold text-sm md:text-base">6 Months (Online)</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section - Modern Glass Morphism */}
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
              Start Your Psychology Journey Today
            </h2>
            <p className="text-sm md:text-base text-[#D1D8E0] mb-4 md:mb-6">
              Limited seats available for the current batch. Apply now!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link to="/register">
                <button className="px-5 md:px-8 py-2.5 md:py-3 bg-[#D4AF37] text-[#0B1F3A] rounded-full font-bold text-sm md:text-base hover:bg-[#C49B2C] hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                  Apply Now
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-5 md:px-8 py-2.5 md:py-3 border-2 border-white/30 text-white rounded-full font-bold text-sm md:text-base hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300">
                  Contact Admissions
                </button>
              </Link>
            </div>
            <p className="text-xs text-white/40 mt-4 md:mt-6">
              * For assistance, call us at 076 885 6172
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowToApplyPage;