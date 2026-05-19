import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Landing Pages
import HomePage from './pages/Landing/HomePage';
import AboutPage from './pages/Landing/AboutPage';
import HowToApplyPage from './pages/Landing/HowToApplyPage';
import ContactPage from './pages/Landing/ContactPage';
import Coursepage from './pages/Landing/Coursepage';
import Registerpage from './pages/Landing/Registerpage';

import SignInpage from './components/auth/SignInpage';
import ProtectedRoute from './components/common/ProtectedRoute';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import TeacherDashboard from './pages/dashboard/TeacherDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import CreateCourse from './pages/teacher/CreateCourse';

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
        <Route path="/login" element={<SignInpage />} />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/courses/create"
          element={
            <ProtectedRoute requiredRole="teacher">
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      
      </Routes>
    </Router>
  );
}

export default App;