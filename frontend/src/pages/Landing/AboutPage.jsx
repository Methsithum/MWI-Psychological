import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import lecturerImage from "../../assets/lectimg.jpeg";

const AboutPage = () => {
  const qualifications = [
    "BA (Hons) Psychology – University of Kelaniya",
    "MPhil Psychology (Reading) – University of Peradeniya",
    "Diploma in Counselling – University of Kelaniya",
    "Diploma in Psychology & Counselling",
    "Diploma in Ayurvedic Panchakarma & Therapy",
    "Diploma in HRM",
    "Diploma in English & British English"
  ];

  const experienceAreas = [
    "Psychology Education",
    "Counselling & Guidance",
    "Behavioural Psychology",
    "Emotional Wellbeing",
    "HRM & Workplace Psychology",
    "Mindfulness Training"
  ];

  const whyChoose = [
    {
      icon: "🎯",
      title: "Focused Learning",
      description: "Direct lecturer guidance and structured learning",
    },
    {
      icon: "💻",
      title: "Online Education",
      description: "Learn anytime from anywhere with flexible schedules",
    },
    {
      icon: "🎓",
      title: "Professional Diploma",
      description: "Industry-relevant certification recognized widely",
    }
  ];

  return (
    <div className="min-h-screen bg-[#FCFAF5]">
      <Navbar />

      {/* Hero Section - Mobile Responsive */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#0B1F3A]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-56 h-56 md:w-96 md:h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#D4AF37]/15 rounded-full mb-4 md:mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
            <span className="text-xs md:text-sm font-medium text-[#D4AF37] tracking-wide">ABOUT US</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-5 leading-tight">
            About{' '}
            <span className="text-[#D4AF37] relative inline-block">
              PWI Psychological
              <svg className="absolute bottom-0 left-0 w-full h-2 md:h-3 text-[#D4AF37]/40" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5 T 200 5" stroke="currentColor" fill="none" strokeWidth="2"/>
              </svg>
            </span>
          </h1>
          
          <p className="text-sm md:text-lg text-[#D1D8E0] max-w-2xl mx-auto px-4">
            Your trusted partner in psychological education and professional development
          </p>
        </div>
      </section>

      {/* Our Story Section - Mobile Responsive */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1 order-2 lg:order-1">
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Our Story</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B1F3A] mt-2 md:mt-3 mb-3 md:mb-5">
                Newly Established Psychological Institute
              </h2>
              <div className="w-12 h-0.5 bg-[#D4AF37] mb-4 md:mb-6"></div>
              
              <p className="text-sm md:text-base text-[#5A6A7A] leading-relaxed mb-3 md:mb-4">
                PWI Psychological is a newly launched educational institute
                dedicated to psychology, counselling, HRM, and behavioral development.
              </p>

              <p className="text-sm md:text-base text-[#5A6A7A] leading-relaxed mb-3 md:mb-4">
                Our mission is to provide practical, affordable, and high-quality
                psychological education for students and professionals.
              </p>

              <p className="text-sm md:text-base text-[#5A6A7A] leading-relaxed">
                We combine modern teaching methods with real-world psychological practice
                to create impactful learning experiences.
              </p>

              <div className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs md:text-sm text-[#5A6A7A]">Quality Education</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs md:text-sm text-[#5A6A7A]">Expert Faculty</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs md:text-sm text-[#5A6A7A]">Flexible Learning</span>
                </div>
              </div>
            </div>

            <div className="flex-1 order-1 lg:order-2 w-full">
              <div className="relative">
                <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-20 h-20 md:w-24 md:h-24 bg-[#D4AF37]/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-24 h-24 md:w-32 md:h-32 bg-[#0B1F3A]/10 rounded-full blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-[#0B1F3A] to-[#1A3A5A] rounded-2xl md:rounded-3xl p-6 md:p-8 text-center shadow-2xl border border-[#D4AF37]/20">
                  <div className="text-5xl md:text-7xl mb-3 md:mb-4">🎓</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">First Batch Open</h3>
                  <p className="text-sm md:text-base text-[#D1D8E0] mb-3 md:mb-4">Join our pioneering batch of psychology learners</p>
                  <div className="inline-block px-3 py-1 md:px-4 md:py-2 bg-[#D4AF37]/20 rounded-full">
                    <span className="text-[#D4AF37] text-xs md:text-sm font-semibold">Limited Seats Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lecturer Section - Completely Redesigned */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F8F4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Meet Your Mentor</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B1F3A] mt-2 md:mt-3">
              Lecturer & Founder
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-3 md:mt-4"></div>
          </div>

          {/* Horizontal Card Design */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/10">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-2/5 relative">
                <div 
                  className="h-80 md:h-96 lg:h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${lecturerImage}` }}
                >
                  <div className="absolute inset-0 "></div>
                </div>
                
                {/* Name Badge - Mobile */}
                <div className="absolute bottom-4 left-4 right-4 lg:hidden">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-[#D4AF37]/20">
                    <h3 className="text-lg font-bold text-[#0B1F3A]">K.M. Imasha Isurunee</h3>
                    <p className="text-[#D4AF37] text-xs mt-0.5">Psychologist | Lecturer | Counsellor</p>
                    <p className="text-gray-500 text-xs mt-0.5">ඉසුරුණී මුදලිගේ</p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-3/5 p-5 md:p-6 lg:p-8">
                {/* Name - Desktop only */}
                <div className="hidden lg:block mb-5">
                  <h3 className="text-2xl font-bold text-[#0B1F3A]">K.M. Imasha Isurunee</h3>
                  <p className="text-[#D4AF37] text-sm mt-1">Psychologist | Lecturer | Counsellor | Ayurvedic Therapist</p>
                  <p className="text-gray-500 text-sm mt-1">ඉසුරුණී මුදලිගේ</p>
                  <div className="w-12 h-0.5 bg-[#D4AF37] mt-3"></div>
                </div>

                <p className="text-sm md:text-base text-[#5A6A7A] leading-relaxed mb-5 md:mb-6">
                  K.M. Imasha Isurunee is a psychology lecturer, counsellor, and
                  behavioural psychology educator specializing in emotional wellbeing,
                  counselling, mindfulness, and human behaviour studies.
                </p>

                {/* Qualifications - Accordion Style Cards */}
                <div className="mb-5 md:mb-6">
                  <h4 className="text-base md:text-lg font-bold text-[#0B1F3A] mb-3 flex items-center gap-2">
                    <span className="text-[#D4AF37] text-lg">📚</span>
                    Educational Qualifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {qualifications.map((qual, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs md:text-sm text-[#5A6A7A] bg-[#F8F4EC] p-2 rounded-lg">
                        <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#D4AF37] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{qual}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Tags */}
                <div className="mb-5 md:mb-6">
                  <h4 className="text-base md:text-lg font-bold text-[#0B1F3A] mb-3 flex items-center gap-2">
                    <span className="text-[#D4AF37] text-lg">💼</span>
                    Professional Experience
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experienceAreas.map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] text-white rounded-full text-xs md:text-sm shadow-md"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#F5E6A8]/20 rounded-xl p-4 border border-[#D4AF37]/20">
                  <h4 className="font-bold text-[#0B1F3A] mb-2 text-sm md:text-base flex items-center gap-2">
                    <span>📞</span>
                    Contact Information
                  </h4>
                  <div className="space-y-1.5">
                    <p className="text-[#5A6A7A] text-xs md:text-sm flex items-center gap-2 break-all">
                      <span>📧</span> psychologicalinstitute351@gmail.com
                    </p>
                    <p className="text-[#5A6A7A] text-xs md:text-sm flex items-center gap-2">
                      <span>📞</span> 076 885 6172 (WhatsApp & Registration)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Mobile Responsive */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Why Choose Us</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B1F3A] mt-2 md:mt-3">
              Reasons to Trust PWI
            </h2>
            <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-3 md:mt-4"></div>
            <p className="text-sm md:text-base text-[#5A6A7A] max-w-2xl mx-auto mt-3 md:mt-4 px-4">
              We provide everything you need for a successful learning journey
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {whyChoose.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl md:rounded-2xl p-5 md:p-8 text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-[#0B1F3A]/5 hover:border-[#D4AF37]/30"
              >
                <div className="w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br from-[#D4AF37]/10 to-[#E7CFA0]/20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-5 group-hover:scale-110 transition-transform">
                  <span className="text-3xl md:text-4xl">{item.icon}</span>
                </div>
                <h3 className="text-base md:text-xl font-bold text-[#0B1F3A] mb-1 md:mb-3">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#6B7A8A] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Responsive */}
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
              Ready to Start Your Journey?
            </h2>
            <p className="text-sm md:text-base text-[#D1D8E0] mb-5 md:mb-8">
              Join our upcoming batch and begin your psychology education today
            </p>
            <Link to="/register">
              <button className="inline-flex items-center gap-2 px-5 md:px-8 py-2 md:py-3 bg-[#D4AF37] text-[#0B1F3A] rounded-full font-bold text-sm md:text-base hover:bg-[#C49B2C] hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                Enroll Now
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;