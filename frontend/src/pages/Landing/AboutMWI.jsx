import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBuilding, FaIdCard, FaCheckCircle, FaChalkboardTeacher, 
  FaUniversity, FaBookOpen, FaHandHoldingHeart, FaMapMarkerAlt,
  FaPhoneAlt, FaEnvelope, FaGlobe, FaAward, FaUsers,
  FaBrain, FaHeart, FaLeaf, FaStar, FaCertificate, FaEye,
  FaRegClock, FaShieldAlt, FaGraduationCap, FaLightbulb,
  FaQuoteLeft, FaArrowRight, FaTrophy, FaMedal, FaRibbon,
  FaTimes, FaExpand
} from 'react-icons/fa';
import { HiOutlineAcademicCap, HiOutlineGlobeAlt } from 'react-icons/hi';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import hrdaCertificate from '../../assets/hrda-certificate.jpeg';
import apaCertificate from '../../assets/apt.jpeg';
import isoCertificate from '../../assets/ayur.jpeg';
import ukCertificate from '../../assets/prof.jpeg';

const AboutMWI = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    { id: 'hrda', title: 'HRDA Certificate', icon: <FaBuilding />, image: hrdaCertificate, color: 'from-blue-600 to-cyan-600', desc: 'Human Resource Development Authority Registration' },
    { id: 'apa', title: 'APA Certificate', icon: <FaGlobe />, image: apaCertificate, color: 'from-purple-600 to-pink-600', desc: 'American Psychological Association Affiliation' },
    { id: 'iso', title: 'Ayurvedic Certificate', icon: <FaMedal />, image: isoCertificate, color: 'from-green-600 to-emerald-600', desc: 'Ayurvedic Certified Institute' },
    { id: 'uk', title: 'Counsellors Accreditation', icon: <FaTrophy />, image: ukCertificate, color: 'from-orange-600 to-red-600', desc: 'UK Counsellors Accreditation' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-56 h-56 md:w-96 md:h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/15 rounded-full mb-6 backdrop-blur-sm">
              <HiOutlineAcademicCap className="text-[#D4AF37] text-lg" />
              <span className="text-sm md:text-base font-medium text-[#D4AF37] tracking-wide">MWI මනෝවිද්‍යාත්මක ආයතනය</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              About{' '}
              <span className="text-[#D4AF37] relative inline-block">
                මනෝවිද්‍යාත්මක ආයතනය
                <svg className="absolute bottom-0 left-0 w-full h-2 md:h-3 text-[#D4AF37]/40" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5 T 200 5" stroke="currentColor" fill="none" strokeWidth="2"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-sm md:text-lg text-[#D1D8E0] max-w-2xl mx-auto">
              Knowledge • Psychology • Counselling • Professional Growth
            </p>
          </div>
        </div>
      </section>

      {/* Certificates Gallery Section - BIG IMAGES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-4 py-1.5 rounded-full inline-block">Our Credentials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mt-4">
              Certificates & Accreditations
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 text-sm mt-3">Internationally recognized certifications and accreditations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificates.map((cert, idx) => (
              <div
                key={cert.id}
                className="group cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-2 bg-white">
                  {/* Big Image Container */}
                  <div className="relative h-80 md:h-96 overflow-hidden bg-gray-100">
                    <img 
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Expand Button */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 shadow-lg">
                      <FaExpand className="text-[#0B1F3A] text-sm" />
                    </div>
                    
                    {/* Hover Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${cert.color} rounded-xl flex items-center justify-center text-white text-lg`}>
                          {cert.icon}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{cert.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Certificate Title Bar */}
                  <div className="p-4 text-center border-t border-[#D4AF37]/10">
                    <div className="flex items-center justify-center gap-2">
                      <div className={`w-8 h-8 bg-gradient-to-br ${cert.color} rounded-lg flex items-center justify-center text-white text-sm`}>
                        {cert.icon}
                      </div>
                      <h3 className="font-bold text-[#0B1F3A] text-lg">{cert.title}</h3>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Click image to view full size</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-[#F8F4EC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "15+", label: "විශේෂිත පාඨමාලා", icon: <FaGraduationCap /> },
              { value: "270+", label: "සාර්ථක සිසුන්", icon: <FaUsers /> },
              { value: "100%", label: "මාර්ගගත පහසුකම්", icon: <HiOutlineGlobeAlt /> },
              { value: "24/7", label: "ශිෂ්ය සහාය", icon: <FaRegClock /> },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37]/20 to-[#E7CFA0]/30 rounded-full flex items-center justify-center mx-auto mb-3 text-[#D4AF37] text-2xl">
                  {stat.icon}
                </div>
                <p className="text-3xl md:text-4xl font-bold text-[#0B1F3A]">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About MWI Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* About MWI Section */}
        <div className="mb-16 bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/10">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mb-4">
                MWI මනෝවිද්‍යාත්මක ආයතනය
              </h2>
              <p className="text-gray-600 leading-relaxed text-base mb-4">
                 ශ්‍රී ලංකාවේ මානසික සුවතාවය, මනෝවිද්‍යාව, උපදේශනය, චර්යාත්මක අධ්‍යයනය සහ 
                වෘත්තීය සංවර්ධනය යන ක්ෂේත්‍රයන් ඔස්සේ ගුණාත්මක අධ්‍යාපනය සහ ප්‍රායෝගික 
                මඟපෙන්වීම ලබාදීමට කැපවූ වෘත්තීයමය අධ්‍යාපනික හා මනෝ උපදේශන ආයතනයකි.
              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                අප ආයතනයේ ප්‍රධාන අරමුණ වන්නේ ශ්‍රී ලංකාවේ තරුණ පරපුර, සේවා ක්ෂේත්‍රයේ නියුතු 
                පුද්ගලයින්, මනෝවිද්‍යාව පිළිබඳ උනන්දුවක් ඇති අය සඳහා නවීන හා ප්‍රායෝගික දැනුමක් ලබාදීමයි.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#0B1F3A] to-[#1A3A5A] p-6 md:p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <FaLeaf className="text-[#D4AF37] text-2xl" />
                <h3 className="text-xl font-bold">අපගේ මෙහෙවර</h3>
              </div>
              <p className="text-2xl font-light italic mb-6 leading-relaxed">
                “මානසික සුවතාවයෙන් සමාජය ශක්තිමත් කිරීම”
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                ගුණාත්මක අධ්‍යාපනය, වෘත්තීයමය උපදේශනය සහ මානව සංවේදීත්වය තුළින් 
                ශ්‍රී ලංකාවේ අනාගත පරපුරට දැනුම, විශ්වාසය සහ මනෝ ශක්තිය ලබාදීම අපගේ මෙහෙවරයි.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-4 py-1.5 rounded-full inline-block">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] mt-4">
              අප ආයතනයේ විශේෂත්වය
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FaBuilding />, title: "HRDA යටතේ ලියාපදිංචි", desc: "Human Resource Development Authority සහතිකය", color: "from-blue-600 to-cyan-600" },
              { icon: <FaUniversity />, title: "රජයේ විශ්වවිද්‍යාල උපාධිධාරී දේශක මණ්ඩලය", desc: "පළපුරුදු හා සුදුසුකම් ලත් දේශකවරු", color: "from-purple-600 to-pink-600" },
              { icon: <FaBookOpen />, title: "Zoom සජීවී දේශන", desc: "Lecture Recordings සහ PDF Notes පහසුකම්", color: "from-green-600 to-emerald-600" },
              { icon: <FaAward />, title: "පිළිගත් ඩිප්ලෝමා සහතික", desc: "වෘත්තීය සංවර්ධනය සඳහා පිළිගැනීම", color: "from-orange-600 to-red-600" },
              { icon: <FaGlobe />, title: "APA ආශ්‍රිත අධ්‍යාපනික සම්බන්ධතා", desc: "American Psychological Association සමඟ සහයෝගීතාව", color: "from-indigo-600 to-purple-600" },
              { icon: <FaMedal />, title: "Ayurvedic සහතික ලත් ආයතනය", desc: "ජාත්‍යන්තර ප්‍රමිතීන්ට අනුකූලව ක්‍රියාත්මක වීම", color: "from-teal-600 to-cyan-600" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${feature.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group`}
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform backdrop-blur-sm">
                  <div className="text-2xl">{feature.icon}</div>
                </div>
                <h3 className="font-bold text-base md:text-lg mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{feature.desc}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white/60 text-xs flex items-center gap-1">Learn more <FaArrowRight size={10} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courses Offered */}
        <div className="mb-16 bg-[#F8F4EC] rounded-2xl p-6 md:p-8">
          <div className="text-center mb-8">
            <FaBookOpen className="text-3xl text-[#D4AF37] mx-auto mb-2" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A]">
              අප විසින් පවත්වනු ලබන පාඨමාලා
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-3"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "මානව සම්පත් කළමනාකරණය සහ චර්යාත්මක මනෝවිද්‍යාව",
              "බෞද්ධ උපදේශනය හා ව්‍යවහාරික බෞද්ධ මනෝවිද්‍යාව",
              "ළමා මනෝවිද්‍යාව",
              "AI හා Cyber Psychology",
              "මානසික රෝග හා අසාමාන්‍ය චර්යා මනෝවිද්‍යාව",
              "ලිංගික උපදේශනය හා ලිංගික සෞඛ්‍ය මනෝවිද්‍යාව",
              "ගර්භණී හා පශ්චාත් ප්‍රසව මනෝවිද්‍යාව",
              "කාන්තා උපදේශනය හා සමාජ මනෝවිද්‍යාව",
              "Mindfulness හා Applied Counselling වැඩසටහන්",
            ].map((course, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition group">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full group-hover:scale-150 transition"></div>
                <span className="text-gray-700 text-sm md:text-base">{course}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Counselling Services */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <FaHandHoldingHeart className="text-3xl text-[#D4AF37] mx-auto mb-2" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A]">
              මනෝ උපදේශන සේවාවන්
            </h2>
            <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-3"></div>
            <p className="text-gray-500 text-sm mt-2">පුද්ගලික සහ පවුල් ගැටලු සඳහා වෘත්තීය මනෝ උපදේශන සේවාවන්</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Stress & Anxiety", icon: <FaBrain />, color: "from-blue-500 to-cyan-500" },
              { name: "Depression & Emotional Issues", icon: <FaHeart />, color: "from-purple-500 to-pink-500" },
              { name: "Relationship & Marriage Problems", icon: <FaHandHoldingHeart />, color: "from-rose-500 to-red-500" },
              { name: "Youth & Student Guidance", icon: <FaUsers />, color: "from-green-500 to-emerald-500" },
              { name: "Self Confidence & Personality Development", icon: <FaStar />, color: "from-orange-500 to-yellow-500" },
              { name: "Family Counselling", icon: <FaBuilding />, color: "from-indigo-500 to-purple-500" },
            ].map((service, idx) => (
              <div key={idx} className={`bg-gradient-to-r ${service.color} rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl group-hover:scale-110 transition-transform">{service.icon}</div>
                  <span className="font-semibold text-sm md:text-base">{service.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Contact */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#D4AF37]/10 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#E7CFA0]/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                <FaMapMarkerAlt className="text-xl text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A]">අපගේ ස්ථානය</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-base">
              MWI මනෝවිද්‍යාත්මක ආයතනය<br />
              Angel Healthcare – 2nd Floor<br />
              දළුගම, කැළණිය<br />
              කැළණිය විශ්වවිද්‍යාලය ඉදිරිපිට
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#D4AF37]/10 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#E7CFA0]/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                <FaPhoneAlt className="text-xl text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A]">සම්බන්ධ වන්න</h3>
            </div>
            <div className="space-y-3">
              <a href="tel:0768856172" className="flex items-center gap-3 text-gray-600 hover:text-[#D4AF37] transition text-base">
                <FaPhoneAlt className="text-sm" /> 076 885 6172
              </a>
              <a href="mailto:psychologicalinstitute351@gmail.com" className="flex items-center gap-3 text-gray-600 hover:text-[#D4AF37] transition text-base break-all">
                <FaEnvelope className="text-sm" /> psychologicalinstitute351@gmail.com
              </a>
              <div className="flex items-center gap-3 text-gray-600 text-base">
                <FaGlobe className="text-sm" /> www.mwipsychological.lk
              </div>
            </div>
          </div>
        </div>

        {/* Quote Footer */}
        <div className="mt-12 text-center py-8 border-t-2 border-[#D4AF37]/20">
          <p className="text-xl md:text-2xl text-[#0B1F3A] font-serif italic">
            “Professional Education with Responsibility, Recognition & Quality”
          </p>
          <p className="text-[#D4AF37] text-base mt-3 font-medium">🌿 MWI මනෝවිද්‍යාත්මක ආයතනය</p>
        </div>
      </div>

      {/* Certificate Modal - Full Screen Image Viewer */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCert(null)}>
          <div className="relative max-w-6xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedCert(null)} 
              className="absolute -top-14 right-0 text-white text-3xl hover:text-[#D4AF37] transition z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              <FaTimes />
            </button>
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative">
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.title}
                  className="w-full h-auto max-h-[85vh] object-contain bg-gray-100"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 bg-gradient-to-br ${selectedCert.color} rounded-xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                      {selectedCert.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-2xl">{selectedCert.title}</h3>
                      <p className="text-white/70 text-base">{selectedCert.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AboutMWI;