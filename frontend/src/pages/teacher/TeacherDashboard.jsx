import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaChalkboardTeacher, FaBullhorn, FaVideo, FaFileAlt, FaClipboardList, 
  FaCheckCircle, FaChartLine, FaSignOutAlt, FaBars, FaTimes, 
  FaPlus, FaTrash, FaDownload, FaEye, FaCalendarAlt, FaClock,
  FaUserGraduate, FaEnvelope, FaPhoneAlt, FaLink, FaYoutube,
  FaSpinner, FaChevronRight, FaFilter, FaGraduationCap, FaBook
} from 'react-icons/fa';
import { MdOutlineAssignment, MdOutlineDescription } from 'react-icons/md';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { toast, Toaster } from 'react-hot-toast';
import auth from '../../utils/auth';
import api from '../../utils/api';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => auth.getUser());
  const [activeTab, setActiveTab] = useState('announcements');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [attendanceDateFilter, setAttendanceDateFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const initialLoadRef = useRef(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    dueDate: '',
    totalMarks: '',
    file: null,
    assignmentFile: null,
    videoFile: null
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

  const tabs = [
    { id: 'announcements', icon: <FaBullhorn />, label: 'Announcements', color: 'from-blue-500 to-blue-600' },
    { id: 'videos', icon: <FaVideo />, label: 'Live Sessions', color: 'from-red-500 to-red-600' },
    { id: 'documents', icon: <FaFileAlt />, label: 'Documents', color: 'from-green-500 to-green-600' },
    { id: 'attendance', icon: <FaCheckCircle />, label: 'Attendance', color: 'from-purple-500 to-purple-600' },
    { id: 'assignments', icon: <FaClipboardList />, label: 'Assignments', color: 'from-orange-500 to-orange-600' },
    { id: 'progress', icon: <FaChartLine />, label: 'Progress', color: 'from-teal-500 to-teal-600' },
  ];

  const normalizeCourse = (course, index = 0) => ({
    id: index + 1,
    courseId: course._id || course.id,
    name: course.title || course.name || 'Course',
    duration: course.duration || '6 Months',
    fee: typeof course.fee === 'number' ? `Rs. ${course.fee.toLocaleString()}` : (course.fee || 'Rs. 0'),
    status: course.status === 'published' ? 'active' : 'inactive',
    description: course.description || '',
  });

  const refreshCourseData = async (course) => {
    if (!course) return;
    try {
      const [studentsRes, assignmentsRes, videosRes, materialsRes, attendanceRes] = await Promise.all([
        api.getCourseStudents(course.courseId),
        api.getCourseAssignments(course.courseId),
        api.getCourseVideos(course.courseId),
        api.getCourseMaterials(course.courseId),
        api.getCourseAttendance(course.courseId),
      ]);

      setStudents((studentsRes?.data || []).map((registration, idx) => ({
        id: registration.user?._id || registration._id || idx,
        fullName: registration.user?.fullName || registration.fullName || 'Student',
        email: registration.user?.email || registration.email || '',
        phone: registration.user?.phone || registration.phone || '',
        status: registration.status || 'approved',
      })));

      const assignmentItems = (assignmentsRes?.data || []).map((assignment, idx) => ({
        id: assignment._id || idx,
        courseId: course.courseId,
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : '',
        totalMarks: assignment.totalMarks || 0,
        date: assignment.createdAt ? new Date(assignment.createdAt).toLocaleDateString() : '',
        attachmentUrl: assignment.attachmentUrl ? String(assignment.attachmentUrl).replace(/\\/g, '/') : '',
        attachmentName: assignment.attachmentName || '',
      }));
      setAssignments(assignmentItems);

      const submissionsByAssignment = await Promise.all(
        assignmentItems.map((assignment) => api.getAssignmentSubmissions(assignment.id).catch(() => ({ data: [] })))
      );

      const normalizedSubmissions = submissionsByAssignment.flatMap((response, index) => {
        const assignmentId = assignmentItems[index]?.id;
        return (response?.data || []).map((submission, subIndex) => ({
          id: submission._id || `${assignmentId}-${subIndex}`,
          assignmentId,
          studentId: submission.student?._id || submission.student,
          fileUrl: submission.fileUrl ? String(submission.fileUrl).replace(/\\/g, '/') : '',
          fileName: submission.fileName || (submission.fileUrl ? String(submission.fileUrl).split('/').pop() : ''),
          remarks: submission.remarks || '',
          score: submission.grade ? Number(submission.grade) : null,
          submittedDate: submission.submittedAt ? new Date(submission.submittedAt).toLocaleString() : (submission.createdAt ? new Date(submission.createdAt).toLocaleString() : ''),
        }));
      });

      setSubmissions(normalizedSubmissions);

      setVideos((videosRes?.data || []).map((video, idx) => ({
        id: video._id || idx,
        courseId: course.courseId,
        title: video.title,
        description: video.description || '',
        link: video.videoUrl || video.link || '#',
        date: video.createdAt ? new Date(video.createdAt).toLocaleDateString() : '',
      })));

      setDocuments((materialsRes?.data || []).map((material, idx) => {
        const normalizedFileUrl = material.fileUrl ? String(material.fileUrl).replace(/\\/g, '/') : '';
        const fallbackName = normalizedFileUrl ? normalizedFileUrl.split('/').pop() : 'File';
        return {
          id: material._id || idx,
          courseId: course.courseId,
          title: material.title,
          fileUrl: normalizedFileUrl,
          fileName: material.fileName || fallbackName,
          date: material.createdAt ? new Date(material.createdAt).toLocaleDateString() : '',
        };
      }));

      setAttendance((attendanceRes?.data || []).map((record, idx) => ({
        id: record._id || idx,
        studentId: record.student?._id || record.student || idx,
        date: record.date || record.createdAt,
        displayDate: record.date || record.createdAt ? new Date(record.date || record.createdAt).toLocaleString() : '',
        status: record.status || 'present',
      })));
    } catch (error) {
      console.error('Failed to load course data', error);
      toast.error('Failed to load course data');
    }
  };

  useEffect(() => {
    if (initialLoadRef.current) return;
    initialLoadRef.current = true;

    (async () => {
      try {
        const [availableCoursesRes, allCoursesRes] = await Promise.allSettled([
          api.getAvailableCourses(),
          api.getCourses(),
        ]);

        const availableCourses = availableCoursesRes.status === 'fulfilled' && Array.isArray(availableCoursesRes.value?.data)
          ? availableCoursesRes.value.data
          : [];
        const allCourses = allCoursesRes.status === 'fulfilled' && Array.isArray(allCoursesRes.value?.data)
          ? allCoursesRes.value.data
          : [];

        const backendCourses = availableCourses.length > 0 ? availableCourses : allCourses;
        const normalizedCourses = backendCourses.map((course, index) => normalizeCourse(course, index));
        setCourses(normalizedCourses);
        setSelectedCourse(normalizedCourses[0] || null);

        const notificationsRes = await api.getNotifications().catch(() => null);
        setAnnouncements((notificationsRes?.data || [])
          .filter((notification) => notification.type === 'announcement')
          .map((notification, idx) => ({
            id: notification._id || idx,
            groupId: notification.metadata?.announcementGroupId || notification._id || idx,
            courseId: notification.metadata?.courseId || '',
            title: notification.title || notification.metadata?.title || notification.subject || 'Notification',
            description: notification.message || notification.description || '',
            link: notification.link || notification.metadata?.link || '',
            date: notification.createdAt ? new Date(notification.createdAt).toLocaleString() : new Date().toLocaleString(),
          })));
      } catch (error) {
        console.error('Failed to load teacher dashboard data', error);
        toast.error('Failed to load dashboard data');
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedCourse?.courseId) {
      refreshCourseData(selectedCourse);
    }
  }, [selectedCourse]);

  useEffect(() => {
    let active = true;

    api.getCurrentUser()
      .then((response) => {
        if (active && response?.data) {
          setCurrentUser(response.data);
        }
      })
      .catch((error) => {
        console.error('Failed to load current user', error);
      });

    return () => {
      active = false;
    };
  }, []);

  const addActivity = (action, type) => {
    const activities = JSON.parse(localStorage.getItem('systemActivities') || '[]');
    const newActivity = {
      id: Date.now(),
      action,
      user: 'Lecturer',
      time: new Date().toLocaleString(),
      type
    };
    activities.unshift(newActivity);
    localStorage.setItem('systemActivities', JSON.stringify(activities));
  };

  const handleFileUpload = (e, type = 'document') => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'document') {
        setFormData((prev) => ({ ...prev, file, fileName: file.name }));
        return;
      }
      if (type === 'assignment') {
        setFormData((prev) => ({ ...prev, assignmentFile: file, assignmentFileName: file.name }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'video') {
          setFormData((prev) => ({ ...prev, videoFile: reader.result, videoFileName: file.name }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAnnouncement = (id) => {
    const announcement = announcements.find((item) => item.id === id);
    if (!announcement) return;

    if (window.confirm('Are you sure you want to delete this announcement?')) {
      api.deleteAnnouncement(announcement.groupId)
        .then(async (response) => {
          if (!response?.success) throw new Error(response?.message || 'Failed to delete announcement');
          const updated = announcements.filter((item) => item.id !== id);
          setAnnouncements(updated);
          addActivity('Deleted announcement', 'announcement');
          toast.success('Announcement deleted successfully!');
        })
        .catch((error) => {
          console.error(error);
          toast.error(error?.message || 'Failed to delete announcement');
        });
    }
  };

  const handleDeleteVideo = (id) => {
    if (window.confirm('Are you sure you want to delete this video/session?')) {
      api.deleteVideo(id)
        .then(async (response) => {
          if (!response?.success) throw new Error(response?.message || 'Failed to delete video');
          addActivity('Deleted video/session', 'video');
          await refreshCourseData(selectedCourse);
          toast.success('Video/Session deleted successfully!');
        })
        .catch((error) => {
          console.error(error);
          toast.error(error?.message || 'Failed to delete video');
        });
    }
  };

  const handleDeleteDocument = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      api.deleteMaterial(id)
        .then(async (response) => {
          if (!response?.success) throw new Error(response?.message || 'Failed to delete document');
          addActivity('Deleted document', 'document');
          await refreshCourseData(selectedCourse);
          toast.success('Document deleted successfully!');
        })
        .catch((error) => {
          console.error(error);
          toast.error(error?.message || 'Failed to delete document');
        });
    }
  };

  const handleDeleteAssignment = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment? All student submissions will also be removed.')) {
      api.deleteAssignment(id)
        .then(async (response) => {
          if (!response?.success) throw new Error(response?.message || 'Failed to delete assignment');
          addActivity('Deleted assignment', 'assignment');
          await refreshCourseData(selectedCourse);
          toast.success('Assignment deleted successfully!');
        })
        .catch((error) => {
          console.error(error);
          toast.error(error?.message || 'Failed to delete assignment');
        });
    }
  };

  const handleAddAnnouncement = () => {
    if (formData.title && formData.description) {
      api.createAnnouncement({
        courseId: selectedCourse?.courseId,
        title: formData.title,
        description: formData.description,
        link: formData.link,
      })
        .then(async (response) => {
          if (!response?.success) throw new Error(response?.message || 'Failed to post announcement');
          addActivity(`Added announcement: ${formData.title} for ${selectedCourse?.name}`, 'announcement');
          setShowAddModal(false);
          setFormData({ title: '', description: '', link: '', dueDate: '', totalMarks: '', file: null, assignmentFile: null, videoFile: null });
          const notificationsRes = await api.getNotifications().catch(() => null);
          setAnnouncements((notificationsRes?.data || [])
            .filter((notification) => notification.type === 'announcement')
            .map((notification, idx) => ({
              id: notification._id || idx,
              groupId: notification.metadata?.announcementGroupId || notification._id || idx,
              courseId: notification.metadata?.courseId || '',
              title: notification.title || notification.metadata?.title || notification.subject || 'Notification',
              description: notification.message || notification.description || '',
              link: notification.link || notification.metadata?.link || '',
              date: notification.createdAt ? new Date(notification.createdAt).toLocaleString() : new Date().toLocaleString(),
            })));
          toast.success('Announcement posted successfully!');
        })
        .catch((error) => {
          console.error(error);
          toast.error(error?.message || 'Failed to post announcement');
        });
    } else {
      toast.error('Please fill title and description');
    }
  };

  const handleAddVideo = () => {
    if (formData.title && (formData.link || formData.videoFile)) {
      api.request('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course: selectedCourse?.courseId,
          title: formData.title,
          description: formData.description,
          videoUrl: formData.link,
          duration: 0,
        }),
      })
        .then(async () => {
          addActivity(`Added video: ${formData.title} for ${selectedCourse?.name}`, 'video');
          setShowAddModal(false);
          setFormData({ title: '', description: '', link: '', dueDate: '', totalMarks: '', file: null, assignmentFile: null, videoFile: null });
          await refreshCourseData(selectedCourse);
          toast.success('Video added successfully!');
        })
        .catch((error) => {
          console.error(error);
          toast.error(error?.message || 'Failed to add video');
        });
    } else {
      toast.error('Please fill title and provide either a YouTube link or upload a video file');
    }
  };

  const handleAddDocument = () => {
    if (formData.title && formData.file) {
      const payload = new FormData();
      payload.append('course', selectedCourse?.courseId || '');
      payload.append('title', formData.title);
      payload.append('file', formData.file, formData.fileName || formData.file.name || 'document');

      api.uploadMaterial(payload)
        .then(async () => {
          addActivity(`Uploaded document: ${formData.title} for ${selectedCourse?.name}`, 'document');
          setShowAddModal(false);
          setFormData({ title: '', description: '', link: '', dueDate: '', totalMarks: '', file: null, assignmentFile: null, videoFile: null });
          await refreshCourseData(selectedCourse);
          toast.success('Document uploaded successfully!');
        })
        .catch((error) => {
          console.error(error);
          toast.error(error?.message || 'Failed to upload document');
        });
    } else {
      toast.error('Please fill title and select a file');
    }
  };

  const handleAddAssignment = () => {
    if (formData.title && formData.dueDate && formData.totalMarks) {
      const payload = new FormData();
      payload.append('course', selectedCourse?.courseId || '');
      payload.append('title', formData.title);
      payload.append('description', formData.description || '');
      payload.append('dueDate', formData.dueDate);
      payload.append('totalMarks', String(Number(formData.totalMarks)));
      if (formData.assignmentFile) {
        payload.append('file', formData.assignmentFile, formData.assignmentFileName || formData.assignmentFile.name || 'assignment');
      }

      api.uploadAssignment(payload)
        .then(async () => {
          addActivity(`Created assignment: ${formData.title} for ${selectedCourse?.name}`, 'assignment');
          setShowAddModal(false);
          setFormData({ title: '', description: '', link: '', dueDate: '', totalMarks: '', file: null, assignmentFile: null, videoFile: null });
          await refreshCourseData(selectedCourse);
          toast.success('Assignment created successfully!');
        })
        .catch((error) => {
          console.error(error);
          toast.error(error?.message || 'Failed to create assignment');
        });
    } else {
      toast.error('Please fill all required fields');
    }
  };

  const viewSubmissions = (assignmentId, assignmentTitle, totalMarks) => {
    navigate(`/teacher/assignments/${assignmentId}/submissions`, {
      state: { assignmentTitle, totalMarks, courseId: selectedCourse?.courseId },
    });
  };

  const getAttendanceBadgeStyle = (status) => {
    if (status === 'late') return 'bg-yellow-100 text-yellow-700';
    if (status === 'absent') return 'bg-red-100 text-red-700';
    return 'bg-green-100 text-green-700';
  };

  const getFilteredAttendance = () => {
    if (!attendanceDateFilter) return attendance;
    const filterDate = new Date(attendanceDateFilter).toDateString();
    return attendance.filter((record) => {
      if (!record.date) return false;
      return new Date(record.date).toDateString() === filterDate;
    });
  };

  const getAttendanceStats = () => {
    const totalStudents = students.length;
    const filteredAttendance = getFilteredAttendance();
    const presentToday = filteredAttendance.filter((record) => record.status === 'present' || record.status === 'late').length;
    return { totalStudents, presentToday, attendanceRate: totalStudents ? ((presentToday / totalStudents) * 100).toFixed(1) : 0, recordCount: filteredAttendance.length };
  };

  const getStudentProgress = (studentId) => {
    const studentSubmissions = submissions.filter(s => s.studentId === studentId);
    const totalAssignments = assignments.filter(a => String(a.courseId) === String(selectedCourse?.courseId)).length;
    const submittedCount = studentSubmissions.length;
    const averageScore = studentSubmissions.length > 0 ? (studentSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / studentSubmissions.length).toFixed(1) : 0;
    return { submittedCount, totalAssignments, averageScore, progress: totalAssignments ? ((submittedCount / totalAssignments) * 100).toFixed(1) : 0 };
  };

  const attendanceStats = getAttendanceStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      {/* Teacher Navbar */}
      <nav className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] text-white sticky top-0 z-50 shadow-xl">
        <div className="max-w-8xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#D4AF37] to-[#C49B2C] rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <HiOutlineAcademicCap className="text-lg sm:text-2xl text-[#0B1F3A]" />
              </div>
              <div>
                <h1 className="font-bold text-sm sm:text-lg">Lecturer Dashboard</h1>
                <p className="text-[10px] sm:text-xs text-white/60">PWI Psychological Institute</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#D4AF37]/30 rounded-full flex items-center justify-center">
                  <FaChalkboardTeacher className="text-xs sm:text-sm" />
                </div>
                <span className="text-xs sm:text-sm hidden md:block">{currentUser?.fullName || 'Lecturer'}</span>
              </div>
              <button 
                onClick={() => {
                  auth.logout();
                  navigate('/');
                }}
                className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-xs sm:text-sm transition-all duration-300"
              >
                <FaSignOutAlt size={12} />
                <span className="hidden sm:inline">Logout</span>
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition">
                {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-80 bg-white shadow-2xl min-h-screen fixed md:relative z-40 transition-all duration-300 overflow-y-auto`}>
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

            <div className="mb-6">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Select Course</label>
              <select
                value={selectedCourse?.id || ''}
                onChange={(e) => {
                  const course = courses.find(c => c.id === parseInt(e.target.value));
                  setSelectedCourse(course);
                  setMobileMenuOpen(false);
                }}
                className="w-full p-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300 bg-white"
              >
                <option value="">Select a course</option>
                {courses.filter(c => c.status === 'active').map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>

            {selectedCourse && (
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#D4AF37]'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                    {activeTab === tab.id && <FaChevronRight className="ml-auto text-sm" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          {!selectedCourse ? (
            <div className="text-center py-12 sm:py-20">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#D4AF37]/20 to-[#C49B2C]/20 rounded-full flex items-center justify-center mb-4">
                <FaBook className="text-5xl text-[#D4AF37]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] mb-2">Select a Course</h2>
              <p className="text-sm text-gray-500">Please select a course from the sidebar to start managing</p>
            </div>
          ) : (
            <>
              {/* Announcements Tab */}
              {activeTab === 'announcements' && (
                <div className="animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A]">Announcements</h2>
                      <p className="text-sm text-gray-500 mt-1">Share important updates with your students</p>
                    </div>
                    <button onClick={() => { setModalType('announcement'); setShowAddModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300">
                      <FaPlus size={14} /> Make Announcement
                    </button>
                  </div>
                  <div className="space-y-4">
                    {announcements.filter(a => String(a.courseId) === String(selectedCourse.courseId)).length === 0 ? (
                      <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <FaBullhorn className="text-5xl text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No announcements yet</p>
                      </div>
                    ) : (
                      announcements.filter(a => String(a.courseId) === String(selectedCourse.courseId)).map(announcement => (
                        <div key={announcement.id} className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#D4AF37]">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                            <h3 className="font-bold text-[#0B1F3A] text-lg">{announcement.title}</h3>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-400 flex items-center gap-1"><FaClock size={10} /> {announcement.date}</span>
                              <button onClick={() => handleDeleteAnnouncement(announcement.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition flex items-center gap-1"><FaTrash size={10} /> Delete</button>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{announcement.description}</p>
                          {announcement.link && <a href={announcement.link} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] text-sm hover:underline flex items-center gap-1"><FaLink size={12} /> {announcement.link}</a>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Videos Tab */}
              {activeTab === 'videos' && (
                <div className="animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A]">Live Sessions & Videos</h2>
                      <p className="text-sm text-gray-500 mt-1">Manage your video content and live session links</p>
                    </div>
                    <button onClick={() => { setModalType('video'); setShowAddModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300">
                      <FaPlus size={14} /> Add Session/Video
                    </button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {videos.filter(v => String(v.courseId) === String(selectedCourse.courseId)).length === 0 ? (
                      <div className="col-span-2 bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <FaVideo className="text-5xl text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No videos or sessions added yet</p>
                      </div>
                    ) : (
                      videos.filter(v => String(v.courseId) === String(selectedCourse.courseId)).map(video => (
                        <div key={video.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                          <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-white pr-8">{video.title}</h3>
                              <button onClick={() => handleDeleteVideo(video.id)} className="px-2 py-1 bg-red-500/80 text-white rounded-lg text-xs hover:bg-red-600 transition"><FaTrash size={10} /></button>
                            </div>
                            <p className="text-white/60 text-xs mt-1 flex items-center gap-1"><FaCalendarAlt size={10} /> {video.date}</p>
                          </div>
                          <div className="p-5">
                            <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                            {video.link && (
                              <a href={video.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg text-sm font-semibold hover:bg-[#D4AF37] hover:text-[#0B1F3A] transition">
                                <FaYoutube /> Watch Session
                              </a>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A]">Study Materials</h2>
                      <p className="text-sm text-gray-500 mt-1">Upload and manage learning resources</p>
                    </div>
                    <button onClick={() => { setModalType('document'); setShowAddModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300">
                      <FaPlus size={14} /> Upload Document
                    </button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {documents.filter(d => String(d.courseId) === String(selectedCourse.courseId)).length === 0 ? (
                      <div className="col-span-2 bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <FaFileAlt className="text-5xl text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No documents uploaded yet</p>
                      </div>
                    ) : (
                      documents.filter(d => String(d.courseId) === String(selectedCourse.courseId)).map(doc => (
                        <div key={doc.id} className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4 hover:shadow-lg transition-all duration-300 border border-gray-100 group">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#C49B2C]/20 rounded-xl flex items-center justify-center">
                            <FaFileAlt className="text-xl text-[#D4AF37]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-[#0B1F3A]">{doc.title}</h3>
                            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><FaCalendarAlt size={10} /> {doc.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => { api.downloadFile(doc.fileUrl, doc.fileName || 'document', { type: 'material', id: doc.id }).catch((error) => { toast.error(error?.message || 'Failed to download file'); }); }} className="p-2 bg-[#D4AF37] text-[#0B1F3A] rounded-lg hover:bg-[#C49B2C] transition"><FaDownload /></button>
                            <button onClick={() => handleDeleteDocument(doc.id)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"><FaTrash /></button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Attendance Tab */}
              {activeTab === 'attendance' && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mb-2">Attendance Overview</h2>
                  <p className="text-sm text-gray-500 mb-6">Track and monitor student attendance</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] rounded-2xl p-5 text-white shadow-lg">
                      <FaUserGraduate className="text-3xl mb-2 opacity-80" />
                      <p className="text-sm opacity-90">Total Students</p>
                      <p className="text-3xl font-bold mt-1">{attendanceStats.totalStudents}</p>
                    </div>
                    <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] rounded-2xl p-5 text-white shadow-lg">
                      <FaCheckCircle className="text-3xl mb-2 opacity-80" />
                      <p className="text-sm opacity-90">Present Today</p>
                      <p className="text-3xl font-bold mt-1">{attendanceStats.presentToday}</p>
                    </div>
                    <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] rounded-2xl p-5 text-white shadow-lg">
                      <FaCalendarAlt className="text-3xl mb-2 opacity-80" />
                      <p className="text-sm opacity-90">Records Shown</p>
                      <p className="text-3xl font-bold mt-1">{attendanceStats.recordCount}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-xl p-5 overflow-x-auto">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#0B1F3A]">Attendance Records</h3>
                        <p className="text-xs text-gray-500 mt-1">Filter by date to review a specific day's attendance</p>
                      </div>
                      <div className="w-full sm:w-64">
                        <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1"><FaFilter size={10} /> Filter by date</label>
                        <input type="date" value={attendanceDateFilter} onChange={(e) => setAttendanceDateFilter(e.target.value)} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" />
                      </div>
                    </div>
                    <table className="w-full min-w-[500px]">
                      <thead className="bg-gradient-to-r from-[#F8F4EC] to-white">
                        <tr><th className="text-left p-3 text-sm font-semibold text-gray-600">Student Name</th><th className="text-left p-3 text-sm font-semibold text-gray-600">Date</th><th className="text-left p-3 text-sm font-semibold text-gray-600">Status</th></tr>
                      </thead>
                      <tbody>
                        {getFilteredAttendance().slice(0, 10).map(record => {
                          const student = students.find((s) => String(s.id) === String(record.studentId));
                          return (
                            <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                              <td className="p-3 text-sm font-medium">{student?.fullName || 'Unknown'}</td>
                              <td className="p-3 text-sm">{record.displayDate || (record.date ? new Date(record.date).toLocaleString() : '')}</td>
                              <td className="p-3 text-sm"><span className={`px-2 py-1 rounded-full text-xs ${getAttendanceBadgeStyle(record.status)}`}>{record.status}</span></td>
                            </tr>
                          );
                        })}
                        {getFilteredAttendance().length === 0 && <tr><td colSpan="3" className="text-center p-8 text-gray-500">No attendance records found for the selected date</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Assignments Tab */}
              {activeTab === 'assignments' && (
                <div className="animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A]">Assignments</h2>
                      <p className="text-sm text-gray-500 mt-1">Create and manage course assignments</p>
                    </div>
                    <button onClick={() => { setModalType('assignment'); setShowAddModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300">
                      <FaPlus size={14} /> Create Assignment
                    </button>
                  </div>
                  <div className="space-y-5">
                    {assignments.filter(a => String(a.courseId) === String(selectedCourse.courseId)).length === 0 ? (
                      <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <MdOutlineAssignment className="text-5xl text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No assignments created yet</p>
                      </div>
                    ) : (
                      assignments.filter(a => String(a.courseId) === String(selectedCourse.courseId)).map(assignment => {
                        const submissionsCount = submissions.filter(s => s.assignmentId === assignment.id).length;
                        return (
                          <div key={assignment.id} className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                              <div>
                                <h3 className="font-bold text-[#0B1F3A] text-lg">{assignment.title}</h3>
                                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><FaClock size={10} /> Created: {assignment.date}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs whitespace-nowrap">Due: {assignment.dueDate}</span>
                                <button onClick={() => handleDeleteAssignment(assignment.id)} className="px-2 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition flex items-center gap-1"><FaTrash size={10} /> Delete</button>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{assignment.description}</p>
                            {assignment.attachmentUrl && (
                              <div className="mb-3"><button onClick={() => { api.downloadFile(assignment.attachmentUrl, assignment.attachmentName || 'assignment', { type: 'assignment', id: assignment.id }).catch((error) => { toast.error(error?.message || 'Failed to download assignment file'); }); }} className="text-[#D4AF37] text-sm flex items-center gap-1 hover:underline"><FaDownload /> Download Assignment File</button></div>
                            )}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 border-t border-gray-100">
                              <div className="flex gap-4"><span className="text-sm text-gray-500">📝 Total Marks: {assignment.totalMarks}</span><span className="text-sm text-gray-500">📤 Submissions: {submissionsCount}</span></div>
                              <button onClick={() => viewSubmissions(assignment.id, assignment.title, assignment.totalMarks)} className="text-[#D4AF37] text-sm font-semibold hover:underline flex items-center gap-1"><FaEye size={12} /> View Submissions →</button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* Student Progress Tab */}
              {activeTab === 'progress' && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mb-2">Student Progress</h2>
                  <p className="text-sm text-gray-500 mb-6">Monitor student performance and assignment completion</p>
                  
                  <div className="bg-white rounded-2xl shadow-xl p-5 overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                      <thead className="bg-gradient-to-r from-[#F8F4EC] to-white">
                        <tr>
                          <th className="text-left p-3 text-sm font-semibold text-gray-600">Student Name</th>
                          <th className="text-left p-3 text-sm font-semibold text-gray-600">Email</th>
                          <th className="text-left p-3 text-sm font-semibold text-gray-600">Submitted</th>
                          <th className="text-left p-3 text-sm font-semibold text-gray-600">Avg Score</th>
                          <th className="text-left p-3 text-sm font-semibold text-gray-600">Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(student => {
                          const progress = getStudentProgress(student.id);
                          return (
                            <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                              <td className="p-3 text-sm font-medium">{student.fullName}</td>
                              <td className="p-3 text-sm text-gray-600">{student.email}</td>
                              <td className="p-3 text-sm">{progress.submittedCount}/{progress.totalAssignments}</td>
                              <td className="p-3 text-sm">{progress.averageScore}%</td>
                              <td className="p-3 text-sm">
                                <div className="flex items-center gap-2">
                                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] rounded-full transition-all duration-500" style={{ width: `${progress.progress}%` }}></div>
                                  </div>
                                  <span className="text-xs font-medium">{progress.progress}%</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {students.length === 0 && <tr><td colSpan="5" className="text-center p-8 text-gray-500">No students enrolled yet</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-scaleIn max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#0B1F3A] flex items-center gap-2">
                <FaPlus className="text-[#D4AF37]" />
                {modalType === 'announcement' && 'Make Announcement'}
                {modalType === 'video' && 'Add Live Session/Video'}
                {modalType === 'document' && 'Upload Document'}
                {modalType === 'assignment' && 'Create Assignment'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" placeholder="Enter title" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] resize-none" rows="3" placeholder="Enter description"></textarea></div>

              {(modalType === 'announcement' || modalType === 'video') && (
                <div><label className="block text-sm font-medium text-gray-700 mb-1">{modalType === 'announcement' ? 'Meeting/Resource Link' : 'YouTube/Zoom Link'}</label><input type="url" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" placeholder="https://..." /></div>
              )}

              {modalType === 'video' && (
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Or Upload Video File</label><input type="file" onChange={(e) => handleFileUpload(e, 'video')} className="w-full p-2.5 border border-gray-200 rounded-lg" accept=".mp4,.mov,.avi,.mkv,.webm" /><p className="text-xs text-gray-400 mt-1">Supported: MP4, MOV, AVI, MKV, WEBM (Max 100MB)</p></div>
              )}

              {modalType === 'assignment' && (
                <>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label><input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Total Marks *</label><input type="number" value={formData.totalMarks} onChange={(e) => setFormData({...formData, totalMarks: e.target.value})} className="w-full p-2.5 border border-gray-200 rounded-lg" placeholder="100" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Upload Assignment File</label><input type="file" onChange={(e) => handleFileUpload(e, 'assignment')} className="w-full p-2.5 border border-gray-200 rounded-lg" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip" /></div>
                </>
              )}

              {modalType === 'document' && (
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Upload File *</label><input type="file" onChange={(e) => handleFileUpload(e, 'document')} className="w-full p-2.5 border border-gray-200 rounded-lg" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" /></div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => { if (modalType === 'announcement') handleAddAnnouncement(); else if (modalType === 'video') handleAddVideo(); else if (modalType === 'document') handleAddDocument(); else if (modalType === 'assignment') handleAddAssignment(); }} className="flex-1 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] rounded-xl font-semibold hover:shadow-lg transition">Save</button>
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;