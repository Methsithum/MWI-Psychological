const BASE = import.meta.env.VITE_API_BASE || '';
import auth from './auth';

const ABSOLUTE_URL = /^https?:\/\//i;
const CLOUDINARY_HOST = 'res.cloudinary.com';

function isCloudinaryUrl(url) {
  return Boolean(url && String(url).includes(CLOUDINARY_HOST));
}

function resolveFileUrl(path) {
  if (!path) return '';

  const input = String(path);
  if (ABSOLUTE_URL.test(input) || input.startsWith('data:') || input.startsWith('blob:')) {
    return input;
  }

  const normalized = input.replace(/\\/g, '/');
  if (normalized.startsWith('/')) {
    return `${BASE}${normalized}`;
  }

  return `${BASE}/${normalized}`;
}

async function downloadFile(path, fileName = 'download', resource = null) {
  const token = auth.getToken();

  if (resource?.type && resource?.id) {
    const response = await fetch(
      `${BASE}/api/files/${encodeURIComponent(resource.type)}/${encodeURIComponent(resource.id)}/download`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    if (!response.ok) {
      let message = `Failed to download file (${response.status})`;
      try {
        const body = await response.json();
        if (body?.message) message = body.message;
      } catch {
        // ignore parse errors
      }
      throw new Error(message);
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = fileName || 'download';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
    return;
  }

  const resolvedUrl = resolveFileUrl(path);
  if (!resolvedUrl) {
    throw new Error('File URL is not available');
  }

  const response = await fetch(resolvedUrl);
  if (!response.ok) {
    throw new Error(`Failed to download file (${response.status})`);
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(objectUrl);
}

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
  resolveFileUrl,
  isCloudinaryUrl,
  downloadFile,

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

  async uploadAssignment(formData) {
    return fetch(`${BASE}/api/assignments`, {
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

  async deleteAssignment(assignmentId) {
    return request(`/api/assignments/${encodeURIComponent(assignmentId)}`, {
      method: 'DELETE'
    });
  },

  async deleteVideo(videoId) {
    return request(`/api/videos/${encodeURIComponent(videoId)}`, {
      method: 'DELETE'
    });
  },

  async deleteMaterial(materialId) {
    return request(`/api/materials/${encodeURIComponent(materialId)}`, {
      method: 'DELETE'
    });
  },

  async submitAssignment(formData) {
    return fetch(`${BASE}/api/submissions`, {
      method: 'POST',
      headers: { ...(auth.getToken() ? { Authorization: `Bearer ${auth.getToken()}` } : {}) },
      body: formData
    }).then((res) => res.json());
  },

  async getAssignmentSubmissions(assignmentId) {
    return request(`/api/submissions/assignment/${encodeURIComponent(assignmentId)}`);
  },

  async getMySubmissions(courseId) {
    const qs = courseId ? `?courseId=${encodeURIComponent(courseId)}` : '';
    return request(`/api/submissions/student/me${qs}`);
  },

  async gradeSubmission(submissionId, grade) {
    return request(`/api/submissions/${encodeURIComponent(submissionId)}/grade`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grade })
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

  async createAnnouncement(payload) {
    return request('/api/notifications/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  },

  async deleteAnnouncement(groupId) {
    return request(`/api/notifications/announcements/${encodeURIComponent(groupId)}`, {
      method: 'DELETE'
    });
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

  async login(email, password) {
    return request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  },

  async getCurrentUser() {
    return request('/api/auth/me');
  },

  async changePassword(currentPassword, newPassword) {
    return request('/api/auth/change-password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword })
    });
  }
};
