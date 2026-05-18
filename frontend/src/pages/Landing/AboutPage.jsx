import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import lecturerImage from "../../assets/lectimg.jpeg";
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      <Navbar />

      {/* HERO */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-[#0B1F3A] to-[#08162A]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About PWI Psychological
          </h1>
          <p className="text-xl text-[#E5E7EB]">
            Your trusted partner in psychological education
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#D4AF37] font-semibold">Our Story</span>

            <h2 className="text-3xl font-bold text-[#0B1F3A] mt-2 mb-4">
              Newly Established Psychological Institute
            </h2>

            <p className="text-gray-700 mb-4 leading-relaxed">
              PWI Psychological is a newly launched educational institute
              dedicated to psychology, counselling, HRM, and behavioral
              development.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Our mission is to provide practical, affordable, and high-quality
              psychological education for students and professionals.
            </p>

            <p className="text-gray-700 leading-relaxed">
              We combine modern teaching methods with real-world psychological
              practice.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-[#D4AF37]/20">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-[#0B1F3A] mb-2">
              First Batch Open
            </h3>
            <p className="text-gray-600">
              Join our pioneering batch of psychology learners
            </p>
          </div>
        </div>
      </section>

      {/* LECTURER SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A]">
              Meet Your Lecturer & Founder
            </h2>
          </div>

          <div className="grid md:grid-cols-3 bg-[#F8F5EF] rounded-3xl shadow-xl overflow-hidden">
            {/* IMAGE SIDE */}

            {/* IMAGE SIDE (FULL CLEAR IMAGE - NO BLUR) */}
            <div
              className="relative bg-cover bg-center flex flex-col items-center justify-end p-6 min-h-[520px]"
              style={{ backgroundImage: `url(${lecturerImage})` }}
            >
              {/* LIGHT OVERLAY ONLY (very subtle for readability) */}
              <div className="absolute inset-0 bg-black/20"></div>

              {/* TEXT AT BOTTOM */}
              <div className="relative z-10 text-center bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-[#0B1F3A]">
                  K.M. Imasha Isurunee
                </h3>

                <p className="text-[#0B1F3A] text-sm mt-1">
                  Psychologist | Lecturer | Counsellor | Ayurvedic Therapist
                </p>

                <p className="text-gray-700 text-sm mt-1">ඉසුරුණී මුදලිගේ</p>
              </div>
            </div>
            {/* DETAILS */}
            <div className="md:col-span-2 p-8">
              <h4 className="text-2xl font-bold text-[#0B1F3A] mb-4">
                Professional Profile
              </h4>

              <p className="text-gray-700 mb-6 leading-relaxed">
                K.M. Imasha Isurunee is a psychology lecturer, counsellor, and
                behavioural psychology educator specializing in emotional
                wellbeing, counselling, mindfulness, and human behaviour
                studies.
              </p>

              {/* QUALIFICATIONS */}
              <h5 className="text-xl font-semibold text-[#0B1F3A] mb-3">
                Educational Qualifications
              </h5>

              <ul className="grid md:grid-cols-2 gap-2 text-gray-700 mb-6">
                <li>• BA (Hons) Psychology – University of Kelaniya</li>
                <li>• MPhil Psychology (Reading) – University of Peradeniya</li>
                <li>• Diploma in Counselling – University of Kelaniya</li>
                <li>• Diploma in Psychology & Counselling</li>
                <li>• Diploma in Ayurvedic Panchakarma & Therapy</li>
                <li>• Diploma in HRM</li>
                <li>• Diploma in English & British English</li>
              </ul>

              {/* EXPERIENCE */}
              <h5 className="text-xl font-semibold text-[#0B1F3A] mb-3">
                Professional Experience
              </h5>

              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  "Psychology Education",
                  "Counselling & Guidance",
                  "Behavioural Psychology",
                  "Emotional Wellbeing",
                  "HRM & Workplace Psychology",
                  "Mindfulness Training",
                ].map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#0B1F3A] text-white rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* CONTACT */}
              <div className="bg-[#F5E6A8]/30 p-4 rounded-xl border border-[#D4AF37]/30">
                <h5 className="font-semibold text-[#0B1F3A] mb-2">
                  Contact Information
                </h5>

                <p className="text-gray-700">
                  📧 psychologicalinstitute351@gmal.com
                </p>

                <p className="text-gray-700">
                  📞 076 885 6172 (WhatsApp & Registration)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1F3A]">Why Choose Us</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Focused Learning",
                desc: "Direct lecturer guidance and structured learning",
              },
              {
                icon: "💻",
                title: "Online Education",
                desc: "Learn anytime from anywhere",
              },
              {
                icon: "🎓",
                title: "Professional Diploma",
                desc: "Industry-relevant certification",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-6 bg-white rounded-xl shadow-md"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#0B1F3A] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
