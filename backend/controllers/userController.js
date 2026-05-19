const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const Course = require('../models/Course');

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').populate('course', 'title code');
  res.status(200).json({ success: true, count: users.length, data: users });
});

const getPendingStudents = asyncHandler(async (req, res) => {
  const users = await User.find({ role: 'student', status: 'pending' }).select('-password').populate('course', 'title code description teacher');
  res.status(200).json({ success: true, count: users.length, data: users });
});

const approveStudent = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user || user.role !== 'student') {
    throw new ApiError(404, 'Student not found');
  }

  if (!user.course) {
    throw new ApiError(400, 'Student must be assigned to a course before approval');
  }

  const course = await Course.findById(user.course);
  if (!course) {
    throw new ApiError(404, 'Selected course not found');
  }

  user.status = 'approved';
  await user.save();

  if (!course.students.some((studentId) => studentId.toString() === user._id.toString())) {
    course.students.push(user._id);
    await course.save();
  }

  const approvedStudent = await User.findById(user._id)
    .select('-password')
    .populate('course', 'title code description');

  res.status(200).json({ success: true, message: 'Student approved', data: approvedStudent });
});

const rejectStudent = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user || user.role !== 'student') {
    throw new ApiError(404, 'Student not found');
  }

  user.status = 'rejected';
  await user.save();

  if (user.course) {
    await Course.findByIdAndUpdate(user.course, {
      $pull: { students: user._id },
    });
  }

  res.status(200).json({ success: true, message: 'Student rejected', data: user });
});

module.exports = { getAllUsers, getPendingStudents, approveStudent, rejectStudent };
