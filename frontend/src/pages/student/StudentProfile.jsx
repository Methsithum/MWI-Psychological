import React, { useEffect, useState } from 'react';
import auth from '../../utils/auth';
import api from '../../utils/api';

const StudentProfile = () => {
  const cached = auth.getUser();
  const [profile, setProfile] = useState({
    fullName: cached?.fullName || 'Student',
    email: cached?.email || '',
    role: cached?.role || 'student',
    status: cached?.status || 'approved',
    nic: cached?.nic || 'Not available',
    courseTitle: cached?.course?.title || cached?.course?.name || 'Not assigned yet',
    courseCode: cached?.course?.code || '-',
    forcePasswordChange: cached?.forcePasswordChange ? 'Yes' : 'No',
  });

  useEffect(() => {
    let active = true;
    api.getCurrentUser()
      .then((res) => {
        if (!active) return;
        const u = res?.data || {};
        setProfile({
          fullName: u.fullName || cached?.fullName || 'Student',
          email: u.email || cached?.email || '',
          role: u.role || cached?.role || 'student',
          status: u.status || cached?.status || 'approved',
          nic: u.nic || cached?.nic || 'Not available',
          courseTitle: u.course?.title || cached?.course?.title || 'Not assigned yet',
          courseCode: u.course?.code || cached?.course?.code || '-',
          forcePasswordChange: u.forcePasswordChange ? 'Yes' : (cached?.forcePasswordChange ? 'Yes' : 'No'),
        });
      })
      .catch(() => {
        // keep cached profile if API fails
      });

    return () => { active = false; };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl shadow-xl border border-[#D4AF37]/20 overflow-hidden">
          <div className="bg-linear-to-r from-[#0B1F3A] to-[#1A3A5A] text-white px-6 sm:px-8 py-8">
            <h2 className="text-2xl font-bold">My Profile</h2>
            <p className="text-white/70 mt-1">View your registration and student details</p>
          </div>

          <div className="grid md:grid-cols-[220px_1fr] gap-6 p-6 sm:p-8">
            <div className="bg-[#F8F5EF] rounded-2xl p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-[#D4AF37]/20 mx-auto flex items-center justify-center text-4xl mb-4">👨‍🎓</div>
              <h3 className="text-lg font-bold text-[#0B1F3A]">{profile.fullName}</h3>
              <p className="text-sm text-gray-500 mt-1">{profile.courseTitle}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ['Full Name', profile.fullName],
                ['Email', profile.email],
                ['Role', profile.role],
                ['Status', profile.status],
                ['NIC', profile.nic],
                ['Course', profile.courseTitle],
                ['Course Code', profile.courseCode],
                ['Password Change Required', profile.forcePasswordChange],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-gray-100 bg-[#FCFAF5] p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
                  <p className="text-sm sm:text-base font-semibold text-[#0B1F3A] mt-1 wrap-break-word">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;
