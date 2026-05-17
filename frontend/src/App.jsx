import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Landing Pages
import HomePage from './pages/Landing/HomePage';
import AboutPage from './pages/Landing/AboutPage';
import HowToApplyPage from './pages/Landing/HowToApplyPage';
import ContactPage from './pages/Landing/ContactPage';

// Auth Pages (to be created)


// Role-based dashboards (to be created)
// import StudentDashboard from './pages/student/StudentDashboard';
// import LecturerDashboard from './pages/lecturer/LecturerDashboard';
// import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-to-apply" element={<HowToApplyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Auth Pages */}
      
        
        {/* Protected Routes - To be added after signup */}
        {/* <Route path="/student/*" element={<StudentDashboard />} /> */}
        {/* <Route path="/lecturer/*" element={<LecturerDashboard />} /> */}
        {/* <Route path="/admin/*" element={<AdminDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;