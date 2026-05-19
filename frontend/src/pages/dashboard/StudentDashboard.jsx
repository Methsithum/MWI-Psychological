import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import CourseCard from '../../components/dashboard/CourseCard';
import ActivityCard from '../../components/dashboard/ActivityCard';
import { assignmentAPI, courseAPI, getAuthUser, notificationAPI } from '../../utils/api';

const toList = (response) => response?.data || response || [];

const StudentDashboard = () => {
  const { userName, userId, course } = getAuthUser();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [activities, setActivities] = useState([]);

  const fetchData = async () => {
    try {
      const [coursesResponse, notificationsResponse] = await Promise.allSettled([
        courseAPI.getAll(),
        notificationAPI.getAll(),
      ]);

      if (coursesResponse.status === 'fulfilled') {
        setCourses(toList(coursesResponse.value));
      }

      if (notificationsResponse.status === 'fulfilled') {
        setActivities(toList(notificationsResponse.value));
      }

      if (course) {
        const courseAssignmentsResponse = await assignmentAPI.getAll(course);
        setAssignments(toList(courseAssignmentsResponse));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedCourse = courses.find((item) => String(item._id) === String(course));

  return (
    <DashboardLayout userRole="student" userName={userName || 'Student'}>
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Student Portal</p>
            <h2 className="mt-3 text-2xl font-bold md:text-4xl">Welcome back, {userName || 'Student'}.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              View your course materials, pending assignments, attendance details, and recent updates in one elegant space.
            </p>
          </section>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard icon="📚" label="My Courses" value={courses.length} subtext="Available learning paths" />
            <StatCard icon="📝" label="Assignments" value={assignments.length} subtext="Course tasks and deadlines" tone="info" />
            <StatCard icon="🔔" label="Updates" value={activities.length} subtext="New announcements" tone="success" />
            <StatCard icon="🎓" label="Student ID" value={userId ? userId.slice(-6).toUpperCase() : 'N/A'} subtext="Login session reference" tone="default" />
          </div>

          {selectedCourse ? (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#0B1F3A]">Your Selected Course</h3>
                <span className="rounded-full bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#0B1F3A]">Active</span>
              </div>
              <CourseCard
                title={selectedCourse.title}
                subtitle={selectedCourse.code}
                description={selectedCourse.description}
                icon="📘"
                progress={72}
                students={selectedCourse.students?.length || 0}
              />
            </section>
          ) : null}

          <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#0B1F3A]">Available Courses</h3>
                <p className="text-sm text-gray-500">Browse the learning catalog</p>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {courses.slice(0, 4).map((item) => (
                  <CourseCard
                    key={item._id}
                    title={item.title}
                    subtitle={item.code}
                    description={item.description}
                    icon="📚"
                    progress={item._id === course ? 72 : 35}
                    students={item.students?.length || 0}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm border border-[#0B1F3A]/8">
                <h3 className="text-lg font-bold text-[#0B1F3A]">Quick Actions</h3>
                <div className="mt-4 space-y-3">
                  <a href="/courses" className="block rounded-xl bg-[#D4AF37] px-4 py-3 text-center font-semibold text-[#0B1F3A]">Explore Courses</a>
                  <a href="#assignments" className="block rounded-xl border border-[#0B1F3A]/10 px-4 py-3 text-center font-semibold text-[#0B1F3A]">View Assignments</a>
                  <a href="#materials" className="block rounded-xl border border-[#0B1F3A]/10 px-4 py-3 text-center font-semibold text-[#0B1F3A]">Download Materials</a>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-bold text-[#0B1F3A]">Recent Activities</h3>
                <div className="space-y-3">
                  {activities.slice(0, 4).map((item) => (
                    <ActivityCard
                      key={item._id}
                      title={item.title || 'Update'}
                      message={item.message || item.description || 'New update available'}
                      timestamp={item.createdAt}
                      icon={item.type === 'assignment' ? '📝' : item.type === 'video' ? '🎥' : '🔔'}
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

export default StudentDashboard;
