import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { authAPI, setAuthSession } from '../../utils/api';

const SignInpage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const response = await authAPI.login(formData.email, formData.password);
        const userName = response?.user?.fullName || response?.user?.name || formData.email;
        const userId = response?.user?.id || response?.user?._id || '';
        const course = response?.user?.course?._id || response?.user?.course || '';

        setAuthSession(
          {
            token: response.token,
            role: response.user.role,
            name: userName,
            id: userId,
            course,
          },
          formData.rememberMe,
        );
        const role = response?.user?.role || 'student';
        const redirectMap = {
          student: '/student/dashboard',
          teacher: '/teacher/dashboard',
          admin: '/admin/dashboard',
        };

        navigate(redirectMap[role] || '/');
      } catch (error) {
        setErrors({ submit: error.message || 'Login failed. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset link will be sent to your registered email address.');
  };

  return (
    <div className="min-h-screen bg-[#FCFAF5]">
      <Navbar />

      {/* Sign In Section with Right Banner */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Left Side - Sign In Form */}
            <div className="order-2 lg:order-1">
              {/* Error Summary */}
              {Object.keys(errors).length > 0 && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 animate-fadeIn">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-lg">⚠️</span>
                    <div>
                      <h4 className="font-semibold text-red-700 text-sm">Please fix the following errors:</h4>
                      <ul className="list-disc list-inside mt-1 text-red-600 text-xs">
                        {Object.values(errors).map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Sign In Card */}
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-[#D4AF37]/20">
                <div className="px-6 md:px-8 pt-6 md:pt-8 pb-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A]">Welcome Back</h2>
                  <p className="text-gray-500 text-sm mt-1">Sign in to continue your learning journey</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                  {errors.submit && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {errors.submit}
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-[#0B1F3A] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 p-3 border rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition ${
                          errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-[#0B1F3A] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-12 p-3 border rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition ${
                          errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <svg className="w-5 h-5 text-gray-400 hover:text-[#D4AF37] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {showPassword ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          )}
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 accent-[#D4AF37] rounded"
                      />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-[#D4AF37] hover:underline transition"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 md:py-3.5 bg-linear-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] rounded-xl font-bold text-base hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-[#0B1F3A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </button>

                  {/* Sign Up Link */}
                  <div className="text-center pt-2">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-[#D4AF37] font-semibold hover:underline transition">
                        Create Account
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side - Big Banner */}
            <div className="order-1 lg:order-2">
              <div className="relative bg-linear-to-br from-[#0B1F3A] to-[#1A3A5A] rounded-2xl md:rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 text-center">
                  <div className="text-6xl md:text-7xl mb-6">🎓</div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Your Journey in Psychology</h2>
                  <p className="text-white/80 text-sm md:text-base mb-6 leading-relaxed">
                    Join our professional diploma programs and transform your career with expert guidance and comprehensive learning.
                  </p>
                  
                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>100% Online Learning</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Expert Faculty Guidance</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Recognized Diploma Certificate</span>
                    </div>
                  </div>

                  <Link to="/register">
                    <button className="w-full py-3 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-bold hover:bg-[#C49B2C] transition-all duration-300">
                      Register Now
                    </button>
                  </Link>
                  
                  <p className="text-white/40 text-xs mt-4">Limited seats available for upcoming batch</p>
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

export default SignInpage;