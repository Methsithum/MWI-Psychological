const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const generateToken = require('../utils/token');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const role = req.params.role || req.body.role;
  const allowedRoles = ['admin', 'teacher', 'student'];

  if (!allowedRoles.includes(role)) {
    throw new ApiError(400, 'Invalid role');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  if (role && user.role !== role) {
    throw new ApiError(403, 'Role mismatch');
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  if (user.role === 'student' && user.status !== 'approved') {
    throw new ApiError(403, 'Student account is not approved');
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token: generateToken({ id: user._id, role: user.role, status: user.status }),
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
});

const registerStudent = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'Email already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    role: 'student',
    status: 'pending',
  });

  res.status(201).json({
    success: true,
    message: 'Student registration submitted for approval',
    data: {
      id: user._id,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
});

module.exports = { login, registerStudent };
