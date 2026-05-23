import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBook, FaVideo, FaFileAlt, FaClipboardList, FaCheckCircle, FaBullhorn,
  FaGraduationCap, FaClock, FaLaptop, FaDownload, FaUpload, FaEye,
  FaCalendarAlt, FaStar, FaUserGraduate, FaChartLine, FaBell,
  FaChevronRight, FaSpinner, FaBars, FaTimes, FaHome, FaUser,
  FaSignOutAlt, FaTachometerAlt, FaWhatsapp, FaEnvelope, FaPhoneAlt,
  FaUserCircle, FaCog, FaChevronDown
} from 'react-icons/fa';
import { MdOutlineAssignment, MdOutlineDescription } from 'react-icons/md';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import api from '../../utils/api';
import auth from '../../utils/auth';
import StudentTopbar from '../../components/student/StudentTopbar';
import StudentProfile from './StudentProfile';
import StudentSettings from './StudentSettings';

const StudentPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [attendanceSubmitting, setAttendanceSubmitting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const [student, setStudent] = useState(() => {
    const user = auth.getUser();
    return {
      id: user?.id || user?._id || 'student',
      fullName: user?.fullName || 'Student',
      email: user?.email || '',
      course: user?.course || null,
      programme: user?.course?.title || user?.programme || '',
      nic: user?.nic || '',
      phone: user?.phone || '',
      address: user?.address || '',
      whatsapp: user?.whatsapp || '',
      qualification: user?.qualification || '',
    };
  });

  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [attendance, setAttendance] = useState([]);

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownOpen && !event.target.closest('.user-dropdown')) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdownOpen]);

  const navItems = [
    { id: 'dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { id: 'courses', icon: <FaBook />, label: 'My Courses' },
    { id: 'videos', icon: <FaVideo />, label: 'Video Lectures' },
    { id: 'materials', icon: <FaFileAlt />, label: 'Study Materials' },
    { id: 'assignments', icon: <FaClipboardList />, label: 'Assignments' },
    { id: 'attendance', icon: <FaCheckCircle />, label: 'Attendance' },
    { id: 'announcements', icon: <FaBullhorn />, label: 'Announcements' },
  ];

  const loadCourseContent = async (course) => {
    if (!course?.courseId) return;
    try {
      const [videosRes, materialsRes, assignmentsRes, attendanceRes, notificationsRes, submissionsRes] = await Promise.all([
        api.getCourseVideos(course.courseId),
        api.getCourseMaterials(course.courseId),
        api.getCourseAssignments(course.courseId),
        api.getCourseAttendance(course.courseId),
        api.getNotifications().catch(() => null),
        api.getMySubmissions(course.courseId).catch(() => ({ data: [] })),
      ]);

      setVideos((videosRes?.data || []).map((video, idx) => ({
        id: video._id || idx,
        courseId: course.courseId || course.id,
        title: video.title,
        description: video.description || '',
        link: video.videoUrl || video.link || '#',
        date: video.createdAt ? new Date(video.createdAt).toLocaleDateString() : '',
      })));

      setDocuments((materialsRes?.data || []).map((material, idx) => ({
        id: material._id || idx,
        courseId: course.courseId || course.id,
        title: material.title,
        fileUrl: material.fileUrl ? String(material.fileUrl).replace(/\\/g, '/') : '',
        fileName: material.fileName || 'File',
        date: material.createdAt ? new Date(material.createdAt).toLocaleDateString() : '',
      })));

      setAssignments((assignmentsRes?.data || []).map((assignment, idx) => ({
        id: assignment._id || idx,
        courseId: course.courseId || course.id,
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : '',
        totalMarks: assignment.totalMarks || 0,
        attachmentUrl: assignment.attachmentUrl ? String(assignment.attachmentUrl).replace(/\\/g, '/') : '',
        attachmentName: assignment.attachmentName || '',
      })));

      setSubmissions((submissionsRes?.data || []).map((submission, idx) => ({
        id: submission._id || idx,
        assignmentId: submission.assignment?._id || submission.assignment,
        studentId: submission.student?._id || submission.student || student.id,
        studentName: student.fullName,
        submissionText: submission.remarks || '',
        fileUrl: submission.fileUrl ? String(submission.fileUrl).replace(/\\/g, '/') : '',
        fileName: submission.fileName || (submission.fileUrl ? String(submission.fileUrl).split('/').pop() : ''),
        submittedDate: submission.submittedAt ? new Date(submission.submittedAt).toLocaleString() : (submission.createdAt ? new Date(submission.createdAt).toLocaleString() : ''),
        score: submission.grade ? Number(submission.grade) : null,
        status: 'submitted',
      })));

      setAttendance((attendanceRes?.data || []).map((record, idx) => ({
        id: record._id || idx,
        studentId: record.student?._id || record.student || idx,
        date: record.date || record.createdAt,
        displayDate: record.date || record.createdAt ? new Date(record.date || record.createdAt).toLocaleString() : '',
        status: record.status || 'present',
      })));

      setAnnouncements((notificationsRes?.data || [])
        .filter((notification) => notification.type === 'announcement')
        .map((notification, idx) => ({
          id: notification._id || idx,
          courseId: notification.metadata?.courseId || course.courseId || course.id,
          title: notification.title || notification.metadata?.title || notification.subject || 'Notification',
          description: notification.message || notification.description || '',
          link: notification.link || notification.metadata?.link || '',
          date: notification.createdAt ? new Date(notification.createdAt).toLocaleString() : new Date().toLocaleString(),
        })));
    } catch (error) {
      console.error('Failed to load course content', error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const coursesRes = await api.getCourses();
        const backendCourses = Array.isArray(coursesRes?.data) ? coursesRes.data : [];
        const normalizedCourses = backendCourses.map((course, index) => ({
          id: index + 1,
          courseId: course._id,
          name: course.title || course.name || 'Course',
          duration: course.duration || '6 Months',
          fee: typeof course.fee === 'number' ? `Rs. ${course.fee.toLocaleString()}` : (course.fee || 'Rs. 0'),
          status: course.status === 'published' ? 'active' : 'inactive',
          description: course.description || '',
        }));

        setCourses(normalizedCourses);
        const userCourse = auth.getUser()?.course;
        const preferredBackendCourse = backendCourses.find((course) => {
          const courseId = String(course._id);
          return courseId === String(userCourse?.id || userCourse?._id || userCourse) ||
            course.title === userCourse?.title ||
            course.code === userCourse?.code;
        }) || backendCourses[0];

        if (preferredBackendCourse) {
          const preferredCourse = normalizedCourses.find((course) => course.courseId === String(preferredBackendCourse._id)) || normalizedCourses[0];
          setSelectedCourse(preferredCourse);
          setStudent((prev) => ({
            ...prev,
            course: {
              id: preferredBackendCourse._id,
              title: preferredBackendCourse.title,
              code: preferredBackendCourse.code,
            },
            programme: preferredBackendCourse.title || preferredCourse?.name || '',
          }));
          await loadCourseContent(preferredCourse);
        }
      } catch (error) {
        console.error('Failed to load student dashboard data', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      setStudent((prev) => ({
        ...prev,
        programme: selectedCourse.name,
      }));
      loadCourseContent(selectedCourse);
    }
  }, [selectedCourse]);

  const handleSubmitAssignment = async () => {
    if (!submissionFile && !submissionText) {
      alert('Please upload a file or enter your submission text');
      return;
    }

    try {
      const payload = new FormData();
      payload.append('assignment', selectedAssignment.id);
      payload.append('remarks', submissionText || '');
      if (submissionFile) {
        payload.append('file', submissionFile, submissionFile.name || 'submission');
      }

      const response = await api.submitAssignment(payload);
      if (!response?.success) {
        throw new Error(response?.message || 'Failed to submit assignment');
      }

      alert('Assignment submitted successfully!');
      setShowSubmitModal(false);
      setSubmissionFile(null);
      setSubmissionText('');
      await loadCourseContent(selectedCourse);
    } catch (error) {
      console.error('Assignment submission error:', error);
      alert(error?.message || 'Failed to submit assignment');
    }
  };

  const handleSubmissionFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubmissionFile(file);
    }
  };

  const getStudentSubmission = (assignmentId) => {
    return submissions.find((s) => String(s.assignmentId) === String(assignmentId) && String(s.studentId) === String(student.id));
  };

  const getStudentAttendance = () => {
    return attendance.filter((a) => String(a.studentId) === String(student.id));
  };

  const getAttendancePercentage = () => {
    const studentAttendance = getStudentAttendance();
    const totalDays = studentAttendance.length;
    if (totalDays === 0) return 0;
    const attendedDays = studentAttendance.filter((record) => record.status === 'present' || record.status === 'late').length;
    return Math.round((attendedDays / totalDays) * 100);
  };

  const getAttendanceBadgeStyle = (status) => {
    if (status === 'late') return 'bg-yellow-100 text-yellow-700';
    if (status === 'absent') return 'bg-red-100 text-red-700';
    return 'bg-green-100 text-green-700';
  };

  const getTodayAttendanceRecord = () => {
    const today = new Date().toDateString();
    return studentAttendance.find((record) => record.date && new Date(record.date).toDateString() === today);
  };

  const handleMarkAttendance = async () => {
    if (!selectedCourse?.courseId) return;
    try {
      setAttendanceSubmitting(true);
      const response = await api.markAttendance({
        course: selectedCourse.courseId,
        status: 'present',
      });
      if (!response?.success) {
        throw new Error(response?.message || 'Failed to mark attendance');
      }
      await loadCourseContent(selectedCourse);
      alert('Attendance marked successfully');
    } catch (error) {
      console.error('Attendance mark error:', error);
      alert(error?.message || 'Failed to mark attendance');
    } finally {
      setAttendanceSubmitting(false);
    }
  };

  const getCourseContent = (contentArray) => {
    if (!selectedCourse) return [];
    return contentArray.filter(item => String(item.courseId) === String(selectedCourse.courseId || selectedCourse.id));
  };

  const getStudentCourses = () => {
    if (student.course?.id) {
      return courses.filter((course) => String(course.courseId) === String(student.course.id));
    }
    if (student.course?.title) {
      return courses.filter((course) => course.name === student.course.title);
    }
    return courses;
  };

  const studentCourses = getStudentCourses();
  const studentAttendance = getStudentAttendance();
  const attendancePercentage = getAttendancePercentage();
  const studentSubmissions = submissions.filter(s => s.studentId === student.id);

  const handleDownload = (doc) => {
    api.downloadFile(doc.fileUrl, doc.fileName || 'document', { type: 'material', id: doc.id })
      .catch((error) => {
        alert(error?.message || 'Failed to download file');
      });
  };

  const handleUpdateProfile = (updatedData) => {
    setStudent(prev => ({ ...prev, ...updatedData }));
    const user = auth.getUser();
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return <StudentProfile student={student} onUpdate={handleUpdateProfile} />;
      
      case 'settings':
        return <StudentSettings student={student} onUpdate={handleUpdateProfile} />;
      
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold">Welcome back, {student.fullName.split(' ')[0]}! 👋</h2>
              <p className="text-white/70 mt-1">Continue your psychology learning journey</p>
              <div className="flex gap-4 mt-4">
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <FaVideo />, label: 'Video Lectures', value: getCourseContent(videos).length, color: 'from-blue-500 to-blue-600' },
                { icon: <FaFileAlt />, label: 'Study Materials', value: getCourseContent(documents).length, color: 'from-green-500 to-green-600' },
                { icon: <FaClipboardList />, label: 'Assignments', value: getCourseContent(assignments).length, color: 'from-orange-500 to-orange-600' },
                { icon: <FaBullhorn />, label: 'Announcements', value: getCourseContent(announcements).length, color: 'from-purple-500 to-purple-600' },
              ].map((stat, idx) => (
                <div key={idx} className={`bg-gradient-to-r ${stat.color} rounded-xl p-4 text-white shadow-lg`}>
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs opacity-90">{stat.label}</p>
                </div>
              ))}
            </div>

            {selectedCourse && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#D4AF37]/20">
                <h3 className="text-lg font-bold text-[#0B1F3A] mb-3 flex items-center gap-2">
                  <FaGraduationCap className="text-[#D4AF37]" />
                  Current Course
                </h3>
                <p className="font-semibold text-[#0B1F3A]">{selectedCourse.name}</p>
                <p className="text-sm text-gray-500 mt-1">{selectedCourse.duration} • {selectedCourse.fee}</p>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: `${attendancePercentage}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Overall Progress: {attendancePercentage}%</p>
              </div>
            )}
          </div>
        );

      case 'courses':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
              <FaBook className="text-[#D4AF37]" />
              My Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentCourses.map(course => (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`cursor-pointer rounded-xl p-5 transition-all duration-300 ${
                    selectedCourse?.id === course.id
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-white shadow-xl'
                      : 'bg-white border border-[#D4AF37]/20 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      selectedCourse?.id === course.id ? 'bg-white/20' : 'bg-[#D4AF37]/10'
                    }`}>
                      <FaGraduationCap className={selectedCourse?.id === course.id ? 'text-white' : 'text-[#D4AF37]'} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold ${selectedCourse?.id === course.id ? 'text-white' : 'text-[#0B1F3A]'}`}>
                        {course.name}
                      </h4>
                      <p className={`text-xs flex items-center gap-2 mt-1 ${selectedCourse?.id === course.id ? 'text-white/80' : 'text-gray-500'}`}>
                        <FaClock size={10} /> {course.duration} • <FaStar size={10} /> {course.fee}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'videos':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
              <FaVideo className="text-[#D4AF37]" />
              Video Lectures
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {getCourseContent(videos).length === 0 ? (
                <div className="col-span-2 bg-white rounded-2xl p-12 text-center">
                  <FaVideo className="text-5xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No videos uploaded yet</p>
                </div>
              ) : (
                getCourseContent(videos).map(video => (
                  <div key={video.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-[#D4AF37]/20">
                    <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] p-4">
                      <h3 className="font-bold text-white">{video.title}</h3>
                      <p className="text-white/60 text-xs mt-1">{video.date}</p>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                      <a href={video.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-[#0B1F3A] rounded-lg font-semibold hover:bg-[#C49B2C] transition">
                        <FaEye /> Watch Lecture
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'materials':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
              <FaFileAlt className="text-[#D4AF37]" />
              Study Materials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getCourseContent(documents).length === 0 ? (
                <div className="col-span-2 bg-white rounded-2xl p-12 text-center">
                  <FaFileAlt className="text-5xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No study materials uploaded yet</p>
                </div>
              ) : (
                getCourseContent(documents).map(doc => (
                  <div key={doc.id} className="bg-white rounded-xl p-5 shadow-md flex items-center gap-4 hover:shadow-xl transition">
                    <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center text-3xl">
                      <FaFileAlt className="text-[#D4AF37]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#0B1F3A]">{doc.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">{doc.date}</p>
                    </div>
                    <button onClick={() => handleDownload(doc)} className="px-4 py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-lg text-sm font-semibold hover:bg-[#C49B2C] transition flex items-center gap-2">
                      <FaDownload /> Download
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'assignments':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
              <FaClipboardList className="text-[#D4AF37]" />
              Assignments
            </h2>
            <div className="space-y-5">
              {getCourseContent(assignments).length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <MdOutlineAssignment className="text-5xl text-gray-300 mx-auto mb-3" />
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
                            <span className="text-xs text-gray-500 flex items-center gap-1"><FaCalendarAlt /> Due: {assignment.dueDate}</span>
                            <span className="text-xs text-gray-500 flex items-center gap-1"><FaStar /> Total Marks: {assignment.totalMarks}</span>
                          </div>
                          {isSubmitted && (
                            <div className="mt-3 p-3 bg-green-50 rounded-lg">
                              <p className="text-green-700 text-sm flex items-center gap-2"><FaCheckCircle /> Submitted on {submission.submittedDate}</p>
                            </div>
                          )}
                        </div>
                        {!isSubmitted && (
                          <button onClick={() => { setSelectedAssignment(assignment); setShowSubmitModal(true); }} 
                            className="px-6 py-2.5 bg-[#D4AF37] text-[#0B1F3A] rounded-lg font-semibold hover:bg-[#C49B2C] transition whitespace-nowrap flex items-center gap-2">
                            <FaUpload /> Submit Assignment
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
              <FaCheckCircle className="text-[#D4AF37]" />
              Attendance
            </h2>
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] rounded-2xl p-6 text-white mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div><p className="text-sm opacity-90">Your Attendance Summary</p><p className="text-3xl font-bold mt-1">{attendancePercentage}%</p></div>
                <div className="flex-1 max-w-xs"><div className="h-2 bg-white/30 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full" style={{ width: `${attendancePercentage}%` }}></div></div></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div><h3 className="text-lg font-bold text-[#0B1F3A]">Mark Today's Attendance</h3><p className="text-sm text-gray-500">Tap once when you are present for the selected course.</p></div>
                {getTodayAttendanceRecord() ? (
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700"><FaCheckCircle className="inline mr-2" /> Already marked</span>
                ) : (
                  <button onClick={handleMarkAttendance} disabled={attendanceSubmitting} className="px-6 py-2.5 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2">
                    {attendanceSubmitting ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                    {attendanceSubmitting ? 'Marking...' : 'Mark Attendance'}
                  </button>
                )}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-[#0B1F3A] mb-4">Attendance History</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F4EC]"><tr><th className="text-left p-3 text-sm">Date</th><th className="text-left p-3 text-sm">Status</th></tr></thead>
                  <tbody>
                    {studentAttendance.length === 0 ? <tr><td colSpan="2" className="text-center p-8 text-gray-500">No attendance records yet</td></tr> :
                      studentAttendance.map(record => (
                        <tr key={record.id} className="border-b border-gray-100">
                          <td className="p-3 text-sm">{record.displayDate}</td>
                          <td className="p-3 text-sm"><span className={`px-3 py-1 rounded-full text-xs font-medium ${getAttendanceBadgeStyle(record.status)}`}>{record.status}</span></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'announcements':
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
              <FaBullhorn className="text-[#D4AF37]" />
              Announcements
            </h2>
            <div className="space-y-4">
              {getCourseContent(announcements).length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center"><FaBell className="text-5xl text-gray-300 mx-auto mb-3" /><p className="text-gray-500">No announcements yet</p></div>
              ) : (
                getCourseContent(announcements).map(announcement => (
                  <div key={announcement.id} className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-[#D4AF37]">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2"><FaBullhorn className="text-[#D4AF37]" /><h3 className="font-bold text-[#0B1F3A] text-lg">{announcement.title}</h3></div>
                      <span className="text-xs text-gray-400">{announcement.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 ml-6">{announcement.description}</p>
                    {announcement.link && <a href={announcement.link} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] text-sm hover:underline flex items-center gap-1 ml-6"><FaChevronRight /> Join Link</a>}
                  </div>
                ))
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F5EF] to-white">
      {/* Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-[#0B1F3A] text-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center">
              <HiOutlineAcademicCap className="text-2xl text-[#0B1F3A]" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Student Portal</h2>
              <p className="text-xs text-white/60">PWI Psychological</p>
            </div>
          </div>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} className="absolute top-5 right-5 text-white/60 hover:text-white">
              <FaTimes size={20} />
            </button>
          )}
        </div>

        {/* User Info with Dropdown */}
        <div className="p-4 border-b border-white/10 bg-white/5 user-dropdown">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="w-full flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                <FaUserGraduate className="text-[#D4AF37]" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-sm">{student.fullName}</p>
                <p className="text-xs text-white/50 truncate">{student.email}</p>
              </div>
            </div>
            <FaChevronDown className={`text-white/60 text-sm transition-transform duration-300 ${userDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {userDropdownOpen && (
            <div className="mt-2 bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 animate-fadeIn">
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setUserDropdownOpen(false);
                  if (isMobile) setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-all duration-300"
              >
                <FaUserCircle className="text-[#D4AF37]" />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setUserDropdownOpen(false);
                  if (isMobile) setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-white/10 transition-all duration-300"
              >
                <FaCog className="text-[#D4AF37]" />
                <span>Settings</span>
              </button>
              <div className="border-t border-white/10"></div>
              <button
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  navigate('/signin');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/20 transition-all duration-300"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (isMobile) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] shadow-lg'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && <FaChevronRight className="ml-auto text-sm" />}
            </button>
          ))}
        </nav>

        {/* Bottom Section - Removed duplicate logout */}
       
      </aside>

      {/* Main Content Area */}
      <main className={`transition-all duration-300 ${sidebarOpen && !isMobile ? 'md:ml-72' : ''}`}>
        {/* Top Header - Mobile */}
        <header className="bg-white shadow-md sticky top-0 z-30 md:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
              <FaBars className="text-2xl text-[#0B1F3A]" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                <HiOutlineAcademicCap className="text-[#0B1F3A]" />
              </div>
              <span className="font-semibold text-[#0B1F3A]">Student Portal</span>
            </div>
            <div className="w-8 h-8 bg-[#0B1F3A]/10 rounded-full flex items-center justify-center">
              <FaUserGraduate className="text-[#0B1F3A]" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-8">
          {renderContent()}
        </div>
      </main>

      {/* Submit Assignment Modal */}
      {showSubmitModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowSubmitModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#0B1F3A]">Submit Assignment</h3>
              <button onClick={() => setShowSubmitModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-[#0B1F3A] mb-1">Assignment</label><p className="text-gray-700 font-medium">{selectedAssignment.title}</p></div>
              <div><label className="block text-sm font-medium text-[#0B1F3A] mb-1">Your Answer / Submission Text</label><textarea value={submissionText} onChange={(e) => setSubmissionText(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] resize-none" rows="5" placeholder="Type your answer here..."></textarea></div>
              <div><label className="block text-sm font-medium text-[#0B1F3A] mb-1">Or Upload File</label><input type="file" onChange={handleSubmissionFile} className="w-full p-2 border border-gray-200 rounded-lg" accept=".pdf,.doc,.docx,.jpg,.png,.txt" />{submissionFile && <p className="text-xs text-green-600 mt-1">✓ File selected: {submissionFile.name}</p>}</div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSubmitAssignment} className="flex-1 py-2.5 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-semibold hover:bg-[#C49B2C] transition">Submit</button>
              <button onClick={() => setShowSubmitModal(false)} className="flex-1 py-2.5 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;