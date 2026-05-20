import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import api from '../../utils/api';

const Coursepage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getAvailableCourses();
        const list = Array.isArray(data) ? data : data.courses || [];
        if (list.length) {
          setCourses(
            list.map((c, idx) => ({
              _id: c._id || c.id || idx,
              title: c.title || c.name || 'Course',
              shortTitle: c.shortTitle || c.title || 'Course',
              icon: c.icon || '🎓',
              color: c.color || 'from-[#0B1F3A] to-[#1A3A5A]',
              badge: c.badge || c.type || 'Professional Program',
              duration: c.duration || '06 Months',
              mode: c.mode || 'Online Learning',
              medium: c.medium || 'Sinhala',
              about: c.shortDesc || c.description || c.about || 'Course description coming soon',
              whatYouLearn: c.whatYouLearn || c.outcomes || [],
              courseContent: c.courseContent || c.syllabus || [],
              suitableFor: c.suitableFor || [],
              benefits: c.benefits || [],
              learningMethods: c.learningMethods || [],
            }))
          );
        } else {
          // fallback default courses
          setCourses([
            {
              _id: 'hrm',
              title: 'Diploma in HRM & Behavioral Psychology',
              shortTitle: 'HRM & Behavioral Psychology',
              icon: '👥',
              color: 'from-[#0B1F3A] to-[#1A3A5A]',
              badge: 'Professional Program',
              duration: '06 Months',
              mode: 'Online Learning',
              medium: 'Sinhala',
              about:
                'Practical and professional knowledge in Human Resource Management, workplace psychology, employee behaviour, leadership, and organizational development.',
              whatYouLearn: [],
              courseContent: [],
              suitableFor: [],
              benefits: [],
              learningMethods: [],
            },
            {
              _id: 'buddhist',
              title: 'Diploma in Buddhist Counselling & Applied Buddhist Psychology',
              shortTitle: 'Buddhist Counselling',
              icon: '🧘',
              color: 'from-[#D4AF37] to-[#C49B2C]',
              badge: 'Holistic Program',
              duration: '06 Months',
              mode: 'Online Learning',
              medium: 'Sinhala',
              about:
                'Buddhist philosophy, mindfulness practices, counselling techniques, and psychological understanding for personal and professional development.',
              whatYouLearn: [],
              courseContent: [],
              suitableFor: [],
              benefits: [],
              learningMethods: [],
            },
          ]);
        }
      } catch (err) {
        console.error('Failed to fetch courses', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const currentCourse = courses[activeTab] || {};

  return (
    <div className="min-h-screen bg-[#FCFAF5]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#0B1F3A]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-56 h-56 md:w-96 md:h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#D4AF37]/15 rounded-full mb-4 md:mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
              <span className="text-xs md:text-sm font-medium text-[#D4AF37] tracking-wide">OUR PROGRAMS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-5 leading-tight">
              Professional <span className="text-[#D4AF37] relative inline-block">Diploma Programs</span>
            </h1>

            <p className="text-sm md:text-lg text-[#D1D8E0] max-w-2xl mx-auto">
              Choose your path to professional excellence
            </p>
          </div>

          {/* Course Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-6 md:mt-8">
            {courses.map((course, idx) => (
              <button
                key={course._id || idx}
                onClick={() => setActiveTab(idx)}
                className={`group flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-300 ${
                  activeTab === idx
                    ? 'bg-[#D4AF37] text-[#0B1F3A] shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                <span className="text-lg md:text-xl">{course.icon}</span>
                <span className="text-sm md:text-base font-medium">{course.shortTitle}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Course Header Card */}
          <div className={`bg-linear-to-r ${currentCourse.color} rounded-2xl md:rounded-3xl p-6 md:p-10 text-white mb-8 md:mb-12 shadow-2xl`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs md:text-sm mb-3">
                  <span>{currentCourse.icon}</span>
                  <span>{currentCourse.badge}</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{currentCourse.title}</h2>
                <p className="text-white/80 text-sm md:text-base mt-3 max-w-2xl">{currentCourse.about}</p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <span className="text-2xl md:text-3xl font-bold">{currentCourse.duration}</span>
                  <span className="text-xs md:text-sm block">Duration</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2 space-y-8 md:space-y-10">
              {/* About Programme */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#D4AF37]/10">
                <h3 className="text-xl md:text-2xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#D4AF37] rounded-full"></span>
                  About the Programme
                </h3>
                <p className="text-[#5A6A7A] leading-relaxed text-sm md:text-base">{currentCourse.about}</p>
              </div>

              {/* What Students Will Learn */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#D4AF37]/10">
                <h3 className="text-xl md:text-2xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#D4AF37] rounded-full"></span>
                  What Students Will Learn
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {(currentCourse.whatYouLearn || []).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm md:text-base text-[#5A6A7A] p-2 rounded-lg hover:bg-[#F8F4EC] transition">
                      <svg className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="line-clamp-2">{String(item).split(' - ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#D4AF37]/10">
                <h3 className="text-xl md:text-2xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#D4AF37] rounded-full"></span>
                  Course Content
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {(currentCourse.courseContent || []).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm md:text-base text-[#5A6A7A] p-1.5">
                      <span className="text-[#D4AF37] text-sm md:text-base">•</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#D4AF37]/10">
                <h3 className="text-xl md:text-2xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#D4AF37] rounded-full"></span>
                  Benefits of the Programme
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(currentCourse.benefits || []).map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm md:text-base text-[#5A6A7A] p-2 rounded-lg hover:bg-[#F8F4EC] transition">
                      <span className="text-[#D4AF37] text-lg">✓</span>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Right Side - Fixed Position */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6 md:space-y-8">
                {/* Program Details Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#D4AF37]/10">
                  <h3 className="text-lg md:text-xl font-bold text-[#0B1F3A] mb-4 pb-2 border-b border-[#D4AF37]/20">Program Details</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#5A6A7A] text-sm">🎓 Duration</span>
                      <span className="font-semibold text-[#0B1F3A] text-sm">{currentCourse.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#5A6A7A] text-sm">💻 Mode of Study</span>
                      <span className="font-semibold text-[#0B1F3A] text-sm">{currentCourse.mode}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#5A6A7A] text-sm">🗣️ Medium</span>
                      <span className="font-semibold text-[#0B1F3A] text-sm">{currentCourse.medium}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D4AF37]/20">
                    <h4 className="font-bold text-[#0B1F3A] mb-3 text-sm">Learning Methods</h4>
                    <div className="flex flex-wrap gap-2">
                      {(currentCourse.learningMethods || []).map((method, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#D4AF37]/10 rounded-full text-xs text-[#0B1F3A]">{method}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D4AF37]/20">
                    <h4 className="font-bold text-[#0B1F3A] mb-3 text-sm">Suitable For</h4>
                    <div className="flex flex-wrap gap-2">
                      {(currentCourse.suitableFor || []).map((suitable, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#F8F4EC] rounded-full text-xs text-[#5A6A7A]">{suitable}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link to={`/register`}>
                      <button className="w-full px-6 py-3 bg-[#D4AF37] text-[#0B1F3A] rounded-full font-semibold">Apply for Admission</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Coursepage;
