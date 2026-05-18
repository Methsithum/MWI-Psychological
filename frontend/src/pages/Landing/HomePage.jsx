import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const HomePage = () => {
  const modules = [
    {
      number: "01",
      title: "Introduction to Psychology",
      description: "Foundational concepts, history, and approaches in psychology"
    },
    {
      number: "02",
      title: "Developmental Psychology",
      description: "Human development across the lifespan"
    },
    {
      number: "03",
      title: "Cognitive Psychology",
      description: "Memory, thinking, perception, and problem-solving"
    },
    {
      number: "04",
      title: "Abnormal Psychology",
      description: "Mental disorders and therapeutic approaches"
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
    <div className="min-h-screen bg-[#F8F5EF]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-[#0B1F3A] via-[#10284D] to-[#08162A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div>
              <span className="inline-block px-4 py-1 bg-[#D4AF37] text-[#0B1F3A] text-sm rounded-full mb-5 font-semibold shadow-md">
                Now Enrolling • Limited Seats
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Diploma in{' '}
                <span className="text-[#D4AF37]">
                  Psychology
                </span>
              </h1>

              <p className="mt-6 text-lg text-[#E5E7EB] leading-relaxed">
                Start your journey in psychology with our comprehensive online diploma program.
                Learn from expert faculty and earn a recognized certification.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <button className="w-full sm:w-auto px-8 py-3 bg-[#D4AF37] text-[#0B1F3A] rounded-lg hover:bg-[#C49B2C] transition duration-300 font-semibold shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:scale-105 transform">
                    Enroll Now - Limited Seats
                  </button>
                </Link>

                <Link to="/how-to-apply">
                  <button className="w-full sm:w-auto px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#0B1F3A] transition duration-300 font-semibold hover:scale-105 transform">
                    Learn More
                  </button>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-white">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-[#D4AF37]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                  </svg>

                  <span>1 Year Program</span>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-[#D4AF37]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span>100% Online</span>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-2xl">
                <div className="text-white text-center">
                  <div className="text-7xl mb-4">🧠</div>

                  <h3 className="text-3xl font-bold mb-3">
                    Batch Starting Soon
                  </h3>

                  <p className="mb-6 text-[#E5E7EB]">
                    Limited seats available for the upcoming batch
                  </p>

                  <div className="bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-xl p-5">
                    <div className="text-sm text-[#F5E6A8]">
                      Next Batch Starts
                    </div>

                    <div className="text-3xl font-bold text-[#D4AF37] mt-2">
                      January 2025
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A]">
              Program Overview
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              Comprehensive curriculum designed for aspiring psychologists
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((module, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-7 shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-[#0B1F3A] hover:-translate-y-2"
              >
                <div className="text-5xl font-bold text-[#D4AF37]/40 mb-4">
                  {module.number}
                </div>

                <h3 className="text-xl font-semibold text-[#0B1F3A] mb-3">
                  {module.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {module.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A]">
              Why Choose PWI Psychological?
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              Everything you need to succeed in your psychology journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-[#F5E6A8]/20 transition duration-300 shadow-sm hover:shadow-lg border border-transparent hover:border-[#D4AF37]/20"
              >
                <div className="text-4xl">
                  {feature.icon}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#0B1F3A] mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0B1F3A] to-[#08162A]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Begin Your Journey in Psychology Today
          </h2>

          <p className="text-xl text-[#E5E7EB] mb-10">
            Limited seats available for the upcoming batch.
            Enroll now to secure your spot.
          </p>

          <Link to="/register">
            <button className="px-10 py-4 bg-[#D4AF37] text-[#0B1F3A] rounded-xl hover:bg-[#C49B2C] transition duration-300 font-bold text-lg shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:scale-105 transform">
              Apply for Admission
            </button>
          </Link>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;