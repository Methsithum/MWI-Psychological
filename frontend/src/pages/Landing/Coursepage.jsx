import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const Coursepage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const courses = [
    {
      id: 0,
      title: "Diploma in HRM & Behavioral Psychology",
      shortTitle: "HRM & Behavioral Psychology",
      icon: "👥",
      color: "from-[#0B1F3A] to-[#1A3A5A]",
      badge: "Professional Program",
      duration: "06 Months",
      mode: "Online Learning",
      medium: "Sinhala",
      about:
        "The Diploma in HRM & Behavioral Psychology is designed to provide practical and professional knowledge in Human Resource Management, workplace psychology, employee behaviour, leadership, and organizational development. This programme combines HR management principles with psychological understanding to help students develop both managerial and interpersonal skills required in modern workplaces.",
      whatYouLearn: [
        "Human Resource Management Fundamentals - Introduction to HRM, employee management, organizational structure, and HR responsibilities",
        "Recruitment & Selection - Employee hiring process, interviews, candidate selection, and recruitment strategies",
        "Employee Behaviour - Understanding employee attitudes, motivation, personality, emotions, and workplace behaviour",
        "Organizational Psychology - Psychological principles related to workplace productivity, teamwork, leadership, and organizational culture",
        "Leadership & Team Management - Developing leadership qualities, decision-making skills, team coordination, and conflict management",
        "Communication Skills - Professional communication, workplace interaction, presentation skills, and interpersonal communication",
        "Emotional Intelligence - Managing emotions, self-awareness, empathy, and emotional control in professional environments",
        "Workplace Stress Management - Understanding stress, burnout, employee wellbeing, and psychological health in workplaces",
        "Basic Counselling Skills - Introduction to listening skills, guidance techniques, and supportive communication methods",
        "Career Development Skills - CV preparation, interview preparation, professional ethics, and career planning",
      ],
      courseContent: [
        "Human Resource Management",
        "Organizational Psychology",
        "Employee Behaviour",
        "Motivation & Leadership",
        "Recruitment & Selection",
        "Communication Skills",
        "Teamwork & Conflict Management",
        "Performance Management",
        "Workplace Stress & Mental Health",
        "Basic Counselling Skills",
        "Personality & Emotional Intelligence",
        "CV, Interview & Career Development Skills",
        "Professional Development Skills",
        "Workplace Ethics & Employee Relations",
        "Decision Making & Problem Solving",
        "Time Management & Goal Setting",
      ],
      suitableFor: [
        "School leavers",
        "University students",
        "HR professionals",
        "Teachers & lecturers",
        "Counsellors",
        "Managers & supervisors",
        "Anyone interested in psychology and HRM",
      ],
      benefits: [
        "Develop professional HR knowledge",
        "Improve leadership and communication skills",
        "Understand workplace psychology",
        "Gain practical behavioural management knowledge",
        "Improve career opportunities and professional development",
      ],
      learningMethods: [
        "Zoom Live Lectures",
        "Lecture Recordings",
        "PDF Notes",
        "Online Learning Support",
        "Sinhala Medium",
      ],
      shortDesc:
        "This diploma programme focuses on Human Resource Management, workplace behaviour, organizational psychology, leadership, communication skills, and employee development. The course is designed to improve both professional and psychological understanding in workplace environments.",
    },
    {
      id: 1,
      title: "Diploma in Buddhist Counselling & Applied Buddhist Psychology",
      shortTitle: "Buddhist Counselling",
      icon: "🧘",
      color: "from-[#D4AF37] to-[#C49B2C]",
      badge: "Holistic Program",
      duration: "06 Months",
      mode: "Online Learning",
      medium: "Sinhala",
      about:
        "The Diploma in Buddhist Counselling & Applied Buddhist Psychology is designed to combine Buddhist philosophy, mindfulness practices, counselling techniques, and psychological understanding for personal and professional development. The programme focuses on emotional wellbeing, behavioural understanding, counselling communication, mindfulness, and Buddhist approaches to mental health.",
      whatYouLearn: [
        "Introduction to Psychology - Basic concepts of psychology, human behaviour, emotions, thinking patterns, and mental processes",
        "Buddhist Psychology - Understanding the mind according to Buddhist teachings, mental states, thoughts, emotions, and behavioural awareness",
        "Mindfulness Practices - Mindfulness techniques, self-awareness, concentration development, and emotional regulation practices",
        "Counselling Skills - Listening skills, communication methods, empathy, guidance techniques, and helping relationships",
        "Emotional Management - Understanding anger, stress, sadness, anxiety, and emotional balance through psychological and Buddhist approaches",
        "Positive Thinking & Mental Wellbeing - Developing healthy thinking patterns, self-confidence, inner peace, and emotional stability",
        "Family & Relationship Counselling - Understanding family relationships, communication problems, emotional conflicts, and supportive counselling approaches",
        "Personality & Human Behaviour - Personality development, behavioural patterns, emotional reactions, and individual differences",
        "Stress Management - Managing stress and mental pressure using mindfulness, meditation, and counselling techniques",
        "Applied Buddhist Counselling - Practical counselling methods based on Buddhist teachings and psychological understanding",
      ],
      courseContent: [
        "Introduction to Psychology",
        "Buddhist Psychology",
        "Buddhist Counselling Principles",
        "Applied Buddhist Psychology",
        "Mindfulness Practices",
        "Emotional Management",
        "Positive Thinking & Mental Wellbeing",
        "Counselling Communication Skills",
        "Stress Management through Buddhist Teachings",
        "Family & Relationship Counselling",
        "Personality & Human Behaviour",
        "Meditation & Self-Awareness",
        "Mental Health Awareness",
        "Listening & Helping Skills",
        "Compassion, Empathy & Human Values",
        "Personal Development & Inner Peace",
      ],
      suitableFor: [
        "Individuals interested in counselling",
        "Teachers & educators",
        "Religious and community workers",
        "University students",
        "Personal development seekers",
        "Anyone interested in Buddhist psychology",
      ],
      benefits: [
        "Improve counselling communication skills",
        "Develop mindfulness and emotional awareness",
        "Understand Buddhist psychological approaches",
        "Support personal and professional growth",
        "Improve understanding of human behaviour and emotions",
      ],
      learningMethods: [
        "Zoom Live Lectures",
        "Lecture Recordings",
        "PDF Notes",
        "Online Learning Support",
        "Sinhala Medium",
      ],
      shortDesc:
        "This diploma programme combines Buddhist philosophy, counselling techniques, mindfulness practices, and applied psychological knowledge to support personal growth, emotional wellbeing, and counselling communication skills.",
    },
  ];

  const currentCourse = courses[activeTab];

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
              <span className="text-xs md:text-sm font-medium text-[#D4AF37] tracking-wide">
                OUR PROGRAMS
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-5 leading-tight">
              Professional{" "}
              <span className="text-[#D4AF37] relative inline-block">
                Diploma Programs
                <svg
                  className="absolute bottom-0 left-0 w-full h-2 md:h-3 text-[#D4AF37]/40"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5 T 200 5"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-sm md:text-lg text-[#D1D8E0] max-w-2xl mx-auto">
              Choose your path to professional excellence
            </p>
          </div>

          {/* Course Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-6 md:mt-8">
            {courses.map((course, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`group flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-300 ${
                  activeTab === idx
                    ? "bg-[#D4AF37] text-[#0B1F3A] shadow-lg scale-105"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                <span className="text-lg md:text-xl">{course.icon}</span>
                <span className="text-sm md:text-base font-medium">
                  {course.shortTitle}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Course Header Card */}
          <div
            className={`bg-gradient-to-r ${currentCourse.color} rounded-2xl md:rounded-3xl p-6 md:p-10 text-white mb-8 md:mb-12 shadow-2xl`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs md:text-sm mb-3">
                  <span>{currentCourse.icon}</span>
                  <span>{currentCourse.badge}</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  {currentCourse.title}
                </h2>
                <p className="text-white/80 text-sm md:text-base mt-3 max-w-2xl">
                  {currentCourse.shortDesc}
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <span className="text-2xl md:text-3xl font-bold">
                    {currentCourse.duration}
                  </span>
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
                <p className="text-[#5A6A7A] leading-relaxed text-sm md:text-base">
                  {currentCourse.about}
                </p>
              </div>

              {/* What Students Will Learn */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#D4AF37]/10">
                <h3 className="text-xl md:text-2xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#D4AF37] rounded-full"></span>
                  What Students Will Learn
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {currentCourse.whatYouLearn.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm md:text-base text-[#5A6A7A] p-2 rounded-lg hover:bg-[#F8F4EC] transition"
                    >
                      <svg
                        className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="line-clamp-2">
                        {item.split(" - ")[0]}
                      </span>
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
                  {currentCourse.courseContent.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm md:text-base text-[#5A6A7A] p-1.5"
                    >
                      <span className="text-[#D4AF37] text-sm md:text-base">
                        •
                      </span>
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
                  {currentCourse.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm md:text-base text-[#5A6A7A] p-2 rounded-lg hover:bg-[#F8F4EC] transition"
                    >
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
                  <h3 className="text-lg md:text-xl font-bold text-[#0B1F3A] mb-4 pb-2 border-b border-[#D4AF37]/20">
                    Program Details
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#5A6A7A] text-sm">
                        🎓 Duration
                      </span>
                      <span className="font-semibold text-[#0B1F3A] text-sm">
                        {currentCourse.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#5A6A7A] text-sm">
                        💻 Mode of Study
                      </span>
                      <span className="font-semibold text-[#0B1F3A] text-sm">
                        {currentCourse.mode}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#5A6A7A] text-sm">🗣️ Medium</span>
                      <span className="font-semibold text-[#0B1F3A] text-sm">
                        {currentCourse.medium}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D4AF37]/20">
                    <h4 className="font-bold text-[#0B1F3A] mb-3 text-sm">
                      Learning Methods
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentCourse.learningMethods.map((method, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-[#D4AF37]/10 rounded-full text-xs text-[#0B1F3A]"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D4AF37]/20">
                    <h4 className="font-bold text-[#0B1F3A] mb-3 text-sm">
                      Suitable For
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentCourse.suitableFor.map((suitable, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-[#F8F4EC] rounded-full text-xs text-[#5A6A7A]"
                        >
                          {suitable}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link to="/register">
                      <button className="w-full py-3 bg-[#D4AF37] text-[#0B1F3A] rounded-full font-bold text-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                        Enroll Now
                      </button>
                    </Link>
                    <Link to="/how-to-apply">
                      <button className="w-full py-3 border-2 border-[#0B1F3A]/20 text-[#0B1F3A] rounded-full font-semibold text-sm hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 mt-4">
                        How to Apply
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Need Assistance Card - Separate Card Below */}
                <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xl">🎧</span>
                    </div>
                    <h4 className="font-bold text-lg">Need Assistance?</h4>
                  </div>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    Contact our admission team for any questions about the
                    program, application process, or payment options.
                  </p>
                  <div className="space-y-2 pt-3 border-t border-white/20">
                    <p className="text-sm flex items-center gap-2">
                      <span>📧</span>
                      <span className="break-all">
                        psychologicalinstitute351@gmail.com
                      </span>
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <span>📞</span>
                      <span>076 885 6172 (WhatsApp & Registration)</span>
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <span>⏰</span>
                      <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                    </p>
                  </div>
                  <Link to="/contact">
                    <button className="w-full mt-4 py-2.5 bg-white/20 rounded-full font-semibold text-sm hover:bg-white/30 transition-all duration-300">
                      Contact Support
                    </button>
                  </Link>
                </div>
              </div>
            </div>
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
              Ready to Begin Your Journey?
            </h2>
            <p className="text-sm md:text-base text-[#D1D8E0] mb-4 md:mb-6">
              Choose your program and start your professional development today
            </p>
            <Link to="/register">
              <button className="px-6 md:px-8 py-2.5 md:py-3 bg-[#D4AF37] text-[#0B1F3A] rounded-full font-bold text-sm md:text-base hover:bg-[#C49B2C] hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                Apply for Admission
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Coursepage;
