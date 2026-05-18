const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');
const Course = require('../models/Course');
const Attendance = require('../models/Attendance');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');

const getDashboardSummary = asyncHandler(async (req, res) => {
  const [users, courses, attendance, assignments, submissions] = await Promise.all([
    User.countDocuments(),
    Course.countDocuments(),
    Attendance.countDocuments(),
    Assignment.countDocuments(),
    Submission.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    data: { users, courses, attendance, assignments, submissions },
  });
});

module.exports = { getDashboardSummary };
