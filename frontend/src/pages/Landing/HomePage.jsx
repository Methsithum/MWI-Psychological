import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import heroImage from '../../assets/hero-bg.png';

const HomePage = () => {
  const modules = [
    {
      number: "01",
      title: "Introduction to Psychology",
      description: "Foundational concepts, history, and approaches in psychology",
      icon: "🧠"
    },
    {
      number: "02",
      title: "Developmental Psychology",
      description: "Human development across the lifespan",
      icon: "🌱"
    },
    {
      number: "03",
      title: "Cognitive Psychology",
      description: "Memory, thinking, perception, and problem-solving",
      icon: "💭"
    },
    {
      number: "04",
      title: "Abnormal Psychology",
      description: "Mental disorders and therapeutic approaches",
      icon: "🫀"
    }
  ];

  const features = [
    {
      icon: "🎥",
      title: "Video Lectures",
      description: "Recorded and live sessions by expert lecturers"
    },
    {
      icon: "📚",
      title: "Study Materials",
      description: "PDF notes, presentations, and reference materials"
    },
    {
      icon: "✅",
      title: "Attendance Tracking",
      description: "Digital attendance for every session"
    },
    {
      icon: "📝",
      title: "Assignments",
      description: "Regular assignments and assessments"
    },
    {
      icon: "🎓",
      title: "Diploma Certificate",
      description: "Recognized diploma upon completion"
    },
    {
      icon: "💬",
      title: "Student Support",
      description: "24/7 support and doubt clearing"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FCFAF5]">
      <Navbar />

      {/* Hero Section - Navy #0B1F3A with Image */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#0B1F3A]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage}
            alt="Psychology background"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay - this creates the dark tint so text is readable */}
          <div className="absolute inset-0 bg-[#0B1F3A]/70"></div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/15 rounded-full mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-[#D4AF37] tracking-wide">NOW ENROLLING • LIMITED SEATS</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.2]">
                Diploma in{' '}
                <span className="text-[#D4AF37] relative inline-block">
                  Psychology
                  <svg className="absolute bottom-2 left-0 w-full h-3 text-[#D4AF37]/40" viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5 T 200 5" stroke="currentColor" fill="none" strokeWidth="2"/>
                  </svg>
                </span>
              </h1>

              <p className="mt-6 text-lg text-[#D1D8E0] leading-relaxed max-w-lg">
                Start your journey in psychology with our comprehensive online diploma program.
                Learn from expert faculty and earn a recognized certification.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <button className="group relative px-8 py-3.5 bg-[#D4AF37] text-[#0B1F3A] rounded-full overflow-hidden transition-all duration-300 hover:bg-[#C49B2C] hover:shadow-xl hover:-translate-y-0.5 font-semibold tracking-wide">
                    <span className="relative z-10 flex items-center gap-2">
                      Enroll Now
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </Link>

                <Link to="/how-to-apply">
                  <button className="px-8 py-3.5 border-2 border-white/30 text-white rounded-full hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 font-semibold backdrop-blur-sm">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Card - Modern Glassmorphism */}
           <div className="absolute bottom-6 right-8 md:bottom-0 md:right-1 z-1">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl max-w-[220px]">
            <div className="text-center">
              <h3 className="text-base font-bold text-white mb-1">
                Batch Starting Soon
              </h3>

              <p className="text-white/60 text-xs mb-3">
                Limited seats available
              </p>

              <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 backdrop-blur-sm rounded-xl p-3 border border-[#D4AF37]/30">
                <div className="text-[10px] text-[#D4AF37] tracking-wide uppercase">Next Batch Starts</div>
                <div className="text-lg font-bold text-[#D4AF37] mt-0.5 flex items-center justify-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Jan 2025
                </div>
              </div>
            </div>
          </div>
        </div>
     

          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Curriculum</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mt-3">
              Program Overview
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4"></div>
            <p className="mt-5 text-lg text-[#5A6A7A] max-w-2xl mx-auto">
              Comprehensive curriculum designed for aspiring psychologists
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <div
                key={index}
                className="group relative bg-[#FCFAF5] rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl border border-[#0B1F3A]/5 hover:border-[#D4AF37]/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{module.icon}</span>
                  <span className="text-5xl font-bold text-[#D4AF37]/20 group-hover:text-[#D4AF37]/30 transition-colors">
                    {module.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#0B1F3A] mb-2">
                  {module.title}
                </h3>
                <p className="text-[#6B7A8A] leading-relaxed text-sm">
                  {module.description}
                </p>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#D4AF37] to-[#E7CFA0] group-hover:w-full transition-all duration-500 rounded-b-2xl"></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/curriculum">
              <button className="inline-flex items-center gap-2 text-[#D4AF37] font-medium hover:gap-3 transition-all">
                View Full Curriculum
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-b from-[#F8F4EC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mt-3">
              Everything You Need to Succeed
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-[#0B1F3A]/5 hover:border-[#D4AF37]/20"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37]/10 to-[#E7CFA0]/20 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#0B1F3A] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#6B7A8A] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" width="60" height="60">
            <circle cx="30" cy="30" r="1.5" fill="#D4AF37" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <svg className="w-12 h-12 text-[#D4AF37]/40 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-2xl md:text-3xl font-light text-white leading-relaxed">
            "The psychology diploma program transformed my understanding of human behavior. 
            The faculty and curriculum are exceptional."
          </p>
          <div className="mt-8">
            <div className="w-12 h-12 bg-[#D4AF37] rounded-full mx-auto flex items-center justify-center text-[#0B1F3A] font-bold text-xl">
              S
            </div>
            <p className="text-[#D4AF37] font-medium mt-3">Sarah Johnson</p>
            <p className="text-white/60 text-sm">Current Student</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FCFAF5] to-[#F8F4EC]"></div>
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 border border-[#D4AF37]/20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/10 rounded-full text-sm font-medium text-[#D4AF37] mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Limited Seats Available
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0B1F3A] mb-5">
              Begin Your Journey in Psychology Today
            </h2>
            <p className="text-lg text-[#5A6A7A] mb-10 max-w-2xl mx-auto">
              Join hundreds of students who have started their psychology career with us. 
              Limited seats available for the upcoming batch.
            </p>
            <Link to="/register">
              <button className="inline-flex items-center gap-3 px-10 py-4 bg-[#0B1F3A] text-white rounded-full hover:bg-[#1A3A5A] transition-all duration-300 text-lg font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                Apply for Admission
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
            <p className="mt-6 text-sm text-[#6B7A8A]">
              ✓ No application fee  ✓ Flexible payment plans  ✓ 7-day money-back guarantee
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;