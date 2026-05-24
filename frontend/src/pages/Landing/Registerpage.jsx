import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaWhatsapp,
  FaCopy,
  FaCheck,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaGraduationCap,
  FaCreditCard,
  FaFileUpload,
  FaTimes,
  FaArrowRight,
  FaShieldAlt,
  FaClock,
  FaUniversity,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaStar,
  FaUsers,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaCertificate,
} from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import api from "../../utils/api";

const Registerpage = () => {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState("");
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [paymentSlipPreview, setPaymentSlipPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    nic: "",
    qualification: "",
    program: "",
    paymentMethod: "bank_transfer",
    transactionId: "",
    additionalNotes: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getAvailableCourses();
        const list = Array.isArray(data)
          ? data
          : data.data || data.courses || [];
        setCourses(list);
      } catch (err) {
        console.error("Failed to load courses", err);
        toast.error("Failed to load courses");
      }
    })();
  }, []);

 

  const displayPrograms = courses.map((course) => ({
    id: course._id,
    title: course.title || course.name || "Course",
    duration: course.duration || "6 Months",
    fee:
      course.fee !== undefined && course.fee !== null
        ? `Rs. ${course.fee.toLocaleString()}`
        : "Rs. 65,000",
    installment: course.installment || "2 Installments",
    icon: course.icon || (course.title?.includes("HRM") ? "👥" : "🧘"),
    color:
      course.color ||
      (course.title?.includes("HRM")
        ? "from-[#0B1F3A] to-[#1A3A5A]"
        : "from-[#D4AF37] to-[#C49B2C]"),
  }));

  const validateForm = () => {
    const newErrors = {};

    if (!selectedProgram) newErrors.program = "Please select a program";
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    else if (formData.fullName.trim().length < 3)
      newErrors.fullName = "Name must be at least 3 characters";
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Please enter a valid 10-digit phone number";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.nic.trim()) newErrors.nic = "NIC number is required";
    else if (formData.nic.trim().length < 5)
      newErrors.nic = "Please enter a valid NIC number";
    if (!formData.qualification)
      newErrors.qualification = "Please select your highest qualification";
    if (!formData.transactionId.trim())
      newErrors.transactionId = "Transaction ID is required";
    if (!paymentSlip) newErrors.paymentSlip = "Please upload the payment slip";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProgramSelect = (programId) => {
    setSelectedProgram(programId);
    setFormData({ ...formData, program: programId });
    if (errors.program) setErrors({ ...errors, program: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid file (JPG, PNG, or PDF)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setPaymentSlip(file);
      const reader = new FileReader();
      reader.onloadend = () => setPaymentSlipPreview(reader.result);
      reader.readAsDataURL(file);
      if (errors.paymentSlip) setErrors({ ...errors, paymentSlip: "" });
    }
  };

  const handleRemoveFile = () => {
    setPaymentSlip(null);
    setPaymentSlipPreview("");
    const fileInput = document.getElementById("paymentSlip");
    if (fileInput) fileInput.value = "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("fullName", formData.fullName);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("whatsappNumber", formData.whatsapp || formData.phone);
      fd.append("address", formData.address);
      fd.append("nic", formData.nic);
      fd.append("highestQualification", formData.qualification);
      const courseId = selectedProgram || (courses[0] && courses[0]._id) || "";
      fd.append("courseId", courseId);
      fd.append("paymentMethod", formData.paymentMethod);
      fd.append("transactionId", formData.transactionId);
      fd.append("notes", formData.additionalNotes || "");
      if (paymentSlip) fd.append("paymentSlip", paymentSlip, paymentSlip.name);

      const res = await api.registerStudent(fd);
      if (res && (res.success || res.registrationId || res._id)) {
        toast.success(
          "Registration submitted successfully! We will contact you within 24 hours.",
        );
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(res.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Bank details copied!");
  };

  const whatsappMessage = `Hello, I would like to request bank details for the registration fee payment. My name is ${formData.fullName || "[Your Name]"}. Thank you!`;

  const features = [
    { icon: <FaChalkboardTeacher />, text: "Expert Faculty" },
    { icon: <FaLaptopCode />, text: "100% Online" },
    { icon: <FaCertificate />, text: "Recognized Certificate" },
    { icon: <FaUsers />, text: "Student Support" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-56 h-56 md:w-96 md:h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/15 rounded-full mb-6 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm font-medium text-[#D4AF37] tracking-wide">
              ADMISSIONS OPEN 2025
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight">
            Begin Your{" "}
            <span className="text-[#D4AF37] relative inline-block">
              Journey
              <svg
                className="absolute bottom-0 left-0 w-full h-3 text-[#D4AF37]/40"
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

          <p className="text-base md:text-lg text-[#D1D8E0] max-w-2xl mx-auto">
            Choose your program and complete the registration to begin your
            journey in psychology
          </p>
          <div className="mt-6 bg-[#D4AF37]/20 inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm">
            <FaShieldAlt className="text-[#D4AF37] text-sm" />
            <p className="text-xs text-[#D4AF37]">
              Your NIC number will be your password for login
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Error Summary */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-5 animate-fadeIn">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-500">⚠️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 text-sm">
                    Please fix the following errors:
                  </h4>
                  <ul className="list-disc list-inside mt-1 text-red-600 text-xs">
                    {Object.values(errors).map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Program Selection Cards */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                Choose Your Path
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] mt-2">
                Select Your Program
              </h2>
              <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto mt-3"></div>
            </div>

            {displayPrograms.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border-2 border-dashed border-[#D4AF37]/40">
                <HiOutlineAcademicCap className="text-5xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  No published courses are available yet. Please check back
                  soon.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {displayPrograms.map((program) => (
                  <div
                    key={program.id}
                    onClick={() => handleProgramSelect(program.id)}
                    className={`cursor-pointer transition-all duration-300 rounded-2xl p-6 border-2 ${
                      selectedProgram === program.id
                        ? "border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/10 to-[#F5E6A8]/20 shadow-xl scale-105"
                        : "border-gray-200 bg-white hover:shadow-lg hover:scale-102"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center text-3xl shadow-lg`}
                      >
                        {program.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[#0B1F3A] text-base md:text-lg mb-1">
                          {program.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 flex items-center gap-1">
                            <FaCalendarAlt size={10} /> {program.duration}
                          </span>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 flex items-center gap-1">
                            <FaMoneyBillWave size={10} /> {program.fee}
                          </span>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 flex items-center gap-1">
                            <FaClock size={10} /> {program.installment}
                          </span>
                        </div>
                      </div>
                      {selectedProgram === program.id && (
                        <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center">
                          <FaCheck className="w-3 h-3 text-[#0B1F3A]" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {errors.program && (
              <p className="text-red-500 text-xs mt-3 text-center">
                {errors.program}
              </p>
            )}
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/10">
            <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] px-6 md:px-8 py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center">
                  <HiOutlineAcademicCap className="text-xl text-[#D4AF37]" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    Student Registration Form
                  </h2>
                  <p className="text-white/60 text-sm mt-0.5">
                    Fill in your details to complete registration
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1F3A] mb-4 pb-2 border-b border-[#D4AF37]/20 flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#D4AF37] rounded-full"></div>
                  <FaUser className="text-[#D4AF37]" /> Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all duration-300 ${
                        errors.fullName
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all duration-300 ${
                        errors.email
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200"
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all duration-300 ${
                        errors.phone
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200"
                      }`}
                      placeholder="076 885 6172"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all duration-300"
                      placeholder="Same as phone number"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all duration-300 ${
                        errors.address
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200"
                      }`}
                      placeholder="Your complete address"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Educational Information */}
              <div>
                <h3 className="text-lg font-semibold text-[#0B1F3A] mb-4 pb-2 border-b border-[#D4AF37]/20 flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#D4AF37] rounded-full"></div>
                  <FaGraduationCap className="text-[#D4AF37]" /> Educational
                  Information
                </h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NIC Number *
                    </label>
                    <input
                      type="text"
                      name="nic"
                      value={formData.nic}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all duration-300 ${
                        errors.nic
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200"
                      }`}
                      placeholder="Enter your NIC"
                    />
                    {errors.nic && (
                      <p className="text-red-500 text-xs mt-1">{errors.nic}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <FaShieldAlt size={10} /> Your NIC number will be used as
                      your password
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Highest Qualification *
                    </label>
                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-all duration-300 bg-white ${
                        errors.qualification
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200"
                      }`}
                    >
                      <option value="">Select Qualification</option>
                      <option>Ordinary Level (O/L)</option>
                      <option>Advanced Level (A/L)</option>
                      <option>Diploma</option>
                      <option>Bachelor's Degree</option>
                      <option>Master's Degree</option>
                      <option>Other</option>
                    </select>
                    {errors.qualification && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.qualification}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-[#0B1F3A] mb-4 pb-2 border-b border-[#D4AF37]/20 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#D4AF37] rounded-full"></span>
                  Payment Information
                </h3>

                {/* Request Bank Details Section - WhatsApp Integration */}
                <div className="mb-5 p-4 sm:p-5 bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/10 rounded-xl sm:rounded-2xl border border-[#25D366]/30">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-3">
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
                      <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                        <FaWhatsapp className="text-white text-xl" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h4 className="font-semibold text-[#0B1F3A] text-sm md:text-base">
                          Need Bank Details?
                        </h4>
                        <p className="text-xs text-gray-500">
                          Request via WhatsApp to get payment information
                        </p>
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/94768856172?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 sm:px-4 sm:py-2 bg-[#25D366] text-white rounded-full text-sm font-semibold hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 w-full sm:w-auto"
                    >
                      <FaWhatsapp size={16} />
                      Request on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Bank Details Section (Visible after request or can be shown directly) */}

                <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
                      Payment Method *
                    </label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition bg-white"
                    >
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="online_payment">Online Payment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
                      Transaction ID / Reference *
                    </label>
                    <input
                      type="text"
                      name="transactionId"
                      value={formData.transactionId}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition ${
                        errors.transactionId
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200"
                      }`}
                      placeholder="Enter transaction ID"
                    />
                    {errors.transactionId && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.transactionId}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
                    Upload Payment Slip *
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-4 text-center transition ${
                      errors.paymentSlip
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-[#D4AF37]"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="paymentSlip"
                    />
                    <label
                      htmlFor="paymentSlip"
                      className="cursor-pointer block"
                    >
                      {paymentSlipPreview ? (
                        <div className="space-y-2">
                          <img
                            src={paymentSlipPreview}
                            alt="Payment Slip Preview"
                            className="max-h-32 mx-auto rounded-lg"
                          />
                          <p className="text-sm text-green-600">
                            ✓ File uploaded successfully
                          </p>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="text-red-500 text-xs hover:underline mt-1"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-4xl">📎</div>
                          <p className="text-sm text-gray-600">
                            Click to upload payment slip
                          </p>
                          <p className="text-xs text-gray-400">
                            Supported: JPG, PNG, PDF (Max 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                  {errors.paymentSlip && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.paymentSlip}
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#0B1F3A] mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition resize-none"
                    placeholder="Any special requirements or questions..."
                  ></textarea>
                </div>
              </div>

              {/* Terms & Submit */}
              <div className="pt-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 accent-[#D4AF37] rounded"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-800 transition">
                    I confirm that the information provided is accurate. I agree
                    to the
                    <Link
                      to="/terms"
                      className="text-[#D4AF37] hover:underline mx-1"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and
                    <Link
                      to="/privacy"
                      className="text-[#D4AF37] hover:underline ml-1"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] rounded-xl font-bold text-base md:text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Registration <FaArrowRight />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 pt-2">
                * We will contact you within 24 hours after verification
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Registerpage;
