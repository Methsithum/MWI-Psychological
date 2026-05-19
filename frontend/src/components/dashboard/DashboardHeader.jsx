import React from 'react';
import { getAuthUser } from '../../utils/api';

const DashboardHeader = ({ onMenuToggle, userRole, userName }) => {
  const initials = (userName || 'User')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const roleLabel = {
    student: 'Student',
    teacher: 'Teacher',
    admin: 'Administrator',
  }[userRole] || userRole;

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-[#D4AF37]/15">
      <div className="px-4 py-4 md:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onMenuToggle} className="lg:hidden w-10 h-10 rounded-xl border border-[#0B1F3A]/10 text-[#0B1F3A]">
            ☰
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">Dashboard</p>
            <h1 className="text-lg md:text-2xl font-bold text-[#0B1F3A]">Welcome back, {userName || getAuthUser().userName || 'User'}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex rounded-full bg-[#D4AF37]/10 px-3 py-1 text-sm font-semibold text-[#0B1F3A]">
            {roleLabel}
          </span>
          <div className="flex items-center gap-3 rounded-full border border-[#0B1F3A]/10 bg-white px-3 py-2 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center text-sm font-semibold">
              {initials || 'U'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-[#0B1F3A] leading-tight">{userName || 'User'}</p>
              <p className="text-xs text-gray-500 leading-tight">{roleLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
