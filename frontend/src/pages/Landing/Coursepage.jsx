import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaGraduationCap, FaLaptopCode, FaLanguage, FaClock, FaDollarSign, FaUserGraduate, FaBookOpen, FaCheckCircle, FaQuestionCircle, FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineSchool, MdOutlineVideoLibrary, MdDescription, MdGroups, MdLightbulb, MdAttachMoney } from 'react-icons/md';
import { GiBrain, GiMeditation, GiHeartPlus } from 'react-icons/gi';
import { RiMentalHealthLine, RiTeamLine, RiCustomerServiceLine } from 'react-icons/ri';
import { BiHelpCircle, BiCalendar, BiChat } from 'react-icons/bi';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const Coursepage = () => {
  const [activeCourse, setActiveCourse] = useState(0);
  const [activeDuration, setActiveDuration] = useState(0);

  const courses = [
    {
      id: 'hrm',
      title: 'Diploma in HRM & Behavioral Psychology',
      shortTitle: 'HRM & Behavioral Psychology',
      icon: <FaUserGraduate className="text-xl md:text-2xl" />,
      color: 'from-[#0B1F3A] to-[#1A3A5A]',
      badge: 'Professional Program',
      hasMultipleDurations: true,
      durations: [
        {
          id: '6months',
          name: '6 Months',
          duration: '06 Months',
          fee: 'Rs. 13,000',
          installment: 'One-time payment or 2 installments',
          about: `The Diploma in HRM & Behavioral Psychology (6 Months) is a comprehensive program designed to provide practical and professional knowledge in Human Resource Management, workplace psychology, employee behaviour, leadership, and organizational development. This programme combines HR management principles with psychological understanding to help students develop both managerial and interpersonal skills required in modern workplaces.`,
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
            "Sinhala & English Medium",
          ],
        },
        {
          id: '3months',
          name: '3 Months (Top Up)',
          duration: '03 Months',
          fee: 'Rs. 15,000',
          installment: 'One-time payment',
          about: `The Diploma in HRM & Behavioral Psychology (3 Months Top Up) is an intensive program designed for those who already have basic HR knowledge or want to complete the course quickly. This accelerated program covers all essential topics of HRM and behavioral psychology in a condensed timeframe, focusing on practical applications and real-world scenarios.`,
          whatYouLearn: [
            "HRM Fundamentals & Recruitment - Core HR concepts and hiring processes",
            "Employee Behaviour & Motivation - Understanding workplace psychology and motivation theories",
            "Leadership & Communication - Essential leadership skills and professional communication",
            "Emotional Intelligence & Stress Management - Managing emotions and workplace stress",
            "Organizational Psychology - Team dynamics and organizational culture",
            "Career Development - CV writing, interview skills, and professional growth",
          ],
          courseContent: [
            "Introduction to HRM",
            "Employee Behaviour & Psychology",
            "Leadership & Team Management",
            "Communication & Interpersonal Skills",
            "Emotional Intelligence",
            "Workplace Stress Management",
            "Recruitment & Selection",
            "Organizational Psychology",
            "Basic Counselling Skills",
            "Career Development & Interview Skills",
          ],
          suitableFor: [
            "Working professionals",
            "Busy individuals",
            "Career changers",
            "Entrepreneurs",
            "Managers seeking quick upskilling",
          ],
          benefits: [
            "Complete in just 3 months",
            "Flexible schedule for working professionals",
            "Practical, job-ready skills",
            "Recognized diploma certificate",
            "Career advancement opportunities",
          ],
          learningMethods: [
            "Zoom Live Lectures (Weekend batches)",
            "Lecture Recordings",
            "PDF Notes",
            "Online Learning Support",
            "Sinhala",
          ],
        },
      ],
    },
    {
      id: 'buddhist',
      title: 'Diploma in Buddhist Counselling & Applied Buddhist Psychology',
      shortTitle: 'Buddhist Counselling',
      icon: <GiMeditation className="text-xl md:text-2xl" />,
      color: 'from-[#D4AF37] to-[#C49B2C]',
      badge: 'Holistic Program',
      hasMultipleDurations: false,
      duration: {
        id: '6months',
        name: '6 Months',
        duration: '06 Months',
        fee: 'Rs. 30,000',
        installment: 'One-time payment or 2 installments',
        about: `The Diploma in Buddhist Counselling & Applied Buddhist Psychology is designed to combine Buddhist philosophy, mindfulness practices, counselling techniques, and psychological understanding for personal and professional development. The programme focuses on emotional wellbeing, behavioural understanding, counselling communication, mindfulness, and Buddhist approaches to mental health.`,
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
          "Sinhala",
        ],
      },
    },
  ];

  const currentCourse = courses[activeCourse];
  const currentDuration = currentCourse.hasMultipleDurations 
    ? currentCourse.durations[activeDuration] 
    : currentCourse.duration;

  // WhatsApp contact number
  const whatsappNumber = "94768856172"; // 076 885 6172
  const whatsappMessage = "Hello! I'm interested in the " + currentCourse.title + " (" + currentDuration.name + ") program. I would like to get more information.";

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

          {/* Course Tabs - Main Courses */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-6 md:mt-8">
            {courses.map((course, idx) => (
              <button
                key={course.id}
                onClick={() => {
                  setActiveCourse(idx);
                  setActiveDuration(0);
                }}
                className={`group flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-300 ${
                  activeCourse === idx
                    ? 'bg-[#D4AF37] text-[#0B1F3A] shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                <span className="text-lg md:text-xl">{course.icon}</span>
                <span className="text-sm md:text-base font-medium">{course.shortTitle}</span>
              </button>
            ))}
          </div>

          {/* Duration Tabs - Only show for HRM course */}
          {currentCourse.hasMultipleDurations && (
            <div className="flex flex-row justify-center gap-3 md:gap-4 mt-6">
              {currentCourse.durations.map((duration, idx) => (
                <button
                  key={duration.id}
                  onClick={() => setActiveDuration(idx)}
                  className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                    activeDuration === idx
                      ? 'bg-[#D4AF37] text-[#0B1F3A] font-semibold shadow-md'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {duration.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Course Header Card */}
          <div className={`bg-gradient-to-r ${currentCourse.color} rounded-2xl md:rounded-3xl p-6 md:p-10 text-white mb-8 md:mb-12 shadow-2xl`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs md:text-sm mb-3">
                  <span className="text-lg">{currentCourse.icon}</span>
                  <span>{currentCourse.badge}</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{currentCourse.title}</h2>
                <p className="text-white/80 text-sm md:text-base mt-3 max-w-2xl">{currentDuration.about.substring(0, 200)}...</p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <FaClock className="text-2xl md:text-3xl mx-auto mb-1" />
                  <span className="text-lg md:text-xl font-bold">{currentDuration.duration}</span>
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
                  <MdOutlineSchool className="text-[#D4AF37]" />
                  About the Programme
                </h3>
                <p className="text-[#5A6A7A] leading-relaxed text-sm md:text-base">{currentDuration.about}</p>
              </div>

              {/* What Students Will Learn */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#D4AF37]/10">
                <h3 className="text-xl md:text-2xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#D4AF37] rounded-full"></span>
                  <GiBrain className="text-[#D4AF37]" />
                  What Students Will Learn
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {(currentDuration.whatYouLearn || []).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm md:text-base text-[#5A6A7A] p-2 rounded-lg hover:bg-[#F8F4EC] transition">
                      <FaCheckCircle className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                      <span className="line-clamp-2">{String(item).split(' - ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#D4AF37]/10">
                <h3 className="text-xl md:text-2xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#D4AF37] rounded-full"></span>
                  <FaBookOpen className="text-[#D4AF37]" />
                  Course Content
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {(currentDuration.courseContent || []).map((item, idx) => (
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
                  <MdLightbulb className="text-[#D4AF37]" />
                  Benefits of the Programme
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(currentDuration.benefits || []).map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm md:text-base text-[#5A6A7A] p-2 rounded-lg hover:bg-[#F8F4EC] transition">
                      <GiHeartPlus className="text-[#D4AF37] text-lg" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Right Side */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6 md:space-y-8">
                {/* Program Details Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#D4AF37]/10">
                  <h3 className="text-lg md:text-xl font-bold text-[#0B1F3A] mb-4 pb-2 border-b border-[#D4AF37]/20 flex items-center gap-2">
                    <BiCalendar className="text-[#D4AF37]" />
                    Program Details
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#5A6A7A] text-sm flex items-center gap-2"><FaGraduationCap /> Duration</span>
                      <span className="font-semibold text-[#0B1F3A] text-sm">{currentDuration.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#5A6A7A] text-sm flex items-center gap-2"><FaLaptopCode /> Mode</span>
                      <span className="font-semibold text-[#0B1F3A] text-sm">Online Learning</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#5A6A7A] text-sm flex items-center gap-2"><FaLanguage /> Medium</span>
                      <span className="font-semibold text-[#0B1F3A] text-sm">Sinhala</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D4AF37]/20">
                    <h4 className="font-bold text-[#0B1F3A] mb-3 text-sm flex items-center gap-2"><MdOutlineVideoLibrary /> Learning Methods</h4>
                    <div className="flex flex-wrap gap-2">
                      {(currentDuration.learningMethods || []).map((method, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#D4AF37]/10 rounded-full text-xs text-[#0B1F3A]">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D4AF37]/20">
                    <h4 className="font-bold text-[#0B1F3A] mb-3 text-sm flex items-center gap-2"><MdGroups /> Suitable For</h4>
                    <div className="flex flex-wrap gap-2">
                      {(currentDuration.suitableFor || []).map((suitable, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#F8F4EC] rounded-full text-xs text-[#5A6A7A]">
                          {suitable}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link to="/register">
                      <button className="w-full py-3 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-semibold hover:bg-[#C49B2C] transition-all duration-300 flex items-center justify-center gap-2">
                        <MdAttachMoney /> Apply for Admission
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Fee Information Card */}
                <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] rounded-2xl p-6 text-white">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2"><FaDollarSign className="text-[#D4AF37]" /> Course Fee</h4>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-[#D4AF37]">{currentDuration.fee}</p>
                    <p className="text-white/70 text-sm">{currentDuration.installment}</p>
                    <p className="text-white/50 text-xs mt-2">
                      * Registration fee: Rs. 1,500
                    </p>
                  </div>
                </div>

                {/* WhatsApp Contact Card */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2"><FaWhatsapp className="text-white" /> Connect on WhatsApp</h4>
                  <p className="text-white/80 text-sm mb-4">
                    Have questions? Chat with our admission team directly on WhatsApp.
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 text-center flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp className="text-xl" />
                    Chat on WhatsApp
                  </a>
                  <p className="text-white/60 text-xs mt-3 text-center">
                    Click to start conversation
                  </p>
                </div>

                {/* Contact Card */}
                <div className="bg-[#F8F4EC] rounded-2xl p-6 border border-[#D4AF37]/20">
                  <h4 className="font-bold text-[#0B1F3A] mb-3 flex items-center gap-2"><RiCustomerServiceLine className="text-[#D4AF37]" /> Need Help?</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Contact our admission team for any questions about the program.
                  </p>
                  <div className="space-y-3 text-sm">
                    <a href="mailto:psychologicalinstitute351@gmail.com" className="flex items-center gap-2 break-all hover:text-[#D4AF37] transition">
                      <FaEnvelope className="text-[#D4AF37]" />
                      <span>psychologicalinstitute351@gmail.com</span>
                    </a>
                    <a href="tel:+94768856172" className="flex items-center gap-2 hover:text-[#D4AF37] transition">
                      <FaPhoneAlt className="text-[#D4AF37]" />
                      <span>076 885 6172</span>
                    </a>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-600 transition">
                      <FaWhatsapp className="text-green-600" />
                      <span>076 885 6172 (WhatsApp)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 group"
      >
        <FaWhatsapp className="text-2xl" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Chat with us
        </span>
      </a>

      <Footer />
    </div>
  );
};

export default Coursepage;