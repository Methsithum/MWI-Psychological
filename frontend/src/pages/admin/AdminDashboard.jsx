import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, FaUsers, FaBook, FaHistory, FaSignOutAlt,
  FaCheckCircle, FaTimesCircle, FaFileInvoice, FaPlus, FaTrash,
  FaEdit, FaEye, FaGraduationCap, FaMoneyBillWave, FaClock,
  FaEnvelope, FaPhoneAlt, FaUserGraduate, FaChartLine,
  FaBars, FaTimes, FaSpinner, FaSearch, FaFilter,
  FaChevronRight, FaChevronLeft, FaCalendarAlt, FaDollarSign,
  FaUniversity, FaIdCard, FaMapMarkerAlt, FaWhatsapp, FaInfoCircle,
  FaAngleDown
} from 'react-icons/fa';
import { MdOutlineAssignment, MdOutlineDescription } from 'react-icons/md';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { toast, Toaster } from 'react-hot-toast';
import api from '../../utils/api';

const API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:5000').replace(/\/$/, '');

const resolveMediaUrl = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSlipModal, setShowSlipModal] = useState(false);
  const [slipPreviewUrl, setSlipPreviewUrl] = useState('');
  const [slipPreviewError, setSlipPreviewError] = useState('');
  const [slipPreviewLoading, setSlipPreviewLoading] = useState(false);
  const [registrationRequests, setRegistrationRequests] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [systemActivities, setSystemActivities] = useState([]);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    duration: '',
    fee: '',
    description: ''
  });

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(true);
      } else {
        setMobileMenuOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const normalizeCourse = (course, index = 0) => ({
    id: course._id || course.id || String(index + 1),
    courseId: course._id || course.id || String(index + 1),
    name: course.title || course.name || 'Course',
    duration: course.duration || '6 Months',
    fee: typeof course.fee === 'number' ? `Rs. ${course.fee.toLocaleString()}` : (course.fee || 'Rs. 0'),
    students: Array.isArray(course.students) ? course.students.length : (course.students || 0),
    status: course.status === 'published' ? 'active' : 'inactive',
    description: course.description || '',
  });

  const normalizePendingRegistration = (registration) => ({
    id: registration._id,
    fullName: registration.fullName,
    email: registration.email,
    phone: registration.phone,
    programme: registration.programme || registration.course?.title || registration.course?.code || 'Unknown',
    courseId: registration.course?._id || registration.course,
    transactionId: registration.paymentInformation?.transactionId || '',
    paymentSlip: registration.paymentInformation?.paymentSlipUrl || '',
    paymentSlipMimeType: registration.paymentInformation?.paymentSlipMimeType || '',
    nic: registration.nic,
    whatsappNumber: registration.whatsappNumber,
    address: registration.address,
    highestQualification: registration.highestQualification,
    status: registration.status,
  });

  const normalizeApprovedUser = (user, courseLookup) => ({
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    programme: courseLookup.get(String(user.course)) || 'Student',
    status: user.status,
  });

  const loadDashboardData = async () => {
    try {
      const [requestsRes, usersRes, coursesRes] = await Promise.all([
        api.getPendingStudents(),
        api.getAllUsers(),
        api.getCourses(),
      ]);

      const backendCourses = Array.isArray(coursesRes?.data) ? coursesRes.data : [];
      const courseLookup = new Map(
        backendCourses.map((course) => [String(course._id), course.title || course.name || 'Course'])
      );

      setCourses(backendCourses.map((course, index) => normalizeCourse(course, index)));
      setRegistrationRequests((requestsRes?.data || []).map(normalizePendingRegistration));

      const approved = (usersRes?.data || [])
        .filter((user) => user.role === 'student' && user.status === 'approved')
        .map((user) => normalizeApprovedUser(user, courseLookup));
      setApprovedStudents(approved);
    } catch (error) {
      console.error('Failed to load admin dashboard data', error);
      toast.error('Failed to load dashboard data');
    }
  };

  useEffect(() => {
    loadDashboardData();

    const activities = JSON.parse(localStorage.getItem('systemActivities') || '[]');
    if (activities.length === 0) {
      const defaultActivities = [
        { id: 1, action: 'Admin dashboard accessed', user: 'Admin', time: new Date().toLocaleString(), type: 'system' },
      ];
      setSystemActivities(defaultActivities);
      localStorage.setItem('systemActivities', JSON.stringify(defaultActivities));
    } else {
      setSystemActivities(activities);
    }
  }, []);

  useEffect(() => {
    let active = true;
    let objectUrl = '';

    const loadSlipPreview = async () => {
      if (!showSlipModal || !selectedUser?.paymentSlip) {
        setSlipPreviewUrl('');
        setSlipPreviewError('');
        setSlipPreviewLoading(false);
        return;
      }

      setSlipPreviewLoading(true);
      setSlipPreviewError('');
      setSlipPreviewUrl('');

      try {
        const slipUrl = resolveMediaUrl(selectedUser.paymentSlip);
        const response = await fetch(slipUrl);

        if (!response.ok) {
          throw new Error(`Failed to load slip (${response.status})`);
        }

        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);

        if (active) {
          setSlipPreviewUrl(objectUrl);
        }
      } catch (error) {
        if (active) {
          setSlipPreviewError(error?.message || 'Failed to load payment slip');
        }
      } finally {
        if (active) {
          setSlipPreviewLoading(false);
        }
      }
    };

    loadSlipPreview();

    return () => {
      active = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [showSlipModal, selectedUser]);

  const addActivity = (action, type) => {
    const newActivity = {
      id: Date.now(),
      action,
      user: 'Admin',
      time: new Date().toLocaleString(),
      type
    };
    const updatedActivities = [newActivity, ...systemActivities];
    setSystemActivities(updatedActivities);
    localStorage.setItem('systemActivities', JSON.stringify(updatedActivities));
  };

  const handleApprove = async (studentId) => {
    try {
      const res = await api.approveStudent(studentId);
      if (!res || !res.success) {
        throw new Error(res?.message || 'Approval failed');
      }
      toast.success('Student approved successfully!');
      addActivity('Approved student registration', 'approval');
      await loadDashboardData();
    } catch (error) {
      console.error('Approve error:', error);
      toast.error(error?.message || 'Failed to approve student');
    }
  };

  const handleReject = async (studentId) => {
    try {
      const res = await api.rejectStudent(studentId);
      if (!res || !res.success) {
        throw new Error(res?.message || 'Rejection failed');
      }
      toast.success('Student rejected');
      addActivity('Rejected student registration', 'rejection');
      await loadDashboardData();
    } catch (error) {
      console.error('Reject error:', error);
      toast.error(error?.message || 'Failed to reject student');
    }
  };

  const handleViewSlip = (student) => {
    setSelectedUser(student);
    setShowSlipModal(true);
  };

  const handleAddCourse = async () => {
    if (newCourse.name && newCourse.duration && newCourse.fee) {
      try {
        const title = newCourse.name;
        const code = title
          .toUpperCase()
          .replace(/[^A-Z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 24) || `COURSE-${Date.now()}`;
        const fee = Number(String(newCourse.fee).replace(/[^\d]/g, '')) || 0;

        await api.createCourse({
          title,
          code,
          description: newCourse.description,
          fee,
          status: 'published',
        });

        toast.success('Course added successfully!');
        addActivity(`Added new course: ${newCourse.name}`, 'course');
        setShowAddCourseModal(false);
        setNewCourse({ name: '', duration: '', fee: '', description: '' });
        await loadDashboardData();
      } catch (error) {
        console.error('Course creation error:', error);
        toast.error(error?.message || 'Failed to add course');
      }
    } else {
      toast.error('Please fill all required fields');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await api.deleteCourse(courseId);
      toast.success('Course deleted successfully!');
      addActivity('Deleted course', 'course');
      await loadDashboardData();
    } catch (error) {
      console.error('Course deletion error:', error);
      toast.error(error?.message || 'Failed to delete course');
    }
  };

  const handleToggleCourseStatus = async (courseId) => {
    const course = courses.find((item) => item.id === courseId);
    if (!course) return;

    const nextStatus = course.status === 'active' ? 'draft' : 'published';
    try {
      await api.updateCourse(courseId, { status: nextStatus });
      toast.success(`Course ${nextStatus === 'published' ? 'activated' : 'deactivated'} successfully!`);
      addActivity(`${nextStatus === 'published' ? 'Activated' : 'Deactivated'} course: ${course.name}`, 'course');
      await loadDashboardData();
    } catch (error) {
      console.error('Course status update error:', error);
      toast.error(error?.message || 'Failed to update course status');
    }
  };

  const filteredRequests = registrationRequests.filter(student =>
    student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phone?.includes(searchTerm)
  );

  const stats = [
    { title: 'Total Students', value: approvedStudents.length.toString(), icon: <FaUserGraduate />, change: `+${approvedStudents.length}`, color: 'from-[#D4AF37] to-[#C49B2C]' },
    { title: 'Pending Approvals', value: registrationRequests.length.toString(), icon: <FaClock />, change: `${registrationRequests.length} waiting`, color: 'from-[#0B1F3A] to-[#1A3A5A]' },
    { title: 'Active Courses', value: courses.filter(c => c.status === 'active').length.toString(), icon: <FaBook />, change: '', color: 'from-[#D4AF37] to-[#C49B2C]' },
    { title: 'Total Revenue', value: 'Rs. ' + (approvedStudents.length * 1500).toLocaleString(), icon: <FaMoneyBillWave />, change: '+12%', color: 'from-[#0B1F3A] to-[#1A3A5A]' },
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'registration': return <FaUserGraduate className="text-[#D4AF37]" />;
      case 'payment': return <FaFileInvoice className="text-green-500" />;
      case 'approval': return <FaCheckCircle className="text-green-500" />;
      case 'rejection': return <FaTimesCircle className="text-red-500" />;
      case 'course': return <FaBook className="text-blue-500" />;
      default: return <FaInfoCircle className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      {/* Admin Navbar - Mobile Responsive */}
      <nav className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#D4AF37] to-[#C49B2C] rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <HiOutlineAcademicCap className="text-lg sm:text-2xl text-[#0B1F3A]" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-base sm:text-lg">Admin Dashboard</h1>
                <p className="text-[10px] sm:text-xs text-white/60">PWI Psychological Institute</p>
              </div>
              <div className="block sm:hidden">
                <h1 className="font-bold text-sm">Admin</h1>
                <p className="text-[10px] text-white/60">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#D4AF37]/30 rounded-full flex items-center justify-center">
                  <FaUserGraduate className="text-xs sm:text-sm" />
                </div>
                <span className="text-xs sm:text-sm hidden xs:inline-block">Admin</span>
              </div>
              <button 
                onClick={() => {
                  addActivity('Admin logged out', 'system');
                  navigate('/');
                }}
                className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-xs sm:text-sm transition-all duration-300"
              >
                <FaSignOutAlt size={12} />
                <span className="hidden sm:inline">Logout</span>
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition"
              >
                {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Mobile Responsive */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-72 bg-white shadow-2xl min-h-screen fixed md:relative z-40 transition-all duration-300 overflow-y-auto`}>
          <div className="p-4 sm:p-6">
            {/* Mobile Sidebar Header */}
            <div className="flex items-center justify-between mb-4 md:hidden">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                  <HiOutlineAcademicCap className="text-[#0B1F3A]" />
                </div>
                <span className="font-bold text-[#0B1F3A]">Menu</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500">
                <FaTimes size={18} />
              </button>
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <button
                onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                  activeTab === 'overview' 
                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#D4AF37]'
                }`}
              >
                <FaTachometerAlt className="text-base sm:text-lg" />
                <span className="font-medium">Overview</span>
              </button>

              <button
                onClick={() => { setActiveTab('users'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                  activeTab === 'users' 
                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#D4AF37]'
                }`}
              >
                <FaUsers className="text-base sm:text-lg" />
                <span className="font-medium">Manage Users</span>
                {registrationRequests.length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {registrationRequests.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => { setActiveTab('courses'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                  activeTab === 'courses' 
                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#D4AF37]'
                }`}
              >
                <FaBook className="text-base sm:text-lg" />
                <span className="font-medium">Manage Courses</span>
              </button>

              <button
                onClick={() => { setActiveTab('activities'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                  activeTab === 'activities' 
                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#D4AF37]'
                }`}
              >
                <FaHistory className="text-base sm:text-lg" />
                <span className="font-medium">System Activities</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="animate-fadeIn">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B1F3A]">Dashboard Overview</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Welcome back! Here's what's happening with your institute today.</p>
              </div>
              
              {/* Stats Cards - Responsive Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className={`bg-gradient-to-r ${stat.color} rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80 text-xs sm:text-sm">{stat.title}</p>
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">{stat.value}</p>
                        {stat.change && <p className="text-white/60 text-[10px] sm:text-xs mt-1">{stat.change}</p>}
                      </div>
                      <div className="text-2xl sm:text-3xl md:text-4xl opacity-80">{stat.icon}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 border border-[#D4AF37]/10">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#D4AF37]/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <FaHistory className="text-[#D4AF37] text-base sm:text-xl" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0B1F3A]">Recent System Activities</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {systemActivities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-all duration-300">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-800">{activity.action}</p>
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{activity.time}</p>
                      </div>
                      <span className="text-[10px] sm:text-xs text-gray-400">by {activity.user}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Manage Users Tab - Mobile Responsive */}
          {activeTab === 'users' && (
            <div className="animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B1F3A]">Manage Users</h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Review and manage student registrations</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
              
              {/* Pending Approvals Section */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 border border-[#D4AF37]/10">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <FaClock className="text-orange-500 text-base sm:text-xl" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0B1F3A]">Pending Approvals</h3>
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{filteredRequests.length}</span>
                </div>
                
                {filteredRequests.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <FaCheckCircle className="text-4xl sm:text-5xl text-green-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">No pending approvals</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-600">Student</th>
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-600 hidden sm:table-cell">Contact</th>
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-600">Program</th>
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRequests.map((student) => (
                          <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                            <td className="p-2 sm:p-3">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                                  <FaUserGraduate className="text-[#D4AF37] text-sm sm:text-base" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800 text-xs sm:text-sm">{student.fullName}</p>
                                  <p className="text-[10px] sm:text-xs text-gray-400">{student.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-2 sm:p-3 hidden sm:table-cell">
                              <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1"><FaPhoneAlt size={12} /> {student.phone}</p>
                            </td>
                            <td className="p-2 sm:p-3">
                              <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] sm:text-xs">{student.programme}</span>
                            </td>
                            <td className="p-2 sm:p-3">
                              <div className="flex gap-1 sm:gap-2">
                                <button
                                  onClick={() => handleViewSlip(student)}
                                  className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                                  title="View Payment Slip"
                                >
                                  <FaFileInvoice className="text-[#D4AF37] text-sm" />
                                </button>
                                <button
                                  onClick={() => handleApprove(student.id)}
                                  className="p-1.5 bg-green-100 hover:bg-green-200 rounded-lg transition"
                                  title="Approve"
                                >
                                  <FaCheckCircle className="text-green-600 text-sm" />
                                </button>
                                <button
                                  onClick={() => handleReject(student.id)}
                                  className="p-1.5 bg-red-100 hover:bg-red-200 rounded-lg transition"
                                  title="Reject"
                                >
                                  <FaTimesCircle className="text-red-600 text-sm" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Approved Students Section */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 border border-[#D4AF37]/10">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <FaCheckCircle className="text-green-500 text-base sm:text-xl" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0B1F3A]">Approved Students</h3>
                  <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">{approvedStudents.length}</span>
                </div>
                
                {approvedStudents.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <FaUserGraduate className="text-4xl sm:text-5xl text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">No approved students yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-600">Student</th>
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-600 hidden sm:table-cell">Email</th>
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-semibold text-gray-600">Program</th>
                        </tr>
                      </thead>
                      <tbody>
                        {approvedStudents.map((student) => (
                          <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                            <td className="p-2 sm:p-3">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                                  <FaCheckCircle className="text-green-600 text-sm sm:text-base" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800 text-xs sm:text-sm">{student.fullName}</p>
                                  <p className="text-[10px] sm:text-xs text-gray-400">{student.phone}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-2 sm:p-3 hidden sm:table-cell">
                              <p className="text-xs sm:text-sm text-gray-600">{student.email}</p>
                            </td>
                            <td className="p-2 sm:p-3">
                              <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-purple-100 text-purple-700 rounded-full text-[10px] sm:text-xs">{student.programme}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Manage Courses Tab - Mobile Responsive */}
          {activeTab === 'courses' && (
            <div className="animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B1F3A]">Manage Courses</h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Create and manage your course offerings</p>
                </div>
                <button
                  onClick={() => setShowAddCourseModal(true)}
                  className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm hover:shadow-lg transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  <FaPlus size={12} /> Add New Course
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-[#D4AF37]/10 group">
                    <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] p-3 sm:p-4 text-white">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div className="flex items-center gap-2">
                          <FaBook className="text-[#D4AF37] text-sm sm:text-base" />
                          <h3 className="font-bold text-sm sm:text-base">{course.name}</h3>
                        </div>
                        <span className={`self-start sm:self-auto px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold ${
                          course.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {course.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">{course.description}</p>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                          <FaClock size={12} /> {course.duration}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                          <FaDollarSign size={12} /> {course.fee}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                          <FaUserGraduate size={12} /> {course.students} students
                        </div>
                      </div>
                      <div className="flex gap-2 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => handleToggleCourseStatus(course.id)}
                          className={`flex-1 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                            course.status === 'active' 
                              ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {course.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="flex-1 py-1.5 sm:py-2 bg-red-500 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-red-600 transition-all duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Activities Tab - Mobile Responsive */}
          {activeTab === 'activities' && (
            <div className="animate-fadeIn">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B1F3A]">System Activities</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Track all administrative actions and system events</p>
              </div>
              
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 border border-[#D4AF37]/10">
                <div className="space-y-2 sm:space-y-3 max-h-[500px] overflow-y-auto">
                  {systemActivities.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                      <FaHistory className="text-4xl sm:text-5xl text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">No activities recorded</p>
                    </div>
                  ) : (
                    systemActivities.map((activity) => (
                      <div key={activity.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-all duration-300">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm font-medium text-gray-800">{activity.action}</p>
                          <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{activity.time}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] sm:text-xs text-gray-400">by {activity.user}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Slip Modal - Mobile Responsive */}
      {showSlipModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4" onClick={() => setShowSlipModal(false)}>
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full p-4 sm:p-6 animate-scaleIn mx-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0B1F3A] flex items-center gap-2">
                <FaFileInvoice className="text-[#D4AF37]" /> Payment Slip
              </h3>
              <button onClick={() => setShowSlipModal(false)} className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl">&times;</button>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                <p className="text-xs sm:text-sm"><strong className="text-[#D4AF37]">Student:</strong> {selectedUser.fullName}</p>
                <p className="text-xs sm:text-sm mt-1"><strong className="text-[#D4AF37]">Transaction ID:</strong> {selectedUser.transactionId}</p>
                <p className="text-xs sm:text-sm mt-1"><strong className="text-[#D4AF37]">Amount:</strong> Rs. 1,500</p>
              </div>
              {slipPreviewLoading ? (
                <div className="flex items-center justify-center p-6 sm:p-8">
                  <FaSpinner className="animate-spin text-2xl sm:text-3xl text-[#D4AF37]" />
                </div>
              ) : slipPreviewError ? (
                <p className="text-xs sm:text-sm text-red-500 text-center p-3 sm:p-4">{slipPreviewError}</p>
              ) : slipPreviewUrl ? (
                <img src={slipPreviewUrl} alt="Payment Slip" className="w-full rounded-lg border shadow-md" />
              ) : (
                <p className="text-red-500 text-xs sm:text-sm text-center">No slip uploaded</p>
              )}
            </div>
            <button onClick={() => setShowSlipModal(false)} className="w-full mt-4 sm:mt-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] rounded-lg sm:rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Course Modal - Mobile Responsive */}
      {showAddCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4" onClick={() => setShowAddCourseModal(false)}>
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full p-4 sm:p-6 animate-scaleIn mx-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0B1F3A] flex items-center gap-2">
                <FaPlus className="text-[#D4AF37]" /> Add New Course
              </h3>
              <button onClick={() => setShowAddCourseModal(false)} className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl">&times;</button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Course Name *</label>
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                  className="w-full p-2 sm:p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] transition"
                  placeholder="Enter course name"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Duration *</label>
                <input
                  type="text"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  className="w-full p-2 sm:p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] transition"
                  placeholder="e.g., 6 Months"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Fee *</label>
                <input
                  type="text"
                  value={newCourse.fee}
                  onChange={(e) => setNewCourse({...newCourse, fee: e.target.value})}
                  className="w-full p-2 sm:p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] transition"
                  placeholder="e.g., Rs. 45,000"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  className="w-full p-2 sm:p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] resize-none"
                  rows="3"
                  placeholder="Course description"
                />
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
              <button onClick={handleAddCourse} className="flex-1 py-2 sm:py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] rounded-lg sm:rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300">
                Add Course
              </button>
              <button onClick={() => setShowAddCourseModal(false)} className="flex-1 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl font-semibold text-sm hover:bg-gray-50 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;