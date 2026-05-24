const Course = require('../models/Course');
const ApiError = require('./ApiError');

const assertCourseAccess = async (user, courseId) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  if (user.role === 'admin' || user.role === 'teacher') {
    // Teachers can manage materials/assignments across institute courses
    // (matches upload/list routes that allow any teacher, not only course.teacher).
    return course;
  }

  if (user.role === 'student') {
    const enrolled =
      String(user.course) === String(courseId) ||
      course.students.some((studentId) => String(studentId) === String(user._id));

    if (enrolled) {
      return course;
    }
  }

  throw new ApiError(403, 'You do not have access to this course content');
};

module.exports = { assertCourseAccess };
