import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import CourseCard from '../../components/dashboard/CourseCard';
import ActivityCard from '../../components/dashboard/ActivityCard';
import { assignmentAPI, courseAPI, dashboardAPI, getAuthUser, notificationAPI } from '../../utils/api';

const toList = (response) => response?.data || response || [];

const TeacherDashboard = () => {
  const { userName } = getAuthUser();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const fetchData = async () => {
    try {
      const [summaryResponse, coursesResponse, notificationsResponse] = await Promise.allSettled([
        dashboardAPI.getSummary(),
        courseAPI.getAll({ teacher: 'true' }),
        notificationAPI.getAll(),
      ]);

      if (summaryResponse.status === 'fulfilled') {
        setSummary(summaryResponse.value?.data || summaryResponse.value || null);
      }

      if (coursesResponse.status === 'fulfilled') {
        setCourses(toList(coursesResponse.value));
      }

      if (notificationsResponse.status === 'fulfilled') {
        setNotifications(toList(notificationsResponse.value));
      }

      if (coursesResponse.status === 'fulfilled') {
        const teacherCourses = toList(coursesResponse.value);
        if (teacherCourses[0]?._id) {
          const assignmentResponse = await assignmentAPI.getAll(teacherCourses[0]._id);
          setAssignments(toList(assignmentResponse));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout userRole="teacher" userName={userName || 'Teacher'}>
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Teacher Portal</p>
            <h2 className="mt-3 text-2xl font-bold md:text-4xl">Welcome, {userName || 'Teacher'}.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              Manage your courses, review submissions, track attendance, and keep your students engaged.
            </p>
          </section>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard icon="📚" label="Courses" value={summary?.courses ?? courses.length} subtext="Assigned teaching modules" />
            <StatCard icon="👥" label="Users" value={summary?.users ?? '—'} subtext="Institution-wide count" tone="info" />
            <StatCard icon="📝" label="Assignments" value={summary?.assignments ?? assignments.length} subtext="Course tasks" tone="success" />
            <StatCard icon="📥" label="Submissions" value={summary?.submissions ?? '—'} subtext="Student work awaiting review" tone="default" />
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#0B1F3A]">My Courses</h3>
                <span className="text-sm text-gray-500">Teacher view</span>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {courses.slice(0, 4).map((item) => (
                  <CourseCard
                    key={item._id}
                    title={item.title}
                    subtitle={item.code}
                    description={item.description}
                    icon="🎓"
                    students={item.students?.length || 0}
                    progress={85}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-[#0B1F3A]/8">
                <h3 className="text-lg font-bold text-[#0B1F3A]">Quick Actions</h3>
                <div className="mt-4 space-y-3">
                  <a href="/courses" className="block rounded-xl bg-[#D4AF37] px-4 py-3 text-center font-semibold text-[#0B1F3A]">Open Course Catalog</a>
                  <a href="/teacher/courses/create" className="block w-full rounded-xl border border-[#0B1F3A]/10 px-4 py-3 text-center font-semibold text-[#0B1F3A]">Create Course</a>
                  <button type="button" className="block w-full rounded-xl border border-[#0B1F3A]/10 px-4 py-3 text-center font-semibold text-[#0B1F3A]">Upload Material</button>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold text-[#0B1F3A]">Recent Notifications</h3>
                <div className="space-y-3">
                  {notifications.slice(0, 4).map((item) => (
                    <ActivityCard
                      key={item._id}
                      title={item.title || 'Notification'}
                      message={item.message || item.description || 'New update available'}
                      timestamp={item.createdAt}
                      icon={item.type === 'assignment' ? '📝' : '🔔'}
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

export default TeacherDashboard;
