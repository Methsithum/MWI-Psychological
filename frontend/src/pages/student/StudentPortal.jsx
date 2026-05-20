import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submissionText, setSubmissionText] = useState('');

  // Mock Student Data
  const [student] = useState({
    id: 1,
    fullName: 'Amali Perera',
    email: 'amali@example.com',
    program: 'hrm',
    nic: '987654321V'
  });

  // Mock Courses Data
  const [courses] = useState([
    {
      id: 1,
      name: 'Diploma in HRM & Behavioral Psychology',
      duration: '6 Months',
      fee: 'Rs. 45,000',
      status: 'active',
      description: 'Professional diploma in HRM and Behavioral Psychology covering workplace psychology, employee behaviour, leadership, and organizational development.'
    },
    {
      id: 2,
      name: 'Diploma in Buddhist Counselling & Applied Buddhist Psychology',
      duration: '6 Months',
      fee: 'Rs. 45,000',
      status: 'active',
      description: 'Diploma combining Buddhist philosophy, counselling techniques, mindfulness practices, and applied psychological knowledge.'
    }
  ]);

  // Mock Announcements
  const [announcements] = useState([
    {
      id: 1,
      courseId: 1,
      title: 'Welcome to the Program!',
      description: 'Welcome all students to the Diploma in HRM & Behavioral Psychology. The first live lecture will be on January 15th at 7:00 PM.',
      link: 'https://zoom.us/j/123456789',
      date: '2024-01-10 10:00 AM'
    },
    {
      id: 2,
      courseId: 2,
      title: 'First Session Announcement',
      description: 'The introductory session for Buddhist Counselling will start on January 16th. Please join the Zoom link below.',
      link: 'https://zoom.us/j/987654321',
      date: '2024-01-10 11:00 AM'
    }
  ]);

  // Mock Videos
  const [videos] = useState([
    {
      id: 1,
      courseId: 1,
      title: 'Introduction to HRM',
      description: 'This lecture covers the basics of Human Resource Management and organizational behavior.',
      link: 'https://zoom.us/j/123456789',
      date: '2024-01-15'
    },
    {
      id: 2,
      courseId: 1,
      title: 'Employee Motivation Techniques',
      description: 'Learn about different motivation theories and how to apply them in workplace.',
      link: 'https://zoom.us/j/123456789',
      date: '2024-01-20'
    },
    {
      id: 3,
      courseId: 2,
      title: 'Introduction to Buddhist Psychology',
      description: 'Understanding the mind according to Buddhist teachings.',
      link: 'https://zoom.us/j/987654321',
      date: '2024-01-16'
    }
  ]);

  // Mock Documents
  const [documents] = useState([
    {
      id: 1,
      courseId: 1,
      title: 'HRM Fundamentals - Chapter 1',
      fileName: 'HRM_Chapter1.pdf',
      date: '2024-01-10'
    },
    {
      id: 2,
      courseId: 1,
      title: 'Employee Behaviour - Study Guide',
      fileName: 'Employee_Behaviour_Guide.pdf',
      date: '2024-01-12'
    },
    {
      id: 3,
      courseId: 2,
      title: 'Mindfulness Practices - PDF Notes',
      fileName: 'Mindfulness_Practices.pdf',
      date: '2024-01-11'
    }
  ]);

  // Mock Assignments
  const [assignments] = useState([
    {
      id: 1,
      courseId: 1,
      title: 'HRM Fundamentals Assignment',
      description: 'Write an essay about the importance of HRM in modern organizations.',
      dueDate: '2024-01-30',
      totalMarks: 100
    },
    {
      id: 2,
      courseId: 1,
      title: 'Employee Motivation Case Study',
      description: 'Analyze the given case study and provide motivation strategies.',
      dueDate: '2024-02-15',
      totalMarks: 100
    },
    {
      id: 3,
      courseId: 2,
      title: 'Mindfulness Reflection Paper',
      description: 'Write a reflection on your mindfulness practice experience.',
      dueDate: '2024-02-10',
      totalMarks: 100
    }
  ]);

  // Mock Submissions
  const [submissions, setSubmissions] = useState([]);

  // Mock Attendance
  const [attendance] = useState([
    { id: 1, studentId: 1, date: '2024-01-15 07:00 PM', status: 'present' },
    { id: 2, studentId: 1, date: '2024-01-16 07:00 PM', status: 'present' },
    { id: 3, studentId: 1, date: '2024-01-17 07:00 PM', status: 'present' },
    { id: 4, studentId: 1, date: '2024-01-18 07:00 PM', status: 'present' },
    { id: 5, studentId: 1, date: '2024-01-19 07:00 PM', status: 'present' }
  ]);

  // Handle assignment submission
  const handleSubmitAssignment = () => {
    if (!submissionFile && !submissionText) {
      alert('Please upload a file or enter your submission text');
      return;
    }

    const newSubmission = {
      id: Date.now(),
      assignmentId: selectedAssignment.id,
      studentId: student.id,
      studentName: student.fullName,
      submissionText: submissionText,
      file: submissionFile,
      fileName: submissionFile?.name,
      submittedDate: new Date().toLocaleString(),
      score: null,
      status: 'submitted'
    };

    setSubmissions([...submissions, newSubmission]);
    alert('Assignment submitted successfully!');
    setShowSubmitModal(false);
    setSubmissionFile(null);
    setSubmissionText('');
  };

  // Handle file upload for submission
  const handleSubmissionFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubmissionFile({ data: 'mock-data', name: file.name });
    }
  };

  // Get student's submissions for an assignment
  const getStudentSubmission = (assignmentId) => {
    return submissions.find(s => s.assignmentId === assignmentId && s.studentId === student.id);
  };

  // Get student's attendance records
  const getStudentAttendance = () => {
    return attendance.filter(a => a.studentId === student.id);
  };

  // Get attendance percentage
  const getAttendancePercentage = () => {
    const studentAttendance = getStudentAttendance();
    const totalDays = studentAttendance.length;
    if (totalDays === 0) return 0;
    return 100;
  };

  // Filter content by selected course
  const getCourseContent = (contentArray) => {
    if (!selectedCourse) return [];
    return contentArray.filter(item => item.courseId === selectedCourse.id);
  };

  // Get available courses for student
  const getStudentCourses = () => {
    const studentProgram = student.program;
    return courses.filter(course => {
      if (studentProgram === 'hrm' && course.name.includes('HRM')) return true;
      if (studentProgram === 'buddhist' && course.name.includes('Buddhist')) return true;
      return false;
    });
  };

  const studentCourses = getStudentCourses();
  const studentAttendance = getStudentAttendance();
  const attendancePercentage = getAttendancePercentage();
  const studentSubmissions = submissions.filter(s => s.studentId === student.id);

  // Handle document download
  const handleDownload = (doc) => {
    alert(`Downloading: ${doc.fileName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F5EF] to-white">
      {/* Header */}
      <header className="bg-[#0B1F3A] text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                <span className="text-[#0B1F3A] font-bold text-lg">PWI</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">Student Portal</h1>
                <p className="text-xs text-white/60">PWI Psychological Institute</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-full">
                <div className="w-8 h-8 bg-[#D4AF37]/30 rounded-full flex items-center justify-center">
                  <span className="text-sm">👨‍🎓</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{student.fullName}</p>
                  <p className="text-xs text-white/60">{student.program === 'hrm' ? 'HRM Program' : 'Buddhist Counselling'}</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/signin')}
                className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Welcome back, {student.fullName.split(' ')[0]}! 👋</h2>
              <p className="text-white/70 mt-1">Continue your psychology learning journey</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center px-4 py-2 bg-white/10 rounded-xl">
                <p className="text-2xl font-bold text-[#D4AF37]">{attendancePercentage}%</p>
                <p className="text-xs text-white/60">Attendance</p>
              </div>
              <div className="text-center px-4 py-2 bg-white/10 rounded-xl">
                <p className="text-2xl font-bold text-[#D4AF37]">{studentSubmissions.length}</p>
                <p className="text-xs text-white/60">Submissions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Selection Cards */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#0B1F3A] mb-4">My Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentCourses.map(course => (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`cursor-pointer rounded-xl p-4 transition-all duration-300 ${
                  selectedCourse?.id === course.id
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] shadow-lg scale-102'
                    : 'bg-white border border-[#D4AF37]/20 hover:shadow-lg'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${selectedCourse?.id === course.id ? 'bg-white/20' : 'bg-[#D4AF37]/10'}`}>
                    📚
                  </div>
                  <div>
                    <h4 className={`font-bold ${selectedCourse?.id === course.id ? 'text-white' : 'text-[#0B1F3A]'}`}>
                      {course.name}
                    </h4>
                    <p className={`text-xs ${selectedCourse?.id === course.id ? 'text-white/80' : 'text-gray-500'}`}>
                      {course.duration} • {course.fee}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedCourse ? (
          <>
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
              {[
                { id: 'courses', icon: '📖', label: 'Course Content' },
                { id: 'videos', icon: '🎥', label: 'Video Lectures' },
                { id: 'materials', icon: '📚', label: 'Study Materials' },
                { id: 'assignments', icon: '📝', label: 'Assignments' },
                { id: 'attendance', icon: '✅', label: 'Attendance' },
                { id: 'announcements', icon: '📢', label: 'Announcements' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-t-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-[#D4AF37] text-[#0B1F3A] shadow-md'
                      : 'text-gray-600 hover:text-[#D4AF37] hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Course Content Tab */}
            {activeTab === 'courses' && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#D4AF37]/20">
                <h3 className="text-xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#D4AF37] rounded-full"></span>
                  {selectedCourse.name} - Course Overview
                </h3>
                <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-[#F8F4EC] rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">⏱️</div>
                    <p className="font-semibold text-[#0B1F3A]">Duration</p>
                    <p className="text-sm text-gray-500">{selectedCourse.duration}</p>
                  </div>
                  <div className="bg-[#F8F4EC] rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">💻</div>
                    <p className="font-semibold text-[#0B1F3A]">Mode</p>
                    <p className="text-sm text-gray-500">Online Learning</p>
                  </div>
                  <div className="bg-[#F8F4EC] rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">🎓</div>
                    <p className="font-semibold text-[#0B1F3A]">Certificate</p>
                    <p className="text-sm text-gray-500">Professional Diploma</p>
                  </div>
                </div>
              </div>
            )}

            {/* Video Lectures Tab */}
            {activeTab === 'videos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {getCourseContent(videos).length === 0 ? (
                  <div className="col-span-2 bg-white rounded-2xl p-10 text-center">
                    <div className="text-5xl mb-3">🎥</div>
                    <p className="text-gray-500">No videos uploaded yet</p>
                  </div>
                ) : (
                  getCourseContent(videos).map(video => (
                    <div key={video.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#D4AF37]/20">
                      <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] p-4">
                        <h3 className="font-bold text-white">{video.title}</h3>
                        <p className="text-white/60 text-xs mt-1">{video.date}</p>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                        <a 
                          href={video.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-[#0B1F3A] rounded-lg font-semibold hover:bg-[#C49B2C] transition"
                        >
                          🎬 Watch Lecture
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Study Materials Tab */}
            {activeTab === 'materials' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getCourseContent(documents).length === 0 ? (
                  <div className="col-span-2 bg-white rounded-2xl p-10 text-center">
                    <div className="text-5xl mb-3">📚</div>
                    <p className="text-gray-500">No study materials uploaded yet</p>
                  </div>
                ) : (
                  getCourseContent(documents).map(doc => (
                    <div key={doc.id} className="bg-white rounded-xl p-5 shadow-md flex items-center gap-4 hover:shadow-lg transition border border-[#D4AF37]/20">
                      <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center text-3xl">📄</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#0B1F3A]">{doc.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">{doc.date}</p>
                      </div>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="px-4 py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-lg text-sm font-semibold hover:bg-[#C49B2C] transition"
                      >
                        Download
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Assignments Tab */}
            {activeTab === 'assignments' && (
              <div className="space-y-5">
                {getCourseContent(assignments).length === 0 ? (
                  <div className="bg-white rounded-2xl p-10 text-center">
                    <div className="text-5xl mb-3">📝</div>
                    <p className="text-gray-500">No assignments posted yet</p>
                  </div>
                ) : (
                  getCourseContent(assignments).map(assignment => {
                    const submission = getStudentSubmission(assignment.id);
                    const isSubmitted = !!submission;
                    
                    return (
                      <div key={assignment.id} className="bg-white rounded-2xl shadow-lg p-6 border border-[#D4AF37]/20">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-[#0B1F3A]">{assignment.title}</h3>
                            <p className="text-gray-600 text-sm mt-2">{assignment.description}</p>
                            <div className="flex flex-wrap gap-4 mt-3">
                              <span className="text-xs text-gray-500">📅 Due: {assignment.dueDate}</span>
                              <span className="text-xs text-gray-500">⭐ Total Marks: {assignment.totalMarks}</span>
                            </div>
                            {isSubmitted && (
                              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                                <p className="text-green-700 text-sm flex items-center gap-2">
                                  ✅ Submitted on {submission.submittedDate}
                                </p>
                              </div>
                            )}
                          </div>
                          {!isSubmitted && (
                            <button
                              onClick={() => {
                                setSelectedAssignment(assignment);
                                setShowSubmitModal(true);
                              }}
                              className="px-6 py-2.5 bg-[#D4AF37] text-[#0B1F3A] rounded-lg font-semibold hover:bg-[#C49B2C] transition whitespace-nowrap"
                            >
                              Submit Assignment
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div>
                <div className="bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] rounded-2xl p-6 text-white mb-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm opacity-90">Your Attendance Summary</p>
                      <p className="text-3xl font-bold mt-1">{attendancePercentage}%</p>
                    </div>
                    <div className="w-48 h-2 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full" style={{ width: `${attendancePercentage}%` }}></div>
                    </div>
                    <p className="text-sm opacity-90">✓ All sessions recorded automatically</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-[#0B1F3A] mb-4">Attendance History</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#F8F4EC]">
                        <tr>
                          <th className="text-left p-3 text-sm">Date</th>
                          <th className="text-left p-3 text-sm">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentAttendance.length === 0 ? (
                          <tr>
                            <td colSpan="2" className="text-center p-8 text-gray-500">No attendance records yet</td>
                          </tr>
                        ) : (
                          studentAttendance.map(record => (
                            <tr key={record.id} className="border-b border-gray-100">
                              <td className="p-3 text-sm">{record.date}</td>
                              <td className="p-3 text-sm">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Present</span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-400 mt-4 text-center">
                    * Attendance is automatically marked when you log into your dashboard
                  </p>
                </div>
              </div>
            )}

            {/* Announcements Tab */}
            {activeTab === 'announcements' && (
              <div className="space-y-4">
                {getCourseContent(announcements).length === 0 ? (
                  <div className="bg-white rounded-2xl p-10 text-center">
                    <div className="text-5xl mb-3">📢</div>
                    <p className="text-gray-500">No announcements yet</p>
                  </div>
                ) : (
                  getCourseContent(announcements).map(announcement => (
                    <div key={announcement.id} className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-[#D4AF37]">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-[#0B1F3A] text-lg">{announcement.title}</h3>
                        <span className="text-xs text-gray-400">{announcement.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{announcement.description}</p>
                      {announcement.link && (
                        <a href={announcement.link} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] text-sm hover:underline flex items-center gap-1">
                          🔗 Join Link: {announcement.link}
                        </a>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">Select a Course</h3>
            <p className="text-gray-500">Please select a course from above to view content</p>
          </div>
        )}
      </div>

      {/* Submit Assignment Modal */}
      {showSubmitModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowSubmitModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#0B1F3A]">Submit Assignment</h3>
              <button onClick={() => setShowSubmitModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0B1F3A] mb-1">Assignment</label>
                <p className="text-gray-700 font-medium">{selectedAssignment.title}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#0B1F3A] mb-1">Your Answer / Submission Text</label>
                <textarea
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] resize-none"
                  rows="5"
                  placeholder="Type your answer here..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0B1F3A] mb-1">Or Upload File</label>
                <input
                  type="file"
                  onChange={handleSubmissionFile}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                  accept=".pdf,.doc,.docx,.jpg,.png,.txt"
                />
                {submissionFile && <p className="text-xs text-green-600 mt-1">✓ File selected: {submissionFile.name}</p>}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmitAssignment}
                className="flex-1 py-2.5 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-semibold hover:bg-[#C49B2C] transition"
              >
                Submit
              </button>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#0B1F3A] text-white mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">© 2025 PWI Psychological Institute. All rights reserved.</p>
          <p className="text-xs text-gray-500 mt-1">Empowering Minds Through Psychology</p>
        </div>
      </footer>
    </div>
  );
};

export default StudentPortal;