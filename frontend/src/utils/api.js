const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getStorage = () => localStorage.getItem('token') ? localStorage : sessionStorage;

export const getAuthToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');

export const getAuthUser = () => {
  const storage = getStorage();
  return {
    token: storage.getItem('token') || '',
    userRole: storage.getItem('userRole') || '',
    userName: storage.getItem('userName') || '',
    userId: storage.getItem('userId') || '',
    course: storage.getItem('course') || '',
  };
};

export const setAuthSession = ({ token, role, name, id, course }, rememberMe) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem('token', token);
  storage.setItem('userRole', role);
  storage.setItem('userName', name);
  storage.setItem('userId', id);
  storage.setItem('course', course || '');

  if (rememberMe) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('course');
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('course');
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  localStorage.removeItem('course');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userRole');
  sessionStorage.removeItem('userName');
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('course');
};

export const buildQueryString = (params = {}) => {
  const entries = Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '');
  if (!entries.length) return '';

  const searchParams = new URLSearchParams();
  entries.forEach(([key, value]) => searchParams.set(key, value));
  return `?${searchParams.toString()}`;
};

const request = async (endpoint, { method = 'GET', headers = {}, body, auth = false } = {}) => {
  const finalHeaders = { ...headers };

  if (auth) {
    const token = getAuthToken();
    if (token) {
      finalHeaders.Authorization = `Bearer ${token}`;
    }
  }

  let payload = body;
  if (body && !(body instanceof FormData)) {
    finalHeaders['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: finalHeaders,
    body: payload,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(data?.message || 'Request failed');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const authAPI = {
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  registerStudent: (formData) => request('/auth/register/student', { method: 'POST', body: formData }),
};

export const userAPI = {
  getProfile: () => request('/users/profile', { auth: true }),
  getAll: () => request('/users', { auth: true }),
  getPendingStudents: () => request('/users/pending-students', { auth: true }),
  approveStudent: (id) => request(`/users/students/${id}/approve`, { method: 'PATCH', auth: true }),
  rejectStudent: (id) => request(`/users/students/${id}/reject`, { method: 'PATCH', auth: true }),
};

export const courseAPI = {
  getAll: (query = {}) => request(`/courses${typeof query === 'string' ? query : buildQueryString(query)}`, { auth: true }),
  getById: (id) => request(`/courses/${id}`, { auth: true }),
  getStudents: (id) => request(`/courses/${id}/students`, { auth: true }),
  create: (body) => request('/courses', { method: 'POST', body, auth: true }),
};

export const assignmentAPI = {
  getAll: (courseId = '') => request(courseId ? `/assignments/course/${courseId}` : '/assignments', { auth: true }),
};

export const submissionAPI = {
  getAll: () => request('/submissions', { auth: true }),
};

export const notificationAPI = {
  getAll: () => request('/notifications', { auth: true }),
};

export const dashboardAPI = {
  getSummary: () => request('/dashboard/summary', { auth: true }),
};

export default request;
