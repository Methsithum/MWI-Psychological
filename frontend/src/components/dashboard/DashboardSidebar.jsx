import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAuthSession } from '../../utils/api';

const menus = {
  student: [
    { to: '/student/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/courses', label: 'Courses', icon: '📚' },
    { to: '/student/assignments', label: 'Assignments', icon: '📝' },
    { to: '/student/attendance', label: 'Attendance', icon: '✅' },
    { to: '/student/materials', label: 'Materials', icon: '📄' },
  ],
  teacher: [
    { to: '/teacher/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/teacher/courses', label: 'My Courses', icon: '📚' },
    { to: '/teacher/assignments', label: 'Assignments', icon: '📝' },
    { to: '/teacher/attendance', label: 'Attendance', icon: '✅' },
    { to: '/teacher/submissions', label: 'Submissions', icon: '📥' },
  ],
  admin: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/admin/users', label: 'Users', icon: '👥' },
    { to: '/admin/courses', label: 'Courses', icon: '📚' },
    { to: '/admin/reports', label: 'Reports', icon: '📈' },
    { to: '/admin/content', label: 'Content', icon: '🗂️' },
  ],
};

const DashboardSidebar = ({ isOpen, setIsOpen, userRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const items = menus[userRole] || [];

  const logout = () => {
    clearAuthSession();
    navigate('/login');
  };

  return (
    <>
      {isOpen && <button type="button" onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/40 z-30 lg:hidden" aria-label="Close sidebar" />}
      <aside className={`fixed z-40 lg:static inset-y-0 left-0 w-72 bg-[#0B1F3A] text-white flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-white/10">
          <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">PWI</div>
          <div className="mt-2 text-lg font-bold">Psychology Institute</div>
          <p className="text-sm text-white/70 mt-1">{userRole} portal</p>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {items.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${active ? 'bg-[#D4AF37] text-[#0B1F3A] font-semibold' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button type="button" onClick={logout} className="w-full rounded-xl border border-white/10 px-4 py-3 text-left hover:bg-white/10 transition">
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
