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
    { icon: "🎥", title: "Video Lectures", description: "Recorded and live sessions by expert lecturer" },
    { icon: "📚", title: "Study Materials", description: "PDF notes, presentations, and reference materials" },
    { icon: "✅", title: "Attendance Tracking", description: "Digital attendance for every session" },
    { icon: "📝", title: "Assignments", description: "Regular assignments and assessments" },
    { icon: "🎓", title: "Diploma Certificate", description: "Recognized diploma upon completion" },
    { icon: "💬", title: "Student Support", description: "24/7 support and doubt clearing" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded-full mb-4">
                Now Enrolling • Limited Seats
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Diploma in{' '}
                <span className="text-yellow-300">Psychology</span>
              </h1>
              <p className="mt-4 text-lg text-blue-100">
                Start your journey in psychology with our comprehensive online diploma program. 
                Learn from expert faculty and earn a recognized certification.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <button className="w-full sm:w-auto px-8 py-3 bg-yellow-400 text-blue-900 rounded-lg hover:bg-yellow-300 transition duration-300 font-semibold shadow-lg">
                    Enroll Now - Limited Seats
                  </button>
                </Link>
                <Link to="/how-to-apply">
                  <button className="w-full sm:w-auto px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 font-semibold">
                    Learn More
                  </button>
                </Link>
              </div>
              <div className="mt-6 flex items-center space-x-4 text-white">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                  </svg>
                  <span>1 Year Program</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  <span>100% Online</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">🧠</div>
                  <h3 className="text-2xl font-bold mb-2">Batch Starting Soon</h3>
                  <p className="mb-4">Limited seats available for the upcoming batch</p>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-sm">Next Batch Starts</div>
                    <div className="text-3xl font-bold">January 2025</div>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Program Overview</h2>
            <p className="mt-4 text-lg text-gray-600">Comprehensive curriculum designed for aspiring psychologists</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 border-t-4 border-blue-600">
                <div className="text-4xl font-bold text-blue-200 mb-3">{module.number}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-gray-600">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose PWI Psychological?</h2>
            <p className="mt-4 text-lg text-gray-600">Everything you need to succeed in your psychology journey</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-blue-50 transition">
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Begin Your Journey in Psychology Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Limited seats available for the upcoming batch. Enroll now to secure your spot.
          </p>
          <Link to="/register">
            <button className="px-8 py-3 bg-yellow-400 text-blue-900 rounded-lg hover:bg-yellow-300 transition duration-300 font-semibold text-lg shadow-lg">
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