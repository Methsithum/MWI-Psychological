import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About PWI Psychological</h1>
          <p className="text-xl text-blue-100">Your trusted partner in psychological education</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-600 font-semibold">Our Story</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Just Launched - A New Chapter in Psychological Education</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                PWI Psychological is a newly established learning center dedicated exclusively to 
                providing high-quality diploma education in psychology. We've just launched our 
                first batch, marking the beginning of an exciting journey in psychological education.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our center was founded with a simple yet powerful vision: to make quality 
                psychological education accessible, affordable, and effective for aspiring 
                psychologists across the country.
              </p>
              <p className="text-gray-600 leading-relaxed">
                As a new institution, we bring fresh perspectives, modern teaching methods, 
                and unwavering commitment to our students' success.
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="text-6xl mb-4 text-center">🎓</div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">New Center • First Batch</h3>
              <p className="text-center text-gray-600">Join us as we build the future of psychological education</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Lecturer Section - Focus on one lecturer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Meet Your Lecturer</h2>
            <p className="mt-4 text-lg text-gray-600">Learn from an experienced psychology professional</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg-blue-600 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-6xl">👨‍🏫</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Dr. Priya Sharma</h3>
                    <p className="text-blue-100">Head of Psychology</p>
                  </div>
                </div>
                <div className="md:col-span-2 p-8">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full">Lead Lecturer</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">About Dr. Priya Sharma</h3>
                  <p className="text-gray-600 mb-3">
                    Dr. Priya Sharma is a renowned psychologist with over 12 years of experience 
                    in clinical practice and academic teaching. She holds a Ph.D. in Clinical 
                    Psychology and has previously taught at several prestigious institutions.
                  </p>
                  <p className="text-gray-600 mb-4">
                    As the lead lecturer for our Diploma in Psychology program, Dr. Sharma brings 
                    her extensive knowledge, practical insights, and passion for teaching to every 
                    session. She is committed to helping each student develop a deep understanding 
                    of psychological concepts and their real-world applications.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Ph.D. Clinical Psychology</span>
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">12+ Years Experience</span>
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Published Author</span>
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Certified Therapist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Study With Us?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Focused Learning</h3>
              <p className="text-gray-600">One lecturer, one program - complete attention to your learning journey</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern LMS Platform</h3>
              <p className="text-gray-600">Access all materials, videos, and assignments online anytime</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Recognized Diploma</h3>
              <p className="text-gray-600">Earn a valuable diploma certificate upon successful completion</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;