import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const HowToApplyPage = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up on our LMS portal with your basic information and email address",
      icon: "📝"
    },
    {
      number: "02",
      title: "Fill Application Form",
      description: "Complete the online application form with your educational details",
      icon: "📋"
    },
    {
      number: "03",
      title: "Submit Documents",
      description: "Upload required documents (Educational certificates, ID proof, Photos)",
      icon: "📎"
    },
    {
      number: "04",
      title: "Pay Application Fee",
      description: "Pay the one-time application fee to process your application",
      icon: "💳"
    },
    {
      number: "05",
      title: "Application Review",
      description: "Our team will review your application within 2-3 business days",
      icon: "✅"
    },
    {
      number: "06",
      title: "Enrollment Confirmation",
      description: "Receive confirmation and get access to the full course materials",
      icon: "🎉"
    }
  ];

  const requirements = [
    "High School Diploma or equivalent",
    "Basic understanding of English language",
    "Access to a computer/laptop with internet",
    "Commitment to complete 1-year program",
    "Valid email address and phone number"
  ];

  const fees = [
    { item: "Application Fee", amount: "Rs. 1,500" },
    { item: "Course Fee (Full Program)", amount: "Rs. 45,000" },
    { item: "Installment Option (per month)", amount: "Rs. 4,000 x 12 months" },
    { item: "Exam Fee", amount: "Rs. 2,500" },
    { item: "Diploma Certificate Fee", amount: "Rs. 1,000" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How to Apply</h1>
          <p className="text-xl text-blue-100">Simple 6-step admission process</p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Admission Process</h2>
            <p className="mt-4 text-lg text-gray-600">Follow these steps to secure your seat</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition relative">
                <div className="absolute top-4 right-4 text-4xl font-bold text-blue-100">{step.number}</div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Eligibility Requirements</h2>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Required Documents</h2>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">High School Certificate</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Government ID (NIC/Passport)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Recent Passport Size Photo</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Birth Certificate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Fee Structure</h2>
            <p className="mt-4 text-lg text-gray-600">Flexible payment options available</p>
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-4">
              <h3 className="text-xl font-bold">Diploma in Psychology - Fee Details</h3>
            </div>
            <div className="divide-y">
              {fees.map((fee, index) => (
                <div key={index} className="flex justify-between px-6 py-4">
                  <span className="text-gray-700">{fee.item}</span>
                  <span className="font-semibold text-blue-600">{fee.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Limited seats available for the current batch. Apply now!
          </p>
          <Link to="/register">
            <button className="px-8 py-3 bg-yellow-400 text-blue-900 rounded-lg hover:bg-yellow-300 transition duration-300 font-semibold text-lg shadow-lg">
              Apply for Admission Now
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowToApplyPage;