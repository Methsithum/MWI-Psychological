import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('announcements');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    dueDate: '',
    totalMarks: '',
    file: null,
    assignmentFile: null
  });

  // Load data from localStorage
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    setCourses(savedCourses);

    const savedAnnouncements = JSON.parse(localStorage.getItem('announcements') || '[]');
    setAnnouncements(savedAnnouncements);

    const savedVideos = JSON.parse(localStorage.getItem('videos') || '[]');
    setVideos(savedVideos);

    const savedDocuments = JSON.parse(localStorage.getItem('documents') || '[]');
    setDocuments(savedDocuments);

    const savedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    setAssignments(savedAssignments);

    const savedSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    setSubmissions(savedSubmissions);

    const savedStudents = JSON.parse(localStorage.getItem('approvedUsers') || '[]');
    setStudents(savedStudents);

    const savedAttendance = JSON.parse(localStorage.getItem('attendance') || '[]');
    setAttendance(savedAttendance);
  }, []);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'assignment') {
          setFormData({ ...formData, assignmentFile: reader.result, assignmentFileName: file.name });
        } else {
          setFormData({ ...formData, file: reader.result, fileName: file.name });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Delete functions
  const handleDeleteAnnouncement = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      const updated = announcements.filter(a => a.id !== id);
      setAnnouncements(updated);
      localStorage.setItem('announcements', JSON.stringify(updated));
      addActivity(`Deleted announcement`, 'announcement');
      alert('Announcement deleted successfully!');
    }
  };

  const handleDeleteVideo = (id) => {
    if (window.confirm('Are you sure you want to delete this video/session?')) {
      const updated = videos.filter(v => v.id !== id);
      setVideos(updated);
      localStorage.setItem('videos', JSON.stringify(updated));
      addActivity(`Deleted video/session`, 'video');
      alert('Video/Session deleted successfully!');
    }
  };

  const handleDeleteDocument = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      const updated = documents.filter(d => d.id !== id);
      setDocuments(updated);
      localStorage.setItem('documents', JSON.stringify(updated));
      addActivity(`Deleted document`, 'document');
      alert('Document deleted successfully!');
    }
  };

  const handleDeleteAssignment = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment? All student submissions will also be removed.')) {
      const updated = assignments.filter(a => a.id !== id);
      setAssignments(updated);
      localStorage.setItem('assignments', JSON.stringify(updated));
      
      const updatedSubmissions = submissions.filter(s => s.assignmentId !== id);
      setSubmissions(updatedSubmissions);
      localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
      
      addActivity(`Deleted assignment`, 'assignment');
      alert('Assignment deleted successfully!');
    }
  };

  // Add Announcement
  const handleAddAnnouncement = () => {
    if (formData.title && formData.description) {
      const newAnnouncement = {
        id: Date.now(),
        courseId: selectedCourse?.id,
        courseName: selectedCourse?.name,
        title: formData.title,
        description: formData.description,
        link: formData.link,
        date: new Date().toLocaleString(),
        type: 'announcement'
      };
      const updated = [newAnnouncement, ...announcements];
      setAnnouncements(updated);
      localStorage.setItem('announcements', JSON.stringify(updated));
      addActivity(`Added announcement: ${formData.title} for ${selectedCourse?.name}`, 'announcement');
      setShowAddModal(false);
      setFormData({ title: '', description: '', link: '', dueDate: '', totalMarks: '', file: null, assignmentFile: null });
      alert('Announcement posted successfully!');
    } else {
      alert('Please fill title and description');
    }
  };

  // Add Video
  const handleAddVideo = () => {
    if (formData.title && formData.link) {
      const newVideo = {
        id: Date.now(),
        courseId: selectedCourse?.id,
        courseName: selectedCourse?.name,
        title: formData.title,
        description: formData.description,
        link: formData.link,
        date: new Date().toLocaleString(),
        type: 'video'
      };
      const updated = [newVideo, ...videos];
      setVideos(updated);
      localStorage.setItem('videos', JSON.stringify(updated));
      addActivity(`Added video: ${formData.title} for ${selectedCourse?.name}`, 'video');
      setShowAddModal(false);
      setFormData({ title: '', description: '', link: '', dueDate: '', totalMarks: '', file: null, assignmentFile: null });
      alert('Video added successfully!');
    } else {
      alert('Please fill title and meeting link');
    }
  };

  // Add Document
  const handleAddDocument = () => {
    if (formData.title && formData.file) {
      const newDocument = {
        id: Date.now(),
        courseId: selectedCourse?.id,
        courseName: selectedCourse?.name,
        title: formData.title,
        description: formData.description,
        file: formData.file,
        fileName: formData.fileName,
        date: new Date().toLocaleString(),
        type: 'document'
      };
      const updated = [newDocument, ...documents];
      setDocuments(updated);
      localStorage.setItem('documents', JSON.stringify(updated));
      addActivity(`Uploaded document: ${formData.title} for ${selectedCourse?.name}`, 'document');
      setShowAddModal(false);
      setFormData({ title: '', description: '', link: '', dueDate: '', totalMarks: '', file: null, assignmentFile: null });
      alert('Document uploaded successfully!');
    } else {
      alert('Please fill title and select a file');
    }
  };

  // Add Assignment
  const handleAddAssignment = () => {
    if (formData.title && formData.dueDate && formData.totalMarks) {
      const newAssignment = {
        id: Date.now(),
        courseId: selectedCourse?.id,
        courseName: selectedCourse?.name,
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        totalMarks: formData.totalMarks,
        assignmentFile: formData.assignmentFile || null,
        assignmentFileName: formData.assignmentFileName || null,
        date: new Date().toLocaleString(),
        type: 'assignment'
      };
      const updated = [newAssignment, ...assignments];
      setAssignments(updated);
      localStorage.setItem('assignments', JSON.stringify(updated));
      addActivity(`Created assignment: ${formData.title} for ${selectedCourse?.name}`, 'assignment');
      setShowAddModal(false);
      setFormData({ title: '', description: '', link: '', dueDate: '', totalMarks: '', file: null, assignmentFile: null });
      alert('Assignment created successfully!');
    } else {
      alert('Please fill all required fields');
    }
  };

  const viewSubmissions = (assignmentId, assignmentTitle, totalMarks) => {
    const assignmentSubmissions = submissions.filter(s => s.assignmentId === assignmentId);
    if (assignmentSubmissions.length === 0) {
      alert(`No submissions yet for "${assignmentTitle}"`);
    } else {
      let message = `Submissions for "${assignmentTitle}":\n\n`;
      assignmentSubmissions.forEach(s => {
        const student = students.find(st => st.id === s.studentId);
        message += `${student?.fullName}: ${s.score || 'Not graded'}/${totalMarks}\n`;
        if (s.file) message += `  📎 File attached\n`;
      });
      alert(message);
    }
  };

  const getAttendanceStats = () => {
    const totalStudents = students.length;
    const presentToday = attendance.filter(a => {
      const today = new Date().toDateString();
      return new Date(a.date).toDateString() === today;
    }).length;
    return { totalStudents, presentToday, attendanceRate: totalStudents ? ((presentToday / totalStudents) * 100).toFixed(1) : 0 };
  };

  const getStudentProgress = (studentId) => {
    const studentSubmissions = submissions.filter(s => s.studentId === studentId);
    const totalAssignments = assignments.filter(a => a.courseId === selectedCourse?.id).length;
    const submittedCount = studentSubmissions.length;
    const averageScore = studentSubmissions.length > 0 
      ? (studentSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / studentSubmissions.length).toFixed(1)
      : 0;
    return { submittedCount, totalAssignments, averageScore, progress: totalAssignments ? ((submittedCount / totalAssignments) * 100).toFixed(1) : 0 };
  };

  const attendanceStats = getAttendanceStats();

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      {/* Teacher Navbar */}
      <nav className="bg-[#0B1F3A] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                <span className="text-[#0B1F3A] font-bold text-lg">PWI</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">Lecturer Dashboard</h1>
                <p className="text-xs text-white/60">PWI Psychological Institute</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">👩‍🏫</span>
                </div>
                <span className="text-sm hidden md:block">K.M. Imasha Isurunee</span>
              </div>
              <button 
                onClick={() => navigate('/')}
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
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0B1F3A] mb-2">Select Course</label>
              <select
                value={selectedCourse?.id || ''}
                onChange={(e) => {
                  const course = courses.find(c => c.id === parseInt(e.target.value));
                  setSelectedCourse(course);
                }}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="">Select a course</option>
                {courses.filter(c => c.status === 'active').map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>

            {selectedCourse && (
              <div className="space-y-1">
                <button onClick={() => setActiveTab('announcements')} className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${activeTab === 'announcements' ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' : 'hover:bg-gray-50 text-gray-600'}`}>
                  <span className="text-xl">📢</span><span className="font-medium">Announcements</span>
                </button>
                <button onClick={() => setActiveTab('videos')} className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${activeTab === 'videos' ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' : 'hover:bg-gray-50 text-gray-600'}`}>
                  <span className="text-xl">🎥</span><span className="font-medium">Live Sessions / Videos</span>
                </button>
                <button onClick={() => setActiveTab('documents')} className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${activeTab === 'documents' ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' : 'hover:bg-gray-50 text-gray-600'}`}>
                  <span className="text-xl">📚</span><span className="font-medium">Documents</span>
                </button>
                <button onClick={() => setActiveTab('attendance')} className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${activeTab === 'attendance' ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' : 'hover:bg-gray-50 text-gray-600'}`}>
                  <span className="text-xl">✅</span><span className="font-medium">Attendance</span>
                </button>
                <button onClick={() => setActiveTab('assignments')} className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${activeTab === 'assignments' ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' : 'hover:bg-gray-50 text-gray-600'}`}>
                  <span className="text-xl">📝</span><span className="font-medium">Assignments</span>
                </button>
                <button onClick={() => setActiveTab('progress')} className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${activeTab === 'progress' ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#C49B2C]/10 text-[#0B1F3A] border-l-4 border-[#D4AF37]' : 'hover:bg-gray-50 text-gray-600'}`}>
                  <span className="text-xl">📊</span><span className="font-medium">Student Progress</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {!selectedCourse ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-2">Select a Course</h2>
              <p className="text-gray-500">Please select a course from the sidebar to start managing</p>
            </div>
          ) : (
            <>
              {/* Announcements Tab */}
              {activeTab === 'announcements' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#0B1F3A]">Announcements</h2>
                    <button onClick={() => { setModalType('announcement'); setShowAddModal(true); }} className="px-4 py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-semibold hover:bg-[#C49B2C] transition">+ Make Announcement</button>
                  </div>
                  <div className="space-y-4">
                    {announcements.filter(a => a.courseId === selectedCourse.id).length === 0 ? (
                      <div className="bg-white rounded-xl p-8 text-center"><p className="text-gray-500">No announcements yet</p></div>
                    ) : (
                      announcements.filter(a => a.courseId === selectedCourse.id).map(announcement => (
                        <div key={announcement.id} className="bg-white rounded-xl p-5 shadow-md border-l-4 border-[#D4AF37]">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-[#0B1F3A] text-lg">{announcement.title}</h3>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-400">{announcement.date}</span>
                              <button onClick={() => handleDeleteAnnouncement(announcement.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition">Delete</button>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{announcement.description}</p>
                          {announcement.link && <a href={announcement.link} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] text-sm hover:underline flex items-center gap-1">🔗 Join Link: {announcement.link}</a>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Videos Tab */}
              {activeTab === 'videos' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#0B1F3A]">Live Sessions & Videos</h2>
                    <button onClick={() => { setModalType('video'); setShowAddModal(true); }} className="px-4 py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-semibold hover:bg-[#C49B2C] transition">+ Add Session/Video</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {videos.filter(v => v.courseId === selectedCourse.id).length === 0 ? (
                      <div className="col-span-2 bg-white rounded-xl p-8 text-center"><p className="text-gray-500">No videos or sessions added yet</p></div>
                    ) : (
                      videos.filter(v => v.courseId === selectedCourse.id).map(video => (
                        <div key={video.id} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-[#0B1F3A]">{video.title}</h3>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-400">{video.date}</span>
                              <button onClick={() => handleDeleteVideo(video.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition">Delete</button>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                          <a href={video.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg text-sm font-semibold hover:bg-[#D4AF37] hover:text-[#0B1F3A] transition">🎥 Join Session</a>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#0B1F3A]">Study Materials</h2>
                    <button onClick={() => { setModalType('document'); setShowAddModal(true); }} className="px-4 py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-semibold hover:bg-[#C49B2C] transition">+ Upload Document</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.filter(d => d.courseId === selectedCourse.id).length === 0 ? (
                      <div className="col-span-2 bg-white rounded-xl p-8 text-center"><p className="text-gray-500">No documents uploaded yet</p></div>
                    ) : (
                      documents.filter(d => d.courseId === selectedCourse.id).map(doc => (
                        <div key={doc.id} className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center text-2xl">📄</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-[#0B1F3A]">{doc.title}</h3>
                            <p className="text-xs text-gray-400">{doc.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => { const link = document.createElement('a'); link.href = doc.file; link.download = doc.fileName; link.click(); }} className="px-3 py-1.5 bg-[#D4AF37] text-[#0B1F3A] rounded-lg text-xs font-semibold">Download</button>
                            <button onClick={() => handleDeleteDocument(doc.id)} className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 transition">Delete</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Attendance Tab */}
              {activeTab === 'attendance' && (
                <div>
                  <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">Attendance Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] rounded-2xl p-6 text-white"><p className="text-sm opacity-90">Total Students</p><p className="text-3xl font-bold mt-1">{attendanceStats.totalStudents}</p></div>
                    <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] rounded-2xl p-6 text-white"><p className="text-sm opacity-90">Present Today</p><p className="text-3xl font-bold mt-1">{attendanceStats.presentToday}</p></div>
                    <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5A] rounded-2xl p-6 text-white"><p className="text-sm opacity-90">Today's Attendance Rate</p><p className="text-3xl font-bold mt-1">{attendanceStats.attendanceRate}%</p></div>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-[#0B1F3A] mb-4">Recent Attendance Records</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-[#F8F4EC]"><tr><th className="text-left p-3 text-sm">Student Name</th><th className="text-left p-3 text-sm">Date</th><th className="text-left p-3 text-sm">Status</th></tr></thead>
                        <tbody>
                          {attendance.slice(0, 10).map(record => {
                            const student = students.find(s => s.id === record.studentId);
                            return (<tr key={record.id} className="border-b border-gray-100"><td className="p-3 text-sm">{student?.fullName || 'Unknown'}</td><td className="p-3 text-sm">{record.date}</td><td className="p-3 text-sm"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Present</span></td></tr>);
                          })}
                          {attendance.length === 0 && (<tr><td colSpan="3" className="text-center p-8 text-gray-500">No attendance records yet</td></tr>)}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-gray-400 mt-4 text-center">* Attendance is automatically marked when students log into their dashboard</p>
                  </div>
                </div>
              )}

              {/* Assignments Tab */}
              {activeTab === 'assignments' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#0B1F3A]">Assignments</h2>
                    <button onClick={() => { setModalType('assignment'); setShowAddModal(true); }} className="px-4 py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-semibold hover:bg-[#C49B2C] transition">+ Create Assignment</button>
                  </div>
                  <div className="space-y-5">
                    {assignments.filter(a => a.courseId === selectedCourse.id).length === 0 ? (
                      <div className="bg-white rounded-xl p-8 text-center"><p className="text-gray-500">No assignments created yet</p></div>
                    ) : (
                      assignments.filter(a => a.courseId === selectedCourse.id).map(assignment => {
                        const submissionsCount = submissions.filter(s => s.assignmentId === assignment.id).length;
                        return (
                          <div key={assignment.id} className="bg-white rounded-xl p-5 shadow-md border border-[#D4AF37]/20">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="font-bold text-[#0B1F3A] text-lg">{assignment.title}</h3>
                                <p className="text-xs text-gray-400 mt-1">Created: {assignment.date}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Due: {assignment.dueDate}</span>
                                <button onClick={() => handleDeleteAssignment(assignment.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition">Delete</button>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{assignment.description}</p>
                            {assignment.assignmentFile && (
                              <div className="mb-3">
                                <button onClick={() => { const link = document.createElement('a'); link.href = assignment.assignmentFile; link.download = assignment.assignmentFileName; link.click(); }} className="text-[#D4AF37] text-sm flex items-center gap-1 hover:underline">📎 Download Assignment File</button>
                              </div>
                            )}
                            <div className="flex justify-between items-center">
                              <div className="flex gap-3"><span className="text-xs text-gray-500">📝 Total Marks: {assignment.totalMarks}</span><span className="text-xs text-gray-500">📤 Submissions: {submissionsCount}</span></div>
                              <button onClick={() => viewSubmissions(assignment.id, assignment.title, assignment.totalMarks)} className="text-[#D4AF37] text-sm font-semibold hover:underline">View Submissions →</button>
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
                <div>
                  <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">Student Progress</h2>
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-[#F8F4EC]"><tr><th className="text-left p-3 text-sm">Student Name</th><th className="text-left p-3 text-sm">Email</th><th className="text-left p-3 text-sm">Program</th><th className="text-left p-3 text-sm">Assignments Done</th><th className="text-left p-3 text-sm">Avg Score</th><th className="text-left p-3 text-sm">Progress</th></tr></thead>
                        <tbody>
                          {students.map(student => {
                            const progress = getStudentProgress(student.id);
                            return (<tr key={student.id} className="border-b border-gray-100 hover:bg-[#F8F4EC]/50"><td className="p-3 text-sm font-medium">{student.fullName}</td><td className="p-3 text-sm">{student.email}</td><td className="p-3 text-sm">{student.program === 'hrm' ? 'HRM Program' : 'Buddhist Counselling'}</td><td className="p-3 text-sm">{progress.submittedCount}/{progress.totalAssignments}</td><td className="p-3 text-sm">{progress.averageScore}%</td><td className="p-3 text-sm"><div className="flex items-center gap-2"><div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-[#D4AF37] rounded-full" style={{ width: `${progress.progress}%` }}></div></div><span className="text-xs font-medium">{progress.progress}%</span></div></td></tr>);
                          })}
                          {students.length === 0 && (<tr><td colSpan="6" className="text-center p-8 text-gray-500">No students enrolled yet</td></tr>)}
                        </tbody>
                      </table>
                    </div>
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
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#0B1F3A]">
                {modalType === 'announcement' && 'Make Announcement'}
                {modalType === 'video' && 'Add Live Session/Video'}
                {modalType === 'document' && 'Upload Document'}
                {modalType === 'assignment' && 'Create Assignment'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-[#0B1F3A] mb-1">Title *</label><input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" placeholder="Enter title" /></div>
              <div><label className="block text-sm font-medium text-[#0B1F3A] mb-1">Description</label><textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] resize-none" rows="3" placeholder="Enter description"></textarea></div>

              {(modalType === 'announcement' || modalType === 'video') && (
                <div><label className="block text-sm font-medium text-[#0B1F3A] mb-1">{modalType === 'announcement' ? 'Meeting/Resource Link (Optional)' : 'Zoom/Teams Link *'}</label><input type="url" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" placeholder="https://..." /></div>
              )}

              {modalType === 'assignment' && (
                <>
                  <div><label className="block text-sm font-medium text-[#0B1F3A] mb-1">Due Date *</label><input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" /></div>
                  <div><label className="block text-sm font-medium text-[#0B1F3A] mb-1">Total Marks *</label><input type="number" value={formData.totalMarks} onChange={(e) => setFormData({...formData, totalMarks: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" placeholder="100" /></div>
                  <div><label className="block text-sm font-medium text-[#0B1F3A] mb-1">Upload Assignment File (Optional)</label><input type="file" onChange={(e) => handleFileUpload(e, 'assignment')} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip" /></div>
                </>
              )}

              {modalType === 'document' && (
                <div><label className="block text-sm font-medium text-[#0B1F3A] mb-1">Upload File *</label><input type="file" onChange={(e) => handleFileUpload(e, 'document')} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" /></div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => { if (modalType === 'announcement') handleAddAnnouncement(); else if (modalType === 'video') handleAddVideo(); else if (modalType === 'document') handleAddDocument(); else if (modalType === 'assignment') handleAddAssignment(); }} className="flex-1 py-2 bg-[#D4AF37] text-[#0B1F3A] rounded-xl font-semibold hover:bg-[#C49B2C] transition">Save</button>
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-2 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;