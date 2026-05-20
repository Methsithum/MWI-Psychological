import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSlipModal, setShowSlipModal] = useState(false);
  const [registrationRequests, setRegistrationRequests] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [systemActivities, setSystemActivities] = useState([]);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    duration: '',
    fee: '',
    description: ''
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    // Load registration requests
    const requests = JSON.parse(localStorage.getItem('registrationRequests') || '[]');
    setRegistrationRequests(requests);

    // Load approved students
    const approved = JSON.parse(localStorage.getItem('approvedUsers') || '[]');
    setApprovedStudents(approved);

    // Load courses
    const savedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    if (savedCourses.length === 0) {
      // Default courses
      const defaultCourses = [
        {
          id: 1,
          name: 'Diploma in HRM & Behavioral Psychology',
          duration: '6 Months',
          fee: 'Rs. 45,000',
          students: 45,
          status: 'active',
          description: 'Professional diploma in HRM and Behavioral Psychology'
        },
        {
          id: 2,
          name: 'Diploma in Buddhist Counselling & Applied Buddhist Psychology',
          duration: '6 Months',
          fee: 'Rs. 45,000',
          students: 38,
          status: 'active',
          description: 'Diploma in Buddhist Counselling and Psychology'
        }
      ];
      setCourses(defaultCourses);
      localStorage.setItem('courses', JSON.stringify(defaultCourses));
    } else {
      setCourses(savedCourses);
    }

    // Load system activities
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

  // Add system activity
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

  // Approve student
  const handleApprove = (studentId) => {
    const student = registrationRequests.find(s => s.id === studentId);
    if (student) {
      const approvedUser = {
        ...student,
        status: 'approved',
        approvedDate: new Date().toLocaleString()
      };
      const updatedApproved = [...approvedStudents, approvedUser];
      setApprovedStudents(updatedApproved);
      localStorage.setItem('approvedUsers', JSON.stringify(updatedApproved));

      const updatedRequests = registrationRequests.filter(s => s.id !== studentId);
      setRegistrationRequests(updatedRequests);
      localStorage.setItem('registrationRequests', JSON.stringify(updatedRequests));

      addActivity(`Approved student: ${student.fullName}`, 'approval');
      alert(`Student ${student.fullName} has been approved successfully! They can now login using their email and NIC number.`);
    }
  };

  // Reject student
  const handleReject = (studentId) => {
    const student = registrationRequests.find(s => s.id === studentId);
    const updatedRequests = registrationRequests.filter(s => s.id !== studentId);
    setRegistrationRequests(updatedRequests);
    localStorage.setItem('registrationRequests', JSON.stringify(updatedRequests));
    
    addActivity(`Rejected student: ${student?.fullName}`, 'rejection');
    alert(`Student ${student?.fullName} has been rejected.`);
  };

  // View payment slip
  const handleViewSlip = (student) => {
    setSelectedUser(student);
    setShowSlipModal(true);
  };

  // Add new course
  const handleAddCourse = () => {
    if (newCourse.name && newCourse.duration && newCourse.fee) {
      const course = {
        id: Date.now(),
        ...newCourse,
        students: 0,
        status: 'active'
      };
      const updatedCourses = [...courses, course];
      setCourses(updatedCourses);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      addActivity(`Added new course: ${newCourse.name}`, 'course');
      setShowAddCourseModal(false);
      setNewCourse({ name: '', duration: '', fee: '', description: '' });
      alert('Course added successfully!');
    } else {
      alert('Please fill all required fields');
    }
  };

  // Delete course
  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const course = courses.find(c => c.id === courseId);
      const updatedCourses = courses.filter(c => c.id !== courseId);
      setCourses(updatedCourses);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      addActivity(`Deleted course: ${course?.name}`, 'course');
      alert('Course deleted successfully!');
    }
  };

  // Toggle course status
  const handleToggleCourseStatus = (courseId) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const newStatus = course.status === 'active' ? 'inactive' : 'active';
        addActivity(`${newStatus === 'active' ? 'Activated' : 'Deactivated'} course: ${course.name}`, 'course');
        return { ...course, status: newStatus };
      }
      return course;
    });
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  // Stats calculation
  const stats = [
    { title: 'Total Students', value: approvedStudents.length.toString(), icon: '👨‍🎓', change: `+${approvedStudents.length}`, color: 'from-[#D4AF37] to-[#C49B2C]' },
    { title: 'Pending Approvals', value: registrationRequests.length.toString(), icon: '⏳', change: `${registrationRequests.length} waiting`, color: 'from-[#0B1F3A] to-[#1A3A5A]' },
    { title: 'Active Courses', value: courses.filter(c => c.status === 'active').length.toString(), icon: '📚', change: '', color: 'from-[#D4AF37] to-[#C49B2C]' },
    { title: 'Total Revenue', value: 'Rs. ' + (approvedStudents.length * 1500).toLocaleString(), icon: '💰', change: '+12%', color: 'from-[#0B1F3A] to-[#1A3A5A]' },
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'registration': return '📝';
      case 'payment': return '💳';
      case 'approval': return '✅';
      case 'rejection': return '❌';
      case 'course': return '📖';
      default: return '📌';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      {/* Admin Navbar */}
      <nav className="bg-[#0B1F3A] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                <span className="text-[#0B1F3A] font-bold text-lg">PWI</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">Admin Dashboard</h1>
                <p className="text-xs text-white/60">PWI Psychological Institute</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">👤</span>
                </div>
                <span className="text-sm hidden md:block">Administrator</span>
              </div>
              <button 
                onClick={() => {
                  addActivity('Admin logged out', 'system');
                  navigate('/');
                }}
                className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-xl min-h-screen border-r border-[#D4AF37]/20">
          <div className="p-4">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                  activeTab === 'overview' 
                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' 
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="text-xl">📊</span>
                <span className="font-medium">Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                  activeTab === 'users' 
                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' 
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="text-xl">👥</span>
                <span className="font-medium">Manage Users</span>
                {registrationRequests.length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {registrationRequests.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                  activeTab === 'courses' 
                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' 
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="text-xl">📚</span>
                <span className="font-medium">Manage Courses</span>
              </button>

              <button
                onClick={() => setActiveTab('activities')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                  activeTab === 'activities' 
                    ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' 
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="text-xl">📋</span>
                <span className="font-medium">System Activities</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className={`bg-gradient-to-r ${stat.color} rounded-2xl p-6 text-white shadow-lg`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80 text-sm">{stat.title}</p>
                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                        {stat.change && <p className="text-white/60 text-xs mt-1">{stat.change}</p>}
                      </div>
                      <div className="text-4xl">{stat.icon}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#D4AF37]/20">
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-4">Recent System Activities</h3>
                <div className="space-y-3">
                  {systemActivities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 bg-[#F8F4EC] rounded-xl">
                      <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#0B1F3A]">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <span className="text-xs text-gray-400">by {activity.user}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Manage Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">Manage Users</h2>
              
              {/* Pending Approvals Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#D4AF37]/20 mb-8">
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                  <span>⏳</span> Pending Approvals
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{registrationRequests.length}</span>
                </h3>
                
                {registrationRequests.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No pending approvals</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#F8F4EC]">
                        <tr>
                          <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Name</th>
                          <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Email</th>
                          <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Phone</th>
                          <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Program</th>
                          <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Payment Slip</th>
                          <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registrationRequests.map((student) => (
                          <tr key={student.id} className="border-b border-gray-100 hover:bg-[#F8F4EC]/50">
                            <td className="p-3 text-sm">{student.fullName}</td>
                            <td className="p-3 text-sm">{student.email}</td>
                            <td className="p-3 text-sm">{student.phone}</td>
                            <td className="p-3 text-sm">{student.program === 'hrm' ? 'Diploma in HRM & Behavioral Psychology' : 'Diploma in Buddhist Counselling'}</td>
                            <td className="p-3 text-sm">
                              <button
                                onClick={() => handleViewSlip(student)}
                                className="text-[#D4AF37] hover:underline text-sm"
                              >
                                View Slip
                              </button>
                            </td>
                            <td className="p-3 text-sm flex gap-2">
                              <button
                                onClick={() => handleApprove(student.id)}
                                className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600 transition"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(student.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Approved Students Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#D4AF37]/20">
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                  <span>✅</span> Approved Students ({approvedStudents.length})
                </h3>
                
                {approvedStudents.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No approved students yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#F8F4EC]">
                        <tr>
                          <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Name</th>
                          <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Email</th>
                          <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Phone</th>
                          <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Program</th>
                          <th className="text-left p-3 text-sm font-semibold text-[#0B1F3A]">Approved Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {approvedStudents.map((student) => (
                          <tr key={student.id} className="border-b border-gray-100 hover:bg-[#F8F4EC]/50">
                            <td className="p-3 text-sm">{student.fullName}</td>
                            <td className="p-3 text-sm">{student.email}</td>
                            <td className="p-3 text-sm">{student.phone}</td>
                            <td className="p-3 text-sm">{student.program === 'hrm' ? 'Diploma in HRM & Behavioral Psychology' : 'Diploma in Buddhist Counselling'}</td>
                            <td className="p-3 text-sm">{student.approvedDate || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Manage Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#0B1F3A]">Manage Courses</h2>
                <button
                  onClick={() => setShowAddCourseModal(true)}
                  className="px-4 py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-semibold hover:bg-[#C49B2C] transition"
                >
                  + Add New Course
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-2xl shadow-lg p-6 border border-[#D4AF37]/20">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#0B1F3A]">{course.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        course.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {course.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-gray-600">📅 Duration: {course.duration}</p>
                        <p className="text-sm text-gray-600 mt-1">💰 Fee: {course.fee}</p>
                        <p className="text-sm text-gray-600 mt-1">👨‍🎓 Enrolled: {course.students} students</p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleToggleCourseStatus(course.id)}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                          course.status === 'active' 
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {course.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System Activities Tab */}
          {activeTab === 'activities' && (
            <div>
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">System Activities</h2>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#D4AF37]/20">
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {systemActivities.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No activities recorded</p>
                  ) : (
                    systemActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-4 bg-[#F8F4EC] rounded-xl hover:shadow-md transition">
                        <span className="text-3xl">{getActivityIcon(activity.type)}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#0B1F3A]">{activity.action}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-400">by {activity.user}</span>
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

      {/* Payment Slip Modal */}
      {showSlipModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowSlipModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#0B1F3A]">Payment Slip</h3>
              <button onClick={() => setShowSlipModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="space-y-3">
              <p><strong>Student:</strong> {selectedUser.fullName}</p>
              <p><strong>Transaction ID:</strong> {selectedUser.transactionId}</p>
              <p><strong>Amount:</strong> Rs. 1,500</p>
              {selectedUser.paymentSlip ? (
                <img src={selectedUser.paymentSlip} alt="Payment Slip" className="w-full rounded-lg border mt-3" />
              ) : (
                <p className="text-red-500">No slip uploaded</p>
              )}
            </div>
            <button
              onClick={() => setShowSlipModal(false)}
              className="w-full mt-6 py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddCourseModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#0B1F3A]">Add New Course</h3>
              <button onClick={() => setShowAddCourseModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0B1F3A] mb-1">Course Name *</label>
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Enter course name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0B1F3A] mb-1">Duration *</label>
                <input
                  type="text"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                  placeholder="e.g., 6 Months"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0B1F3A] mb-1">Fee *</label>
                <input
                  type="text"
                  value={newCourse.fee}
                  onChange={(e) => setNewCourse({...newCourse, fee: e.target.value})}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                  placeholder="e.g., Rs. 45,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0B1F3A] mb-1">Description</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] resize-none"
                  rows="3"
                  placeholder="Course description"
                ></textarea>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddCourse}
                className="flex-1 py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-semibold hover:bg-[#C49B2C] transition"
              >
                Add Course
              </button>
              <button
                onClick={() => setShowAddCourseModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
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