import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../utils/auth';

const StudentTopbar = ({ student, title = 'Student Portal', subtitle = 'PWI Psychological Institute' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    auth.logout();
    navigate('/signin');
  };

  const displayName = student?.fullName || 'Student';
  const displayCourse = student?.course?.title || student?.course?.name || student?.programme || 'Student Portal';

  return (
    <header className="bg-[#0B1F3A] text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center">
              <span className="text-[#0B1F3A] font-bold text-lg">PWI</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">{title}</h1>
              <p className="text-xs text-white/60">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right mr-1">
              <p className="text-sm font-medium leading-tight">{displayName}</p>
              <p className="text-xs text-white/60 leading-tight">{displayCourse}</p>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 rounded-full px-3 py-2 transition"
              >
                <div className="w-8 h-8 bg-[#D4AF37]/30 rounded-full flex items-center justify-center">
                  <span className="text-sm">👨‍🎓</span>
                </div>
                <span className="hidden sm:inline text-sm font-medium">Profile</span>
                <span className="text-xs">▾</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-[#0B1F3A] rounded-2xl shadow-2xl border border-[#D4AF37]/20 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => goTo('/student')}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-[#F8F5EF] ${isActive('/student') ? 'bg-[#F8F5EF] font-semibold' : ''}`}
                  >
                    Student Portal
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo('/student/profile')}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-[#F8F5EF] ${isActive('/student/profile') ? 'bg-[#F8F5EF] font-semibold' : ''}`}
                  >
                    Student Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo('/student/settings')}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-[#F8F5EF] ${isActive('/student/settings') ? 'bg-[#F8F5EF] font-semibold' : ''}`}
                  >
                    Settings
                  </button>
                  <div className="border-t border-gray-100" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentTopbar;
