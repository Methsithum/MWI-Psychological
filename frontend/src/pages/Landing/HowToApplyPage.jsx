import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const HowToApplyPage = () => {

  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up on our LMS portal with your basic information",
      icon: "📝"
    },
    {
      number: "02",
      title: "Fill Application",
      description: "Complete the online application form with your details",
      icon: "📋"
    },
    {
      number: "03",
      title: "Upload Documents",
      description: "Submit certificates, ID proof, and required documents",
      icon: "📎"
    },
    {
      number: "04",
      title: "Pay Application Fee",
      description: "Secure your application with payment confirmation",
      icon: "💳"
    },
    {
      number: "05",
      title: "Review Process",
      description: "Our academic team will verify your application",
      icon: "🔍"
    },
    {
      number: "06",
      title: "Start Learning",
      description: "Get LMS access and begin your psychology journey",
      icon: "🎓"
    }
  ];

  const requirements = [
    "High School Qualification or equivalent",
    "Basic English understanding",
    "Computer or smartphone with internet",
    "Commitment to complete the program",
    "Valid email & contact number"
  ];

  const fees = [
    { item: "Application Fee", amount: "Rs. 1,500" },
    { item: "Full Course Fee", amount: "Rs. 45,000" },
    { item: "Monthly Installment", amount: "Rs. 4,000 x 12" },
    { item: "Exam Fee", amount: "Rs. 2,500" },
    { item: "Certificate Fee", amount: "Rs. 1,000" }
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EF]">

      <Navbar />

      {/* HERO */}
      <section className="pt-24 pb-20 bg-gradient-to-r from-[#0B1F3A] to-[#08162A]">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            How to Apply
          </h1>
          <p className="text-[#E5E7EB] mt-3">
            Simple 6-step admission process to join PWI Psychological
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1F3A]">
              Admission Process
            </h2>
            <p className="text-gray-600 mt-2">
              Follow these steps to become a student
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border-t-4 border-[#D4AF37]"
              >
                <div className="flex justify-between items-start">
                  <span className="text-4xl">{step.icon}</span>
                  <span className="text-3xl font-bold text-[#0B1F3A]/10">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0B1F3A] mt-4">
                  {step.title}
                </h3>

                <p className="text-gray-600 mt-2">
                  {step.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">

          <div>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-6">
              Eligibility Requirements
            </h2>

            <ul className="space-y-3">
              {requirements.map((r, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <span className="text-[#D4AF37] text-xl">✔</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-6">
              Required Documents
            </h2>

            <div className="space-y-3 text-gray-700">
              <p>📄 High School Certificate</p>
              <p>🪪 National ID / Passport</p>
              <p>📸 Passport Size Photo</p>
              <p>📑 Birth Certificate</p>
            </div>
          </div>

        </div>
      </section>

      {/* FEES */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-center text-[#0B1F3A] mb-10">
            Fee Structure
          </h2>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#D4AF37]/30">

            <div className="bg-[#0B1F3A] text-white p-4 font-semibold">
              Diploma in Psychology Program
            </div>

            {fees.map((f, i) => (
              <div key={i} className="flex justify-between p-4 border-b">
                <span className="text-gray-700">{f.item}</span>
                <span className="text-[#D4AF37] font-semibold">{f.amount}</span>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0B1F3A] to-[#08162A]">
        <div className="text-center max-w-3xl mx-auto px-4">

          <h2 className="text-3xl font-bold text-white">
            Start Your Psychology Journey Today
          </h2>

          <p className="text-[#E5E7EB] mt-3">
            Limited seats available for the current batch
          </p>

          <Link to="/register">
            <button className="mt-6 px-8 py-3 bg-[#D4AF37] text-[#0B1F3A] font-bold rounded-lg hover:bg-yellow-300 transition">
              Apply Now
            </button>
          </Link>

        </div>
      </section>

      <Footer />

    </div>
  );
};

export default HowToApplyPage;