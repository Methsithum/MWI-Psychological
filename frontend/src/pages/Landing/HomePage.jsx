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
      {/* Hero Section - Navy #0B1F3A with Image */}
<section className="relative pt-20 pb-32 md:pt-28 md:pb-36 overflow-hidden bg-[#0B1F3A]">
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

  {/* Decorative shapes - hidden on mobile */}
  <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl z-0"></div>
  <div className="absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl z-0"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
      
      {/* Left Content - Full width on mobile */}
      <div className="flex-1 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#D4AF37]/15 rounded-full mb-4 md:mb-6 backdrop-blur-sm mx-auto lg:mx-0">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
          <span className="text-xs md:text-sm font-medium text-[#D4AF37] tracking-wide">NOW ENROLLING • LIMITED SEATS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.2]">
          Diploma in{' '}
          <span className="text-[#D4AF37] relative inline-block">
            Psychology
            <svg className="absolute bottom-0 lg:bottom-2 left-0 w-full h-2 lg:h-3 text-[#D4AF37]/40" viewBox="0 0 200 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5 T 200 5" stroke="currentColor" fill="none" strokeWidth="2"/>
            </svg>
          </span>
        </h1>

        <p className="mt-4 md:mt-6 text-sm md:text-lg text-[#D1D8E0] leading-relaxed max-w-lg mx-auto lg:mx-0">
          Start your journey in psychology with our comprehensive online diploma program.
          Learn from expert faculty and earn a recognized certification.
        </p>

        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
          <Link to="/register">
            <button className="group relative px-6 md:px-8 py-2.5 md:py-3.5 bg-[#D4AF37] text-[#0B1F3A] rounded-full overflow-hidden transition-all duration-300 hover:bg-[#C49B2C] hover:shadow-xl hover:-translate-y-0.5 font-semibold text-sm md:text-base tracking-wide w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Enroll Now
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </Link>

          <Link to="/how-to-apply">
            <button className="px-6 md:px-8 py-2.5 md:py-3.5 border-2 border-white/30 text-white rounded-full hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 font-semibold text-sm md:text-base backdrop-blur-sm w-full sm:w-auto">
              Learn More
            </button>
          </Link>
        </div>
      </div>

      {/* Empty div for spacing on desktop */}
      <div className="hidden lg:block flex-1"></div>
    </div>
  </div>

  {/* Small Card - Responsive positioning */}
  
</section>

      {/* Program Overview */}
     <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <span className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Our Programs</span>
      <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mt-3">
        Program Overview
      </h2>
      <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4"></div>
      <p className="mt-4 text-base text-[#5A6A7A] max-w-2xl mx-auto">
        Choose your path — professional HRM or Buddhist counselling psychology
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Program 1: HRM & Behavioral Psychology */}
      <div className="group relative bg-gradient-to-br from-white to-[#F8F4EC] rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl border border-[#0B1F3A]/5 hover:border-[#D4AF37]/30">
        <div className="flex items-center justify-between mb-4">
          <span className="text-4xl">👥</span>
          <span className="px-3 py-1 bg-[#D4AF37]/10 rounded-full text-xs font-semibold text-[#D4AF37]">6 Months</span>
        </div>
        
        <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">
          Diploma in HRM & Behavioral Psychology
        </h3>
        
        <p className="text-[#6B7A8A] leading-relaxed text-sm mb-4">
          Practical and professional knowledge in Human Resource Management, workplace psychology, 
          employee behaviour, leadership, and organizational development.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-[#D4AF37]/5 rounded text-xs text-[#0B1F3A]">HR Management</span>
          <span className="px-2 py-1 bg-[#D4AF37]/5 rounded text-xs text-[#0B1F3A]">Employee Behaviour</span>
          <span className="px-2 py-1 bg-[#D4AF37]/5 rounded text-xs text-[#0B1F3A]">Leadership</span>
          <span className="px-2 py-1 bg-[#D4AF37]/5 rounded text-xs text-[#0B1F3A]">Emotional Intelligence</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#0B1F3A]/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-[#5A6A7A]">Online</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="text-xs text-[#5A6A7A]">Sinhala</span>
            </div>
          </div>
          
          <Link to="/courses/hrm-behavioral-psychology">
            <button className="text-[#D4AF37] text-sm font-medium hover:gap-2 transition-all inline-flex items-center gap-1">
              Learn More
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>

      {/* Program 2: Buddhist Counselling */}
      <div className="group relative bg-gradient-to-br from-white to-[#F8F4EC] rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl border border-[#0B1F3A]/5 hover:border-[#D4AF37]/30">
        <div className="flex items-center justify-between mb-4">
          <span className="text-4xl">🧘</span>
          <span className="px-3 py-1 bg-[#D4AF37]/10 rounded-full text-xs font-semibold text-[#D4AF37]">6 Months</span>
        </div>
        
        <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">
          Diploma in Buddhist Counselling & Applied Buddhist Psychology
        </h3>
        
        <p className="text-[#6B7A8A] leading-relaxed text-sm mb-4">
          Buddhist philosophy, mindfulness practices, counselling techniques, and psychological 
          understanding for personal and professional development.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-[#D4AF37]/5 rounded text-xs text-[#0B1F3A]">Buddhist Psychology</span>
          <span className="px-2 py-1 bg-[#D4AF37]/5 rounded text-xs text-[#0B1F3A]">Mindfulness</span>
          <span className="px-2 py-1 bg-[#D4AF37]/5 rounded text-xs text-[#0B1F3A]">Counselling Skills</span>
          <span className="px-2 py-1 bg-[#D4AF37]/5 rounded text-xs text-[#0B1F3A]">Emotional Management</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#0B1F3A]/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-[#5A6A7A]">Online</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="text-xs text-[#5A6A7A]">Sinhala</span>
            </div>
          </div>
          
          <Link to="/courses/buddhist-counselling-psychology">
            <button className="text-[#D4AF37] text-sm font-medium hover:gap-2 transition-all inline-flex items-center gap-1">
              Learn More
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>

    {/* View All Programs Link */}
    <div className="text-center mt-10">
      <Link to="/courses">
        <button className="inline-flex items-center gap-2 text-[#D4AF37] font-medium hover:gap-3 transition-all">
          View All Programs
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