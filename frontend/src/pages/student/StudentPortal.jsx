import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import auth from '../../utils/auth';
import StudentTopbar from '../../components/student/StudentTopbar';

const StudentPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [attendanceSubmitting, setAttendanceSubmitting] = useState(false);

  const [student, setStudent] = useState(() => {
    const user = auth.getUser();
    return {
      id: user?.id || user?._id || 'student',
      fullName: user?.fullName || 'Student',
      email: user?.email || '',
      course: user?.course || null,
      programme: user?.course?.title || user?.programme || '',
      nic: user?.nic || '',
    };
  });

  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [submissions, setSubmissions] = useState([]);
  const [attendance, setAttendance] = useState([]);

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

      setDocuments((materialsRes?.data || []).map((material, idx) => {
        const normalizedFileUrl = material.fileUrl ? String(material.fileUrl).replace(/\\/g, '/') : '';
        const fallbackName = normalizedFileUrl ? normalizedFileUrl.split('/').pop() : 'File';

        return {
          id: material._id || idx,
          courseId: course.courseId || course.id,
          title: material.title,
          fileUrl: normalizedFileUrl,
          fileName: material.fileName || fallbackName,
          date: material.createdAt ? new Date(material.createdAt).toLocaleDateString() : '',
        };
      }));

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
      setSubmissions([]);
      setVideos([]);
      setDocuments([]);
      setAssignments([]);
      setAttendance([]);
      setAnnouncements([]);
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

  // Handle assignment submission
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

  // Handle file upload for submission
  const handleSubmissionFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubmissionFile(file);
    }
  };

  // Get student's submissions for an assignment
  const getStudentSubmission = (assignmentId) => {
    return submissions.find((s) => String(s.assignmentId) === String(assignmentId) && String(s.studentId) === String(student.id));
  };

  // Get student's attendance records
  const getStudentAttendance = () => {
    return attendance.filter((a) => String(a.studentId) === String(student.id));
  };

  // Get attendance percentage
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

  // Filter content by selected course
  const getCourseContent = (contentArray) => {
    if (!selectedCourse) return [];
    return contentArray.filter(item => String(item.courseId) === String(selectedCourse.courseId || selectedCourse.id));
  };

  // Get available courses for student
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

  // Handle document download
  const handleDownload = (doc) => {
    api.downloadFile(doc.fileUrl, doc.fileName || 'document')
      .catch((error) => {
        alert(error?.message || 'Failed to download file');
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F8F5EF] to-white">
      <StudentTopbar student={student} title="Student Portal" subtitle="PWI Psychological Institute" />

      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-[#0B1F3A] to-[#1A3A5A] text-white">
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
                    ? 'bg-linear-to-r from-[#D4AF37] to-[#C49B2C] text-[#0B1F3A] shadow-lg scale-102'
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
                      <div className="bg-linear-to-r from-[#0B1F3A] to-[#1A3A5A] p-4">
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
                            {assignment.attachmentUrl && (
                              <div className="mt-3">
                                <button
                                  onClick={() => {
                                    api.downloadFile(assignment.attachmentUrl, assignment.attachmentName || 'assignment')
                                      .catch((error) => alert(error?.message || 'Failed to download assignment file'));
                                  }}
                                  className="text-[#D4AF37] text-sm flex items-center gap-1 hover:underline"
                                >
                                  📎 Download Assignment File
                                </button>
                              </div>
                            )}
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
                <div className="bg-linear-to-r from-[#D4AF37] to-[#C49B2C] rounded-2xl p-6 text-white mb-6">
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

                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#0B1F3A]">Mark Today's Attendance</h3>
                      <p className="text-sm text-gray-500 mt-1">Tap once when you are present for the selected course.</p>
                    </div>
                    {getTodayAttendanceRecord() ? (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                        Attendance already marked today
                      </span>
                    ) : (
                      <button
                        onClick={handleMarkAttendance}
                        disabled={attendanceSubmitting}
                        className="px-4 py-2.5 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-semibold hover:bg-[#C49B2C] transition disabled:opacity-60"
                      >
                        {attendanceSubmitting ? 'Marking...' : 'Mark Attendance'}
                      </button>
                    )}
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
                              <td className="p-3 text-sm">{record.displayDate || (record.date ? new Date(record.date).toLocaleString() : '')}</td>
                              <td className="p-3 text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs ${getAttendanceBadgeStyle(record.status)}`}>{record.status}</span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-400 mt-4 text-center">
                    * Attendance is recorded by your lecturer from the attendance panel
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