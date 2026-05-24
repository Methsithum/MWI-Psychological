import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Landing Pages
import HomePage from './pages/Landing/HomePage';
import AboutPage from './pages/Landing/AboutPage';
import HowToApplyPage from './pages/Landing/HowToApplyPage';
import ContactPage from './pages/Landing/ContactPage';
import Coursepage from './pages/Landing/Coursepage';
import Registerpage from './pages/Landing/Registerpage';

// Auth
import SignInpage from './components/auth/SignInpage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';

// Dashboards
import StudentPortal from './pages/student/StudentPortal';
import StudentProfile from './pages/student/StudentProfile';
import StudentSettings from './pages/student/StudentSettings';
import TecherDasboard from './pages/teacher/TeacherDashboard';
import SubmissionReviewPage from './pages/teacher/SubmissionReviewPage';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public landing pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-to-apply" element={<HowToApplyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/courses" element={<Coursepage />} />
        <Route path="/register" element={<Registerpage />} />

        {/* Auth — redirect to dashboard if already signed in */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignInpage />
            </PublicRoute>
          }
        />

        {/* Student routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentPortal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/settings"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentSettings />
            </ProtectedRoute>
          }
        />

        {/* Teacher routes */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TecherDasboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/assignments/:assignmentId/submissions"
          element={
            <ProtectedRoute allowedRoles={['teacher', 'admin']}>
              <SubmissionReviewPage />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
