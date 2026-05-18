import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      <Navbar />

      {/* HERO */}
      <section className="pt-24 pb-20 bg-gradient-to-r from-[#0B1F3A] to-[#08162A] text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Contact Us
        </h1>
        <p className="mt-3 text-[#E5E7EB] text-lg">
          We’re here to support your learning journey
        </p>
      </section>

      {/* MAIN SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">

          {/* CONTACT INFO */}
          <div>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-8">
              Get in Touch
            </h2>

            <div className="space-y-6">

              {[
                {
                  icon: "📍",
                  title: "Address",
                  desc: "PWI Psychological Learning Center, Colombo, Sri Lanka"
                },
                {
                  icon: "📧",
                  title: "Email",
                  desc: "psychologicalinstitute351@gmal.com"
                },
                {
                  icon: "📞",
                  title: "Phone / WhatsApp",
                  desc: "076 885 6172"
                },
                {
                  icon: "⏰",
                  title: "Office Hours",
                  desc: "Mon - Fri: 9:00 AM - 6:00 PM"
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition"
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-[#0B1F3A]">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* FORM */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#D4AF37]/20">

            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-6">
              Send Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#D4AF37]"
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#D4AF37]"
                required
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#D4AF37]"
              />

              <textarea
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#D4AF37]"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#0B1F3A] text-white py-3 rounded-lg hover:bg-[#08162A] transition font-semibold"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center mb-10">
          <h2 className="text-3xl font-bold text-[#0B1F3A]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-6">

          {[
            {
              q: "When does the next batch start?",
              a: "January 2025 with limited seats"
            },
            {
              q: "Is the diploma recognized?",
              a: "Yes, certification is provided upon completion"
            },
            {
              q: "Can I pay in installments?",
              a: "Yes, flexible payment options available"
            },
            {
              q: "Is it fully online?",
              a: "Yes, 100% online learning system"
            }
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 bg-[#F8F5EF] rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-[#0B1F3A] mb-2">
                {item.q}
              </h3>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;