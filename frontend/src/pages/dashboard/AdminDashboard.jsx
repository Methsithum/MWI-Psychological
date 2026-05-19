import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import ActivityCard from '../../components/dashboard/ActivityCard';
import { courseAPI, dashboardAPI, getAuthUser, notificationAPI, userAPI } from '../../utils/api';

const toList = (response) => response?.data || response || [];

const AdminDashboard = () => {
  const { userName } = getAuthUser();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    try {
      const [summaryResponse, pendingResponse, notificationsResponse, coursesResponse] = await Promise.allSettled([
        dashboardAPI.getSummary(),
        userAPI.getPendingStudents(),
        notificationAPI.getAll(),
        courseAPI.getAll(),
      ]);

      if (summaryResponse.status === 'fulfilled') {
        setSummary(summaryResponse.value?.data || summaryResponse.value || null);
      }

      if (pendingResponse.status === 'fulfilled') {
        setPendingStudents(toList(pendingResponse.value));
      }

      if (notificationsResponse.status === 'fulfilled') {
        setNotifications(toList(notificationsResponse.value));
      }

      if (coursesResponse.status === 'fulfilled') {
        setCourses(toList(coursesResponse.value));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout userRole="admin" userName={userName || 'Administrator'}>
      {loading ? (
        <div className="grid min-h-[50vh] place-items-center rounded-3xl border border-[#0B1F3A]/10 bg-white">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#D4AF37] border-t-transparent" />
            <p className="mt-4 text-sm text-gray-500">Loading your dashboard...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <section className="overflow-hidden rounded-3xl bg-linear-to-r from-[#0B1F3A] to-[#1A3A5A] px-6 py-8 text-white shadow-lg md:px-8 md:py-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Administrator Portal</p>
            <h2 className="mt-3 text-2xl font-bold md:text-4xl">System overview at a glance.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              Approve students, monitor courses, review content, and manage the whole platform from one elegant control center.
            </p>
          </section>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard icon="👥" label="Users" value={summary?.users ?? '—'} subtext="Registered accounts" />
            <StatCard icon="🎓" label="Courses" value={summary?.courses ?? courses.length} subtext="Published learning paths" tone="info" />
            <StatCard icon="📝" label="Assignments" value={summary?.assignments ?? '—'} subtext="Course tasks" tone="success" />
            <StatCard icon="📥" label="Submissions" value={summary?.submissions ?? '—'} subtext="Uploaded work" tone="default" />
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#0B1F3A]">Pending Student Approvals</h3>
                <span className="rounded-full bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#0B1F3A]">Admin action required</span>
              </div>
              <div className="space-y-3">
                {pendingStudents.slice(0, 6).map((student) => (
                  <div key={student._id} className="rounded-2xl border border-[#0B1F3A]/8 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-[#0B1F3A]">{student.fullName}</p>
                        <p className="mt-1 text-sm text-gray-500">{student.email}</p>
                        <p className="mt-1 text-xs text-gray-400">NIC: {student.nic || '—'}</p>
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <p className="font-semibold text-[#0B1F3A]">{student.course?.title || 'No course'}</p>
                        <p>{student.program || '—'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-[#0B1F3A]/8">
                <h3 className="text-lg font-bold text-[#0B1F3A]">Quick Actions</h3>
                <div className="mt-4 space-y-3">
                  <button type="button" className="block w-full rounded-xl bg-[#D4AF37] px-4 py-3 text-center font-semibold text-[#0B1F3A]">Review Approvals</button>
                  <button type="button" className="block w-full rounded-xl border border-[#0B1F3A]/10 px-4 py-3 text-center font-semibold text-[#0B1F3A]">Manage Users</button>
                  <button type="button" className="block w-full rounded-xl border border-[#0B1F3A]/10 px-4 py-3 text-center font-semibold text-[#0B1F3A]">Generate Reports</button>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold text-[#0B1F3A]">System Notifications</h3>
                <div className="space-y-3">
                  {notifications.slice(0, 4).map((item) => (
                    <ActivityCard
                      key={item._id}
                      title={item.title || 'Notification'}
                      message={item.message || item.description || 'System update'}
                      timestamp={item.createdAt}
                      icon={item.type === 'announcement' ? '📢' : '🔔'}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
