const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || null;
}

export function setToken(token, remember = false) {
  if (remember) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}

export function setUser(user, remember = false) {
  const v = JSON.stringify(user || {});
  if (remember) {
    localStorage.setItem(USER_KEY, v);
  } else {
    sessionStorage.setItem(USER_KEY, v);
  }
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);
}

export function logout() {
  removeToken();
  removeUser();
}

export default { getToken, setToken, removeToken, getUser, setUser, removeUser, logout };
