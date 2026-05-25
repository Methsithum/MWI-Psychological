import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import heroImage from "../../assets/herobanner3.jpeg";
import prmimg1 from "../../assets/hrmhome.jpeg";
import bddimg1 from "../../assets/buddisthome.jpeg";
import spirimg1 from "../../assets/Spirithome.jpeg";
import perimg1 from "../../assets/Perhome.jpeg";
import famhome from "../../assets/famhome.jpeg";
import clinhome from "../../assets/clinical.jpeg";
import childhome from "../../assets/child.jpeg";
import adicthome from "../../assets/addiction.jpeg";
import crihome from "../../assets/criminal.jpeg";
import behvhome from "../../assets/behvhome.jpeg";
import comhome from "../../assets/comhome.jpeg";
import sepchome from "../../assets/sepchome.jpeg";
import menthome from "../../assets/mentalhome.jpeg";
import preghome from "../../assets/preghome.jpeg";
import aihome from "../../assets/aihome.jpeg";

const HomePage = () => {
  const programs = [
    { image: prmimg1, name: "HRM & Behavioral Psychology", sinhala: "HRM හා චර්යාත්මක මනෝවිද්‍යාව" },
    { image: bddimg1, name: "Buddhist Counselling", sinhala: "බෞද්ධ උපදේශන" },
    { image: spirimg1, name: "Spiritual Psychology", sinhala: "අධ්‍යාත්මික මනෝවිද්‍යාව" },
    { image: perimg1, name: "Performance Psychology", sinhala: "කාර්ය සාධන මනෝවිද්‍යාව" },
    { image: famhome, name: "Family Psychology", sinhala: "පවුල් මනෝවිද්‍යාව" },
    { image: childhome, name: "Child Psychology", sinhala: "ළමා මනෝවිද්‍යාව" },
    { image: clinhome, name: "Clinical Psychology", sinhala: "සායනික මනෝවිද්‍යාව" },
    { image: crihome, name: "Criminal Psychology", sinhala: "අපරාධ මනෝවිද්‍යාව" },
    { image: adicthome, name: "Addiction Psychology", sinhala: "ඇබ්බැහි මනෝවිද්‍යාව" },
    { image: behvhome, name: "Behavioral Psychology", sinhala: "චර්යාත්මක මනෝවිද්‍යාව" },
    { image: comhome, name: "Community Psychology", sinhala: "ප්‍රජා මනෝවිද්‍යාව" },
    { image: sepchome, name: "Special Education Psychology", sinhala: "විශේෂ අධ්‍යාපන මනෝවිද්‍යාව" },
    { image: menthome, name: "Mental Health Psychology", sinhala: "මානසික සෞඛ්‍ය මනෝවිද්‍යාව" },
    { image: preghome, name: "Pregnancy Psychology", sinhala: "ගර්භණී මනෝවිද්‍යාව" },
    { image: aihome, name: "AI & Psychology", sinhala: "AI හා මනෝවිද්‍යාව" },
  ];

  const features = [
    {
      icon: "🎥",
      title: "Video Lectures",
     
      descriptionEn: "Recorded and live sessions by expert lecturers",
      gradient: "from-blue-600 to-blue-700",
    },
    {
      icon: "📚",
      title: "Study Materials",
    
      descriptionEn: "PDF notes, presentations, and reference materials",
      gradient: "from-green-600 to-green-700",
    },
    {
      icon: "✅",
      title: "Attendance Tracking",
      
      descriptionEn: "Digital attendance for every session",
      gradient: "from-purple-600 to-purple-700",
    },
    {
      icon: "📝",
      title: "Assignments",
      
      descriptionEn: "Regular assignments and assessments",
      gradient: "from-orange-600 to-orange-700",
    },
    {
      icon: "🎓",
      title: "Diploma Certificate",
      
      descriptionEn: "Recognized diploma upon completion",
      gradient: "from-red-600 to-red-700",
    },
    {
      icon: "💬",
      title: "Student Support",
      descriptionEn: "24/7 support and doubt clearing",
      gradient: "from-teal-600 to-teal-700",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FCFAF5]">
      <Navbar />

      {/* Hero Section - Fully Responsive Banner */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] md:min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="MWI Psychological Institute Banner"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/40"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-5 w-24 h-24 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-5 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12 md:py-16">
          {/* Institute Name */}
          <div className="mb-4 sm:mb-5 md:mb-6 animate-fadeInUp">
            <div className="inline-block">
              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <div className="w-6 sm:w-8 md:w-10 lg:w-12 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                <span className="text-[#D4AF37] text-[10px] sm:text-xs md:text-sm tracking-wider font-medium">
                  MWI
                </span>
                <div className="w-6 sm:w-8 md:w-10 lg:w-12 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                MWI මනෝවිද්‍යාත්මක
                <br />
                ආයතනය
              </h1>
              <p className="text-white/50 text-[10px] sm:text-xs md:text-sm mt-1">
                MWI Psychological Center
              </p>
            </div>
          </div>

          {/* Main Tagline */}
          <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 animate-fadeInUp animation-delay-200">
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white leading-tight">
              ශ්‍රී ලංකාවේ එකම
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#D4AF37] leading-tight mt-1 sm:mt-2">
              මනෝවිද්‍යාත්මක ආයතනය
            </p>
            <p className="text-white/40 text-[10px] sm:text-xs md:text-sm mt-1">
              The only psychological institute in Sri Lanka
            </p>
          </div>

          {/* Description */}
          <div className="max-w-3xl mx-auto px-3 sm:px-4">
  <p className="text-white/80 text-base text-shadow-black sm:text-lg md:text-xl lg:text-1xl leading-relaxed mb-4 sm:mb-5 md:mb-6 animate-fadeInUp animation-delay-400">
    රාජ්‍ය විශ්වවිද්‍යාලවල දේශකවරැන් විසින් මෙහෙයවනු ලබන මෙම ඩිප්ලෝමා
    පාඨමාලා සදහා රජයේ මෙන්ම වෘත්තීය වැදගත්කමත් සහිත පිළිගත් සහතිකයක් ඔබට
    ලබා ගත හැක.
  </p>
  <p className="text-white/50 text-sm sm:text-base md:text-lg">
    Start your journey in psychology with our comprehensive online
    diploma program. Learn from expert faculty and earn a recognized
    certification.
  </p>
</div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-5 sm:mt-6 md:mt-8 animate-fadeInUp animation-delay-600 px-4 sm:px-0">
            <Link to="/register">
              <button className="group px-5 sm:px-6 md:px-7 lg:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3 bg-[#D4AF37] text-[#0B1F3A] rounded-full font-bold hover:bg-[#C49B2C] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 justify-center text-xs sm:text-sm md:text-base w-full sm:w-auto">
                <span>දැන් ලියාපදිංචි වන්න</span>
                <svg
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
            <Link to="/how-to-apply">
              <button className="px-5 sm:px-6 md:px-7 lg:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3 border-2 border-white/30 text-white rounded-full font-semibold hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 backdrop-blur-sm text-xs sm:text-sm md:text-base w-full sm:w-auto">
                වැඩිදුර ඉගෙන ගන්න
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-6 justify-center mt-5 sm:mt-6 md:mt-8 lg:mt-10 pt-3 sm:pt-4 md:pt-5 lg:pt-6 border-t border-white/10 animate-fadeInUp animation-delay-800">
            <div className="flex items-center gap-1 sm:gap-2">
              <svg
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#D4AF37]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white/70 text-[9px] sm:text-[10px] md:text-xs lg:text-sm whitespace-nowrap">පිළිගත් ඩිප්ලෝමා</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <svg
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#D4AF37]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white/70 text-[9px] sm:text-[10px] md:text-xs lg:text-sm whitespace-nowrap">100% මාර්ගගත</span>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview - Mobile Responsive Grid */}
      <section className="py-10 sm:py-14 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <span className="text-xs sm:text-sm  text-[#D4AF37] font-semibold">
              MWI මනෝවිද්‍යාත්මක ආයතනය
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1F3A] mt-2 sm:mt-3">
              අපගේ ඩිප්ලෝමා
            </h2>
            <p className="text-[#D4AF37] text-xs sm:text-sm mt-1">Our Diploma Programs</p>
            <div className="w-12 sm:w-16 h-0.5 bg-[#D4AF37] mx-auto mt-3 sm:mt-4"></div>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#5A6A7A] max-w-2xl mx-auto px-2">
               ඔබට ගැලපෙන ඩිප්ලෝමාව තෝරා ගන්න
            </p>
            <p className="text-xs text-gray-400">Choose your path</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {programs.map((program, index) => (
              <div
                key={index}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl"
                style={{ height: "250px" }}
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 text-center z-10 px-2">
                  <p className="text-white text-[11px] sm:text-xs font-medium mb-1">{program.sinhala}</p>
                  <p className="text-white/60 text-[9px] sm:text-[10px] mb-2 sm:mb-3">{program.name}</p>
                  <Link to="/courses">
                    <button className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#D4AF37] text-[#0B1F3A] rounded-full text-[10px] sm:text-xs font-semibold hover:bg-[#C49B2C] transition-all duration-300 hover:scale-105 flex items-center gap-1 mx-auto">
                      <span>Learn More</span>
                      <svg
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link to="/courses">
              <button className="inline-flex items-center gap-2 text-[#D4AF37] font-medium hover:gap-3 transition-all text-sm sm:text-base">
                සියලුම වැඩසටහන් බලන්න
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Mobile Responsive */}
      <section className="py-10 sm:py-14 md:py-16 lg:py-20 bg-gradient-to-b from-[#F8F4EC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <span className="text-xs sm:text-sm tracking-[0.3em] text-[#D4AF37] font-semibold">
              අපව තෝරා ගන්නේ ඇයි?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1F3A] mt-2 sm:mt-3">
              Why Choose Us 
            </h2>
            <p className="text-[#D4AF37] text-xs sm:text-sm mt-1">Why Choose Us</p>
            <div className="w-12 sm:w-16 h-0.5 bg-[#D4AF37] mx-auto mt-3 sm:mt-4"></div>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#5A6A7A] max-w-2xl mx-auto px-2">
              ඔබගේ මනෝවිද්‍යා ගමන සඳහා හොඳම සම්පත් සහ සහාය අපි සපයන්නෙමු
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-white`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-5 group-hover:scale-110 transition-transform backdrop-blur-sm">
                  <span className="text-3xl sm:text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/60 mb-1">{feature.titleEn}</p>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Responsive */}
      <section className="py-10 sm:py-14 md:py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] to-[#08162A]"></div>
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" width="40" height="40">
            <circle cx="20" cy="20" r="1.5" fill="#D4AF37" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-white/20 mx-3 sm:mx-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
              අදම ඔබේ ගමන ආරම්භ කරන්න
            </h2>
            <p className="text-[#D4AF37] text-xs sm:text-sm mb-1 sm:mb-2">
              Begin Your Journey Today
            </p>
            <p className="text-white/70 text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6">
              වෘත්තීය ඩිප්ලෝමා වැඩසටහන් සඳහා දැන්ම ලියාපදිංචි වන්න
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/register">
                <button className="px-6 sm:px-7 md:px-8 py-2 sm:py-2.5 md:py-3 bg-[#D4AF37] text-[#0B1F3A] rounded-full font-bold hover:bg-[#C49B2C] hover:shadow-xl transition-all duration-300 text-sm sm:text-base w-full sm:w-auto">
                  දැන් අයදුම් කරන්න
                </button>
              </Link>
              <Link to="/how-to-apply">
                <button className="px-6 sm:px-7 md:px-8 py-2 sm:py-2.5 md:py-3 border-2 border-white/30 text-white rounded-full font-semibold hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto">
                  අයදුම් කරන ආකාරය
                </button>
              </Link>
            </div>
            <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center text-white/50 text-[9px] sm:text-[10px] md:text-xs">
              <span>✓ අයදුම්පත් ගාස්තු ඇත</span>
              <span>✓ නම්‍යශීලී ගෙවීම් සැලසුම්</span>
              <span>✓ රජයේ පිළිගත් සහතිකය</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;