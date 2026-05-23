const asyncHandler = require('../utils/asyncHandler');
const Attendance = require('../models/Attendance');
const Course = require('../models/Course');
const ApiError = require('../utils/ApiError');

const markAttendance = asyncHandler(async (req, res) => {
  const { course, student, status } = req.body;

  if (!course) {
    throw new ApiError(400, 'course is required');
  }

  const courseRecord = await Course.findById(course).select('teacher students');
  if (!courseRecord) {
    throw new ApiError(404, 'Course not found');
  }

  const canAccessCourse =
    req.user.role !== 'student' ||
    String(req.user.course || '') === String(courseRecord._id) ||
    courseRecord.students.some((studentId) => String(studentId) === String(req.user._id));

  if (!canAccessCourse) {
    throw new ApiError(403, 'You are not enrolled in this course');
  }

  const studentId = req.user.role === 'student' ? req.user._id : student;
  if (!studentId) {
    throw new ApiError(400, 'student is required');
  }

  const normalizedStatus = req.user.role === 'student' ? 'present' : status;
  if (!normalizedStatus) {
    throw new ApiError(400, 'status is required');
  }

  if (!['present', 'absent', 'late'].includes(normalizedStatus)) {
    throw new ApiError(400, 'Invalid attendance status');
  }

  const date = req.body.date ? new Date(req.body.date) : new Date();
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const record = await Attendance.findOneAndUpdate(
    {
      course,
      student: studentId,
      date: { $gte: startOfDay, $lte: endOfDay },
    },
    {
      course,
      student: studentId,
      teacher: courseRecord.teacher,
      date,
      status: normalizedStatus,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(200).json({ success: true, message: 'Attendance saved', data: record });
});

const getAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.find({ course: req.params.courseId })
    .populate('student teacher', 'fullName email')
    .sort({ date: -1, createdAt: -1 });
  res.status(200).json({ success: true, count: attendance.length, data: attendance });
});

module.exports = { markAttendance, getAttendance };
