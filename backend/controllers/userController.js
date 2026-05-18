const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json({ success: true, count: users.length, data: users });
});

const getPendingStudents = asyncHandler(async (req, res) => {
  const users = await User.find({ role: 'student', status: 'pending' }).select('-password');
  res.status(200).json({ success: true, count: users.length, data: users });
});

const approveStudent = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user || user.role !== 'student') {
    throw new ApiError(404, 'Student not found');
  }

  user.status = 'approved';
  await user.save();

  res.status(200).json({ success: true, message: 'Student approved', data: user });
});

const rejectStudent = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user || user.role !== 'student') {
    throw new ApiError(404, 'Student not found');
  }

  user.status = 'rejected';
  await user.save();

  res.status(200).json({ success: true, message: 'Student rejected', data: user });
});

module.exports = { getAllUsers, getPendingStudents, approveStudent, rejectStudent };
