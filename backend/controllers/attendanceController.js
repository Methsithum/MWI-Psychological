const asyncHandler = require('../utils/asyncHandler');
const Attendance = require('../models/Attendance');

const markAttendance = asyncHandler(async (req, res) => {
  const record = await Attendance.create({ ...req.body, teacher: req.user._id });
  res.status(201).json({ success: true, message: 'Attendance recorded', data: record });
});

const getAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.find({ course: req.params.courseId }).populate('student teacher', 'firstName lastName email');
  res.status(200).json({ success: true, count: attendance.length, data: attendance });
});

module.exports = { markAttendance, getAttendance };
