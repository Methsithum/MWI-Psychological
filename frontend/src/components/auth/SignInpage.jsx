import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import api from '../../utils/api';
import auth from '../../utils/auth';

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
        const res = await api.login(formData.email, formData.password);
        if (res && res.token) {
          auth.setToken(res.token, formData.rememberMe);
          auth.setUser(res.user, formData.rememberMe);
          alert(`Welcome back ${res.user.fullName || res.user.email}!`);
          navigate(auth.getDashboardPath(res.user.role));
        } else {
          alert(res.message || 'Invalid email or password. If you registered, wait for approval.');
        }
      } catch (err) {
        console.error('Login error:', err);
        alert(err?.message || 'Invalid email or password. Try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleForgotPassword = () => {
    alert('Your password is your NIC number. If you forgot, please contact admin.');
  };

  const fillDemoCredentials = () => {
    setFormData({
      ...formData,
      email: 'student@pwi.lk',
      password: '987654321V'
    });
  };

  return (
    <div className="min-h-screen bg-[#FCFAF5]">
      <Navbar />

      <section className="pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
            
            {/* Left Side - Sign In Form */}
            <div className="order-2 lg:order-1">
              {Object.keys(errors).length > 0 && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 text-base">⚠️</span>
                    <div>
                      <h4 className="font-semibold text-red-700 text-xs">Please fix the following errors:</h4>
                      <ul className="list-disc list-inside mt-1 text-red-600 text-[11px]">
                        {Object.values(errors).map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-[#D4AF37]/20">
                <div className="px-6 md:px-8 pt-5 md:pt-6 pb-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A]">Welcome Back</h2>
                  <p className="text-gray-500 text-sm mt-1">Sign in to continue your learning journey</p>
                </div>

                <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0B1F3A] mb-1.5">
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
                        className={`w-full pl-10 p-2.5 border rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition ${
                          errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0B1F3A] mb-1.5">
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
                        className={`w-full pl-10 pr-12 p-2.5 border rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition ${
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
                    <p className="text-xs text-gray-400 mt-1">⚠️ Your password is your NIC number provided during registration</p>
                  </div>

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

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2.5 md:py-3 bg-linear-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] rounded-xl font-bold text-base hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${
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

                  <div className="text-center pt-1">
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
              <div className="relative bg-linear-to-br from-[#0B1F3A] to-[#1A3A5A] rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 text-center">
                  <div className="text-5xl md:text-6xl mb-4">🎓</div>
                  <h2 className="text-xl md:text-2xl font-bold mb-3">Start Your Journey in Psychology</h2>
                  <p className="text-white/80 text-sm md:text-base mb-4 leading-relaxed">
                    Join our professional diploma programs and transform your career with expert guidance and comprehensive learning.
                  </p>
                  
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>100% Online Learning</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Expert Faculty Guidance</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Recognized Diploma Certificate</span>
                    </div>
                  </div>

                  <Link to="/register">
                    <button className="w-full py-2.5 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-bold hover:bg-[#C49B2C] transition-all duration-300">
                      Register Now
                    </button>
                  </Link>
                  
                  <p className="text-white/40 text-xs mt-3">Limited seats available for upcoming batch</p>
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