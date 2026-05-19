const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const Course = require('../models/Course');
const generateToken = require('../utils/token');

const resolveSelectedCourse = async ({ course, program }) => {
  if (course) {
    return Course.findById(course);
  }

  if (!program) {
    return null;
  }

  const programKey = String(program).trim().toLowerCase();
  const programCourseMap = {
    hrm: ['hrm', 'human resource', 'behavioral psychology'],
    buddhist: ['buddhist', 'counselling', 'psychology'],
  };

  const keywords = programCourseMap[programKey] || [programKey];

  const courses = await Course.find({ status: 'published' });
  return courses.find((item) => {
    const title = `${item.title || ''} ${item.code || ''}`.toLowerCase();
    return keywords.some((keyword) => title.includes(keyword));
  }) || null;
};

const getPaymentSlipInfo = (file) => {
  if (!file) {
    return { paymentSlipUrl: '', paymentSlipName: '' };
  }

  return {
    paymentSlipUrl: `/uploads/${file.filename}`,
    paymentSlipName: file.originalname,
  };
};

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
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
      _id: user._id,
      name: user.fullName,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      nic: user.nic,
      course: user.course,
    },
  });
});

const registerStudent = asyncHandler(async (req, res) => {
  const { email, nic, program, course, phone, qualification, paymentMethod, transactionId, additionalNotes, whatsapp, address } = req.body;
  const fullName = (req.body.fullName || '').trim();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'Email already exists');
  }

  if (!fullName) {
    throw new ApiError(400, 'Full name is required');
  }

  if (!nic) {
    throw new ApiError(400, 'NIC is required');
  }

  if (!paymentMethod) {
    throw new ApiError(400, 'Payment method is required');
  }

  if (!transactionId) {
    throw new ApiError(400, 'Transaction ID is required');
  }

  if (!req.file) {
    throw new ApiError(400, 'Payment slip upload is required');
  }

  const selectedCourse = await resolveSelectedCourse({ course, program });
  if (!selectedCourse) {
    throw new ApiError(400, 'Please select a valid course before registration');
  }

  const paymentSlip = getPaymentSlipInfo(req.file);

  const user = await User.create({
    fullName,
    email,
    password: nic,
    nic,
    phone,
    address,
    whatsapp,
    role: 'student',
    status: 'pending',
    course: selectedCourse._id,
    program,
    qualification,
    paymentMethod,
    transactionId,
    paymentSlipUrl: paymentSlip.paymentSlipUrl,
    paymentSlipName: paymentSlip.paymentSlipName,
    additionalNotes,
  });

  res.status(201).json({
    success: true,
    message: 'Student registration submitted for approval',
    data: {
      id: user._id,
      email: user.email,
      role: user.role,
      status: user.status,
      course: selectedCourse,
      paymentMethod: user.paymentMethod,
      transactionId: user.transactionId,
      paymentSlipUrl: user.paymentSlipUrl,
    },
  });
});

module.exports = { login, registerStudent };
