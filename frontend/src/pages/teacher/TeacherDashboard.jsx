import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('announcements');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

      setAttendance((attendanceRes?.data || []).map((record, idx) => {
        const sourceDate = record.date || record.createdAt;
        return {
          id: record._id || idx,
          studentId: record.student?._id || record.student || idx,
          date: sourceDate,
          displayDate: sourceDate ? new Date(sourceDate).toLocaleString() : '',
          status: record.status || 'present',
        };
      }));
    } catch (error) {
      console.error('Failed to load course data', error);
      setSubmissions([]);
      setStudents([]);
      setAssignments([]);
      setVideos([]);
      setDocuments([]);
      setAttendance([]);
    }
  };

  // Load data from localStorage
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

        setSubmissions([]);
        setStudents([]);
        setDocuments([]);
        setVideos([]);
        setAssignments([]);
        setAttendance([]);
      } catch (error) {
        console.error('Failed to load teacher dashboard data', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedCourse?.courseId) {
      refreshCourseData(selectedCourse);
    }
  }, [selectedCourse]);

  // Add system activity
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

  // Handle file upload
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
        } else {
          setFormData((prev) => ({ ...prev, file: reader.result, fileName: file.name }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Delete functions
  const handleDeleteAnnouncement = (id) => {
    const announcement = announcements.find((item) => item.id === id);
    if (!announcement) return;

    if (window.confirm('Are you sure you want to delete this announcement?')) {
      api.deleteAnnouncement(announcement.groupId)
        .then(async (response) => {
          if (!response?.success) {
            throw new Error(response?.message || 'Failed to delete announcement');
          }
          const updated = announcements.filter((item) => item.id !== id);
          setAnnouncements(updated);
          addActivity('Deleted announcement', 'announcement');
          alert('Announcement deleted successfully!');
        })
        .catch((error) => {
          console.error('Announcement deletion error:', error);
          alert(error?.message || 'Failed to delete announcement');
        });
    }
  };

  const handleDeleteVideo = (id) => {
    if (window.confirm('Are you sure you want to delete this video/session?')) {
      api.deleteVideo(id)
        .then(async (response) => {
          if (!response?.success) {
            throw new Error(response?.message || 'Failed to delete video');
          }
          addActivity('Deleted video/session', 'video');
          await refreshCourseData(selectedCourse);
          alert('Video/Session deleted successfully!');
        })
        .catch((error) => {
          console.error('Video deletion error:', error);
          alert(error?.message || 'Failed to delete video');
        });
    }
  };

  const handleDeleteDocument = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      api.deleteMaterial(id)
        .then(async (response) => {
          if (!response?.success) {
            throw new Error(response?.message || 'Failed to delete document');
          }
          addActivity('Deleted document', 'document');
          await refreshCourseData(selectedCourse);
          alert('Document deleted successfully!');
        })
        .catch((error) => {
          console.error('Document deletion error:', error);
          alert(error?.message || 'Failed to delete document');
        });
    }
  };

  const handleDeleteAssignment = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment? All student submissions will also be removed.')) {
      api.deleteAssignment(id)
        .then(async (response) => {
          if (!response?.success) {
            throw new Error(response?.message || 'Failed to delete assignment');
          }
          addActivity('Deleted assignment', 'assignment');
          await refreshCourseData(selectedCourse);
          alert('Assignment deleted successfully!');
        })
        .catch((error) => {
          console.error('Assignment deletion error:', error);
          alert(error?.message || 'Failed to delete assignment');
        });
    }
  };

  // Add Announcement
  const handleAddAnnouncement = () => {
    if (formData.title && formData.description) {
      api.createAnnouncement({
        courseId: selectedCourse?.courseId,
        title: formData.title,
        description: formData.description,
        link: formData.link,
      })
        .then(async (response) => {
          if (!response?.success) {
            throw new Error(response?.message || 'Failed to post announcement');
          }
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
          alert('Announcement posted successfully!');
        })
        .catch((error) => {
          console.error('Announcement creation error:', error);
          alert(error?.message || 'Failed to post announcement');
        });
    } else {
      alert('Please fill title and description');
    }
  };

  // Add Video
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
          alert('Video added successfully!');
        })
        .catch((error) => {
          console.error(error);
          alert(error?.message || 'Failed to add video');
        });
    } else {
      alert('Please fill title and provide either a YouTube link or upload a video file');
    }
  };

  // Add Document
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
          alert('Document uploaded successfully!');
        })
        .catch((error) => {
          console.error(error);
          alert(error?.message || 'Failed to upload document');
        });
    } else {
      alert('Please fill title and select a file');
    }
  };

  // Add Assignment
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
          alert('Assignment created successfully!');
        })
        .catch((error) => {
          console.error(error);
          alert(error?.message || 'Failed to create assignment');
        });
    } else {
      alert('Please fill all required fields');
    }
  };

  const viewSubmissions = (assignmentId, assignmentTitle, totalMarks) => {
    navigate(`/teacher/assignments/${assignmentId}/submissions`, {
      state: {
        assignmentTitle,
        totalMarks,
        courseId: selectedCourse?.courseId,
      },
    });
  };

  const getAttendanceBadgeStyle = (status) => {
    if (status === 'late') return 'bg-yellow-100 text-yellow-700';
    if (status === 'absent') return 'bg-red-100 text-red-700';
    return 'bg-green-100 text-green-700';
  };

  const getAttendanceFilterDate = () => {
    if (!attendanceDateFilter) return null;
    const parsed = new Date(attendanceDateFilter);
    return Number.isNaN(parsed.getTime()) ? null : parsed.toDateString();
  };

  const getFilteredAttendance = () => {
    const filterDate = getAttendanceFilterDate();
    if (!filterDate) return attendance;

    return attendance.filter((record) => {
      if (!record.date) return false;
      return new Date(record.date).toDateString() === filterDate;
    });
  };

  const getAttendanceStats = () => {
    const totalStudents = students.length;
    const todayStatusByStudent = new Map();
    const filteredAttendance = getFilteredAttendance();

    filteredAttendance.forEach((record) => {
      if (record.date) {
        todayStatusByStudent.set(String(record.studentId), record.status || 'present');
      }
    });

    const presentToday = Array.from(todayStatusByStudent.values()).filter((status) => status === 'present' || status === 'late').length;
    return {
      totalStudents,
      presentToday,
      attendanceRate: totalStudents ? ((presentToday / totalStudents) * 100).toFixed(1) : 0,
      recordCount: filteredAttendance.length,
    };
  };

  const getStudentProgress = (studentId) => {
    const studentSubmissions = submissions.filter(s => s.studentId === studentId);
    const totalAssignments = assignments.filter(a => String(a.courseId) === String(selectedCourse?.courseId)).length;
    const submittedCount = studentSubmissions.length;
    const averageScore = studentSubmissions.length > 0 
      ? (studentSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / studentSubmissions.length).toFixed(1)
      : 0;
    return { submittedCount, totalAssignments, averageScore, progress: totalAssignments ? ((submittedCount / totalAssignments) * 100).toFixed(1) : 0 };
  };

  const attendanceStats = getAttendanceStats();

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      {/* Teacher Navbar - Mobile Responsive */}
      <nav className="bg-[#0B1F3A] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#D4AF37] rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-[#0B1F3A] font-bold text-sm sm:text-lg">PWI</span>
              </div>
              <div>
                <h1 className="font-bold text-sm sm:text-lg">Lecturer Dashboard</h1>
                <p className="text-[10px] sm:text-xs text-white/60">PWI Psychological Institute</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                  <span className="text-xs sm:text-sm">👩‍🏫</span>
                </div>
                <span className="text-xs sm:text-sm hidden md:block">K.M. Imasha</span>
              </div>
              <button 
                onClick={() => navigate('/')}
                className="px-2 py-1 sm:px-3 sm:py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-xs sm:text-sm transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Mobile Responsive */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white shadow-xl min-h-screen border-r border-[#D4AF37]/20 transition-all duration-300`}>
          <div className="p-3 sm:p-4">
            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-medium text-[#0B1F3A] mb-1 sm:mb-2">Select Course</label>
              <select
                value={selectedCourse?.id || ''}
                onChange={(e) => {
                  const course = courses.find(c => c.id === parseInt(e.target.value));
                  setSelectedCourse(course);
                  setMobileMenuOpen(false);
                }}
                className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="">Select a course</option>
                {courses.filter(c => c.status === 'active').map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>

            {selectedCourse && (
              <div className="space-y-1">
                <button onClick={() => { setActiveTab('announcements'); setMobileMenuOpen(false); }} className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${activeTab === 'announcements' ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' : 'hover:bg-gray-50 text-gray-600'}`}>
                  <span className="text-lg sm:text-xl">📢</span><span className="font-medium">Announcements</span>
                </button>
                <button onClick={() => { setActiveTab('videos'); setMobileMenuOpen(false); }} className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${activeTab === 'videos' ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' : 'hover:bg-gray-50 text-gray-600'}`}>
                  <span className="text-lg sm:text-xl">🎥</span><span className="font-medium">Live Sessions / Videos</span>
                </button>
                <button onClick={() => { setActiveTab('documents'); setMobileMenuOpen(false); }} className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${activeTab === 'documents' ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' : 'hover:bg-gray-50 text-gray-600'}`}>
                  <span className="text-lg sm:text-xl">📚</span><span className="font-medium">Documents</span>
                </button>
                <button onClick={() => { setActiveTab('attendance'); setMobileMenuOpen(false); }} className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${activeTab === 'attendance' ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' : 'hover:bg-gray-50 text-gray-600'}`}>
                  <span className="text-lg sm:text-xl">✅</span><span className="font-medium">Attendance</span>
                </button>
                <button onClick={() => { setActiveTab('assignments'); setMobileMenuOpen(false); }} className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${activeTab === 'assignments' ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' : 'hover:bg-gray-50 text-gray-600'}`}>
                  <span className="text-lg sm:text-xl">📝</span><span className="font-medium">Assignments</span>
                </button>
                <button onClick={() => { setActiveTab('progress'); setMobileMenuOpen(false); }} className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${activeTab === 'progress' ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' : 'hover:bg-gray-50 text-gray-600'}`}>
                  <span className="text-lg sm:text-xl">📊</span><span className="font-medium">Student Progress</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Mobile Responsive */}
        <div className="flex-1 p-3 sm:p-4 md:p-6">
          {!selectedCourse ? (
            <div className="text-center py-12 sm:py-20">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">📚</div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] mb-2">Select a Course</h2>
              <p className="text-sm text-gray-500">Please select a course from the sidebar to start managing</p>
            </div>
          ) : (
            <>
              {/* Announcements Tab - Mobile Responsive */}
              {activeTab === 'announcements' && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">Announcements</h2>
                    <button onClick={() => { setModalType('announcement'); setShowAddModal(true); }} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-lg sm:rounded-xl font-semibold text-sm hover:bg-[#C49B2C] transition w-full sm:w-auto">+ Make Announcement</button>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {announcements.filter(a => String(a.courseId) === String(selectedCourse.courseId)).length === 0 ? (
                      <div className="bg-white rounded-xl p-6 sm:p-8 text-center"><p className="text-gray-500 text-sm">No announcements yet</p></div>
                    ) : (
                      announcements.filter(a => String(a.courseId) === String(selectedCourse.courseId)).map(announcement => (
                        <div key={announcement.id} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-md border-l-4 border-[#D4AF37]">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                            <h3 className="font-bold text-[#0B1F3A] text-base sm:text-lg">{announcement.title}</h3>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <span className="text-[10px] sm:text-xs text-gray-400">{announcement.date}</span>
                              <button onClick={() => handleDeleteAnnouncement(announcement.id)} className="px-2 py-0.5 sm:px-3 sm:py-1 bg-red-500 text-white rounded-lg text-[10px] sm:text-xs hover:bg-red-600 transition">Delete</button>
                            </div>
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">{announcement.description}</p>
                          {announcement.link && <a href={announcement.link} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] text-xs sm:text-sm hover:underline flex items-center gap-1 break-all">🔗 Join Link: {announcement.link}</a>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Videos Tab - Mobile Responsive with Video Upload */}
              {activeTab === 'videos' && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">Live Sessions & Videos</h2>
                    <button onClick={() => { setModalType('video'); setShowAddModal(true); }} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-lg sm:rounded-xl font-semibold text-sm hover:bg-[#C49B2C] transition w-full sm:w-auto">+ Add Session/Video</button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:gap-5">
                    {videos.filter(v => String(v.courseId) === String(selectedCourse.courseId)).length === 0 ? (
                      <div className="bg-white rounded-xl p-6 sm:p-8 text-center"><p className="text-gray-500 text-sm">No videos or sessions added yet</p></div>
                    ) : (
                      videos.filter(v => String(v.courseId) === String(selectedCourse.courseId)).map(video => (
                        <div key={video.id} className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition p-4 sm:p-5">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                            <h3 className="font-bold text-[#0B1F3A] text-base sm:text-lg">{video.title}</h3>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <span className="text-[10px] sm:text-xs text-gray-400">{video.date}</span>
                              <button onClick={() => handleDeleteVideo(video.id)} className="px-2 py-0.5 sm:px-3 sm:py-1 bg-red-500 text-white rounded-lg text-[10px] sm:text-xs hover:bg-red-600 transition">Delete</button>
                            </div>
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm mb-3">{video.description}</p>
                          {video.link && (
                            <a href={video.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#D4AF37] hover:text-[#0B1F3A] transition">🎥 Watch Session</a>
                          )}
                          {video.videoFile && (
                            <div className="mt-3">
                              <button onClick={() => { const link = document.createElement('a'); link.href = video.videoFile; link.download = video.videoFileName; link.click(); }} className="text-[#D4AF37] text-xs sm:text-sm flex items-center gap-1 hover:underline">📹 Download Video</button>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Documents Tab - Mobile Responsive */}
              {activeTab === 'documents' && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">Study Materials</h2>
                    <button onClick={() => { setModalType('document'); setShowAddModal(true); }} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-lg sm:rounded-xl font-semibold text-sm hover:bg-[#C49B2C] transition w-full sm:w-auto">+ Upload Document</button>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {documents.filter(d => String(d.courseId) === String(selectedCourse.courseId)).length === 0 ? (
                      <div className="bg-white rounded-xl p-6 sm:p-8 text-center"><p className="text-gray-500 text-sm">No documents uploaded yet</p></div>
                    ) : (
                      documents.filter(d => String(d.courseId) === String(selectedCourse.courseId)).map(doc => (
                        <div key={doc.id} className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D4AF37]/10 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl">📄</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-[#0B1F3A] text-sm sm:text-base">{doc.title}</h3>
                            <p className="text-[10px] sm:text-xs text-gray-400">{doc.date}</p>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button onClick={() => { api.downloadFile(doc.fileUrl, doc.fileName || 'document').catch((error) => { alert(error?.message || 'Failed to download file'); }); }} className="flex-1 sm:flex-none px-2 py-1 sm:px-3 sm:py-1.5 bg-[#D4AF37] text-[#0B1F3A] rounded-lg text-xs font-semibold">Download</button>
                            <button onClick={() => handleDeleteDocument(doc.id)} className="flex-1 sm:flex-none px-2 py-1 sm:px-3 sm:py-1.5 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 transition">Delete</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Attendance Tab - Mobile Responsive */}
              {activeTab === 'attendance' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] mb-4 sm:mb-6">Attendance Overview</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white"><p className="text-xs sm:text-sm opacity-90">Total Students</p><p className="text-2xl sm:text-3xl font-bold mt-1">{attendanceStats.totalStudents}</p></div>
                    <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white"><p className="text-xs sm:text-sm opacity-90">Present Count</p><p className="text-2xl sm:text-3xl font-bold mt-1">{attendanceStats.presentToday}</p></div>
                    <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white"><p className="text-xs sm:text-sm opacity-90">Records Shown</p><p className="text-2xl sm:text-3xl font-bold mt-1">{attendanceStats.recordCount}</p></div>
                  </div>
                  <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 overflow-x-auto">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-3 sm:mb-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A]">Attendance Records</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Filter by date to review a specific day's attendance.</p>
                      </div>
                      <div className="w-full sm:w-64">
                        <label className="block text-xs font-medium text-[#0B1F3A] mb-1">Filter by date</label>
                        <input
                          type="date"
                          value={attendanceDateFilter}
                          onChange={(e) => setAttendanceDateFilter(e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>
                    <table className="w-full min-w-[400px]">
                      <thead className="bg-[#F8F4EC]">
                        <tr>
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm">Student Name</th>
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm">Date</th>
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getFilteredAttendance().slice(0, 10).map(record => {
                          const student = students.find((s) => String(s.id) === String(record.studentId));
                          return (
                            <tr key={record.id} className="border-b border-gray-100">
                              <td className="p-2 sm:p-3 text-xs sm:text-sm">{student?.fullName || 'Unknown'}</td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm">{record.displayDate || (record.date ? new Date(record.date).toLocaleString() : '')}</td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm"><span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs ${getAttendanceBadgeStyle(record.status)}`}>{record.status}</span></td>
                            </tr>
                          );
                        })}
                        {getFilteredAttendance().length === 0 && (
                          <tr>
                            <td colSpan="3" className="text-center p-6 sm:p-8 text-gray-500 text-sm">No attendance records found for the selected date</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Assignments Tab - Mobile Responsive */}
              {activeTab === 'assignments' && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">Assignments</h2>
                    <button onClick={() => { setModalType('assignment'); setShowAddModal(true); }} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-lg sm:rounded-xl font-semibold text-sm hover:bg-[#C49B2C] transition w-full sm:w-auto">+ Create Assignment</button>
                  </div>
                  <div className="space-y-4 sm:space-y-5">
                    {assignments.filter(a => String(a.courseId) === String(selectedCourse.courseId)).length === 0 ? (
                      <div className="bg-white rounded-xl p-6 sm:p-8 text-center"><p className="text-gray-500 text-sm">No assignments created yet</p></div>
                    ) : (
                      assignments.filter(a => String(a.courseId) === String(selectedCourse.courseId)).map(assignment => {
                        const submissionsCount = submissions.filter(s => s.assignmentId === assignment.id).length;
                        return (
                          <div key={assignment.id} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-md border border-[#D4AF37]/20">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                              <div>
                                <h3 className="font-bold text-[#0B1F3A] text-base sm:text-lg">{assignment.title}</h3>
                                <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Created: {assignment.date}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-orange-100 text-orange-700 rounded-full text-[10px] sm:text-xs whitespace-nowrap">Due: {assignment.dueDate}</span>
                                <button onClick={() => handleDeleteAssignment(assignment.id)} className="px-2 py-0.5 sm:px-3 sm:py-1 bg-red-500 text-white rounded-lg text-[10px] sm:text-xs hover:bg-red-600 transition">Delete</button>
                              </div>
                            </div>
                            <p className="text-gray-600 text-xs sm:text-sm mb-3">{assignment.description}</p>
                            {assignment.attachmentUrl && (
                              <div className="mb-3"><button onClick={() => { api.downloadFile(assignment.attachmentUrl, assignment.attachmentName || 'assignment').catch((error) => { alert(error?.message || 'Failed to download assignment file'); }); }} className="text-[#D4AF37] text-xs sm:text-sm flex items-center gap-1 hover:underline">📎 Download Assignment File</button></div>
                            )}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                              <div className="flex gap-3"><span className="text-[10px] sm:text-xs text-gray-500">📝 Total Marks: {assignment.totalMarks}</span><span className="text-[10px] sm:text-xs text-gray-500">📤 Submissions: {submissionsCount}</span></div>
                              <button onClick={() => viewSubmissions(assignment.id, assignment.title, assignment.totalMarks)} className="text-[#D4AF37] text-xs sm:text-sm font-semibold hover:underline">View Submissions →</button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* Student Progress Tab - Mobile Responsive */}
              {activeTab === 'progress' && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] mb-4 sm:mb-6">Student Progress</h2>
                  <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-[#F8F4EC]">
                        <tr>
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm">Student Name</th>
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm">Email</th>
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm">Program</th>
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm">Done</th>
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm">Avg Score</th>
                          <th className="text-left p-2 sm:p-3 text-xs sm:text-sm">Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(student => {
                          const progress = getStudentProgress(student.id);
                          return (
                            <tr key={student.id} className="border-b border-gray-100 hover:bg-[#F8F4EC]/50">
                              <td className="p-2 sm:p-3 text-xs sm:text-sm font-medium">{student.fullName}</td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm">{student.email}</td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm">{student.program === 'hrm' ? 'HRM' : 'Buddhist'}</td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm">{progress.submittedCount}/{progress.totalAssignments}</td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm">{progress.averageScore}%</td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm">
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#D4AF37] rounded-full" style={{ width: `${progress.progress}%` }}></div>
                                  </div>
                                  <span className="text-[10px] sm:text-xs font-medium">{progress.progress}%</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {students.length === 0 && (
                          <tr>
                            <td colSpan="6" className="text-center p-6 sm:p-8 text-gray-500 text-sm">No students enrolled yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add Modal - Mobile Responsive with Video Upload */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A]">
                {modalType === 'announcement' && 'Make Announcement'}
                {modalType === 'video' && 'Add Live Session/Video'}
                {modalType === 'document' && 'Upload Document'}
                {modalType === 'assignment' && 'Create Assignment'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div><label className="block text-xs sm:text-sm font-medium text-[#0B1F3A] mb-1">Title *</label><input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" placeholder="Enter title" /></div>
              <div><label className="block text-xs sm:text-sm font-medium text-[#0B1F3A] mb-1">Description</label><textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] resize-none" rows="3" placeholder="Enter description"></textarea></div>

              {(modalType === 'announcement' || modalType === 'video') && (
                <div><label className="block text-xs sm:text-sm font-medium text-[#0B1F3A] mb-1">{modalType === 'announcement' ? 'Meeting/Resource Link' : 'YouTube/Zoom Link'}</label><input type="url" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" placeholder="https://..." /></div>
              )}

              {modalType === 'video' && (
                <div><label className="block text-xs sm:text-sm font-medium text-[#0B1F3A] mb-1">Or Upload Video File</label><input type="file" onChange={(e) => handleFileUpload(e, 'video')} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" accept=".mp4,.mov,.avi,.mkv,.webm" /><p className="text-[10px] text-gray-400 mt-1">Supported: MP4, MOV, AVI, MKV, WEBM (Max 100MB)</p></div>
              )}

              {modalType === 'assignment' && (
                <>
                  <div><label className="block text-xs sm:text-sm font-medium text-[#0B1F3A] mb-1">Due Date *</label><input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" /></div>
                  <div><label className="block text-xs sm:text-sm font-medium text-[#0B1F3A] mb-1">Total Marks *</label><input type="number" value={formData.totalMarks} onChange={(e) => setFormData({...formData, totalMarks: e.target.value})} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" placeholder="100" /></div>
                  <div><label className="block text-xs sm:text-sm font-medium text-[#0B1F3A] mb-1">Upload Assignment File</label><input type="file" onChange={(e) => handleFileUpload(e, 'assignment')} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip" /></div>
                </>
              )}

              {modalType === 'document' && (
                <div><label className="block text-xs sm:text-sm font-medium text-[#0B1F3A] mb-1">Upload File *</label><input type="file" onChange={(e) => handleFileUpload(e, 'document')} className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" /></div>
              )}
            </div>

            <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6">
              <button onClick={() => { if (modalType === 'announcement') handleAddAnnouncement(); else if (modalType === 'video') handleAddVideo(); else if (modalType === 'document') handleAddDocument(); else if (modalType === 'assignment') handleAddAssignment(); }} className="flex-1 py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-lg font-semibold text-sm hover:bg-[#C49B2C] transition">Save</button>
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-2 border border-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-50 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;