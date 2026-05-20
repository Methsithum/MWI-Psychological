const BASE = import.meta.env.VITE_API_BASE || '';
import auth from './auth';

async function request(path, options = {}) {
  const headers = options.headers || {};
  const token = auth.getToken();
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const opts = { ...options, headers };
  const res = await fetch(`${BASE}${path}`, opts);
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export default {
  request,

  async getCourses() {
    return request('/api/courses');
  },

  async getAvailableCourses() {
    return request('/api/courses/available');
  },

  async getPendingStudents(courseId) {
    const qs = courseId ? `?courseId=${encodeURIComponent(courseId)}` : '';
    return request(`/api/users/pending-students${qs}`);
  },

  async getAllUsers() {
    return request('/api/users');
  },

  async approveStudent(studentId) {
    return request(`/api/users/students/${encodeURIComponent(studentId)}/approve`, { method: 'PATCH' });
  },

  async rejectStudent(studentId, reason = '') {
    return request(`/api/users/students/${encodeURIComponent(studentId)}/reject`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    });
  },

  async getDashboardSummary() {
    return request('/api/dashboard/summary');
  },

  async getCourseStudents(courseId, status = 'all') {
    return request(`/api/students/course/${encodeURIComponent(courseId)}?status=${encodeURIComponent(status)}`);
  },

  async getCourseWiseStudents(status = 'all') {
    return request(`/api/students/course-wise?status=${encodeURIComponent(status)}`);
  },

  async getCourseCounts() {
    return request('/api/students/course-counts');
  },

  async createCourse(courseData) {
    return request('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData)
    });
  },

  async updateCourse(courseId, courseData) {
    return request(`/api/courses/${encodeURIComponent(courseId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData)
    });
  },

  async deleteCourse(courseId) {
    return request(`/api/courses/${encodeURIComponent(courseId)}`, { method: 'DELETE' });
  },

  async getCourseMaterials(courseId) {
    return request(`/api/materials/course/${encodeURIComponent(courseId)}`);
  },

  async getCourseVideos(courseId) {
    return request(`/api/videos/course/${encodeURIComponent(courseId)}`);
  },

  async getCourseAssignments(courseId) {
    return request(`/api/assignments/course/${encodeURIComponent(courseId)}`);
  },

  async getCourseAttendance(courseId) {
    return request(`/api/attendance/course/${encodeURIComponent(courseId)}`);
  },

  async uploadMaterial(formData) {
    return fetch(`${BASE}/api/materials`, {
      method: 'POST',
      headers: { ...(auth.getToken() ? { Authorization: `Bearer ${auth.getToken()}` } : {}) },
      body: formData
    }).then((res) => res.json());
  },

  async uploadVideo(formData) {
    return fetch(`${BASE}/api/videos`, {
      method: 'POST',
      headers: { ...(auth.getToken() ? { Authorization: `Bearer ${auth.getToken()}` } : {}) },
      body: formData
    }).then((res) => res.json());
  },

  async createAssignment(payload) {
    return request('/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  },

  async markAttendance(payload) {
    return request('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  },

  async getNotifications() {
    return request('/api/notifications');
  },

  // formData must be a FormData (multipart) with field name 'paymentSlip' for file
  async registerStudent(formData) {
    // do not set Content-Type so browser will set multipart boundary
    const res = await fetch(`${BASE}/api/auth/register/student`, {
      method: 'POST',
      body: formData,
      headers: { ...(auth.getToken() ? { Authorization: `Bearer ${auth.getToken()}` } : {}) }
    });
    return res.json();
  },

  async login(role, email, password) {
    return request(`/api/auth/login/${encodeURIComponent(role)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  },

  async changePassword(currentPassword, newPassword) {
    return request('/api/auth/change-password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword })
    });
  }
};
