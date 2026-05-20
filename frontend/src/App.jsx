import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Landing Pages
import HomePage from './pages/Landing/HomePage';
import AboutPage from './pages/Landing/AboutPage';
import HowToApplyPage from './pages/Landing/HowToApplyPage';
import ContactPage from './pages/Landing/ContactPage';
import Coursepage from './pages/Landing/Coursepage';
import Registerpage from './pages/Landing/Registerpage';

// Auth Pages (to be created)
import SignInpage from './components/auth/SignInpage';


// Role-based dashboards (to be created)
// import StudentDashboard from './pages/student/StudentDashboard';
import StudentPortal from './pages/student/StudentPortal';
import StudentProfile from './pages/student/StudentProfile';
import StudentSettings from './pages/student/StudentSettings';
// import LecturerDashboard from './pages/lecturer/LecturerDashboard';
import TecherDasboard from './pages/teacher/TeacherDashboard';
// import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-to-apply" element={<HowToApplyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/courses" element={<Coursepage />} />
        <Route path="/register" element={<Registerpage />} />
        
        {/* Auth Pages */}
        <Route path="/signin" element={<SignInpage />} />
      
        
        {/* Protected Routes - To be added after signup */}
        {/* <Route path="/student/*" element={<StudentDashboard />} /> */}
        <Route path="/student" element={<StudentPortal />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/settings" element={<StudentSettings />} />
        {/* <Route path="/lecturer/*" element={<LecturerDashboard />} /> */}
        <Route path="/teacher" element={<TecherDasboard />} />
        {/* <Route path="/admin/*" element={<AdminDashboard />} /> */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;