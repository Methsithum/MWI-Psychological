const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const Course = require('../models/Course');
const StudentRegistration = require('../models/StudentRegistration');
const PaymentInformation = require('../models/PaymentInformation');
const generateToken = require('../utils/token');
const { extractUploadedAsset } = require('../utils/cloudinaryAsset');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const requestedRole = req.params.role;

  const user = await User.findOne({ email: email.toLowerCase().trim() })
    .select('+password')
    .populate('course', 'title code');

  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  if (requestedRole && user.role !== requestedRole) {
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
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      forcePasswordChange: user.forcePasswordChange,
      course: user.course
        ? {
            id: user.course._id,
            title: user.course.title,
            code: user.course.code,
          }
        : null,
    },
  });
});

const registerStudent = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    whatsappNumber,
    address,
    nic,
    highestQualification,
    courseId,
    paymentMethod,
    transactionId,
    notes,
  } = req.body;

  if (!req.file) {
    throw new ApiError(400, 'Payment slip file is required');
  }

  const course = await Course.findOne({ _id: courseId, status: 'published' });
  if (!course) {
    throw new ApiError(404, 'Selected course is not available for registration');
  }

  const normalizedEmail = email.toLowerCase().trim();
  const normalizedNic = nic.trim();

  const existingUser = await User.findOne({
    $or: [{ email: normalizedEmail }, { nic: normalizedNic }],
  });
  if (existingUser) {
    throw new ApiError(400, 'A user with this email or NIC already exists');
  }

  const existingPendingRegistration = await StudentRegistration.findOne({
    $or: [{ email: normalizedEmail }, { nic: normalizedNic }],
    status: 'pending',
  });

  if (existingPendingRegistration) {
    throw new ApiError(400, 'A pending registration already exists for this student');
  }

  const registration = await StudentRegistration.create({
    fullName,
    email: normalizedEmail,
    phone,
    whatsappNumber,
    address,
    nic: normalizedNic,
    highestQualification,
    course: course._id,
    notes: notes || '',
    status: 'pending',
  });

  const uploadedSlip = extractUploadedAsset(req.file);

  const paymentInformation = await PaymentInformation.create({
    registration: registration._id,
    paymentMethod,
    transactionId,
    paymentSlipUrl: uploadedSlip.fileUrl,
    paymentSlipPublicId: uploadedSlip.publicId,
    paymentSlipMetadata: uploadedSlip.metadata,
    paymentSlipMimeType: uploadedSlip.metadata.mimeType,
    paymentSlipOriginalName: uploadedSlip.metadata.originalName,
  });

  registration.paymentInformation = paymentInformation._id;
  await registration.save();

  res.status(201).json({
    success: true,
    message: 'Student registration submitted for approval',
    data: {
      registrationId: registration._id,
      email: registration.email,
      status: registration.status,
      selectedCourse: {
        id: course._id,
        title: course.title,
        code: course.code,
      },
      paymentInformation: {
        paymentMethod: paymentInformation.paymentMethod,
        transactionId: paymentInformation.transactionId,
        paymentSlipUrl: paymentInformation.paymentSlipUrl,
      },
    },
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(401, 'Current password is incorrect');
  }

  user.password = newPassword;
  user.forcePasswordChange = false;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
});

module.exports = { login, registerStudent, changePassword };
