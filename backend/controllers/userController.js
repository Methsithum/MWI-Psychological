const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const Course = require('../models/Course');
const StudentRegistration = require('../models/StudentRegistration');

// Using fullName only; do not split into first/last

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json({ success: true, count: users.length, data: users });
});

const getPendingStudents = asyncHandler(async (req, res) => {
  const filter = { status: 'pending' };

  if (req.query.courseId) {
    filter.course = req.query.courseId;
  }

  const pendingRegistrations = await StudentRegistration.find(filter)
    .populate('course', 'title code status')
    .populate('paymentInformation')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: pendingRegistrations.length,
    data: pendingRegistrations,
  });
});

const approveStudent = asyncHandler(async (req, res) => {
  const registration = await StudentRegistration.findById(req.params.id)
    .populate('course', 'title code status')
    .populate('paymentInformation');

  if (!registration) {
    throw new ApiError(404, 'Student registration not found');
  }

  if (registration.status !== 'pending') {
    throw new ApiError(400, 'Only pending registrations can be approved');
  }

  if (!registration.course || registration.course.status !== 'published') {
    throw new ApiError(400, 'Student can only be approved to a published course');
  }

  let user = await User.findOne({ email: registration.email });

  if (!user) {
    user = new User({
      fullName: registration.fullName,
      email: registration.email,
      phone: registration.phone,
      whatsappNumber: registration.whatsappNumber,
      address: registration.address,
      nic: registration.nic,
      highestQualification: registration.highestQualification,
      course: registration.course._id,
      role: 'student',
      status: 'approved',
      password: registration.nic,
      forcePasswordChange: true,
    });
  } else {
    user.fullName = registration.fullName;
    user.phone = registration.phone;
    user.whatsappNumber = registration.whatsappNumber;
    user.address = registration.address;
    user.nic = registration.nic;
    user.highestQualification = registration.highestQualification;
    user.course = registration.course._id;
    user.role = 'student';
    user.status = 'approved';
    user.password = registration.nic;
    user.forcePasswordChange = true;
  }

  await user.save();

  await Course.findByIdAndUpdate(registration.course._id, {
    $addToSet: { students: user._id },
  });

  registration.status = 'approved';
  registration.user = user._id;
  registration.reviewedBy = req.user._id;
  registration.approvedBy = req.user._id;
  registration.approvedAt = new Date();
  registration.rejectedAt = null;
  registration.rejectionReason = '';
  await registration.save();

  res.status(200).json({
    success: true,
    message: 'Student registration approved. Initial password is set to NIC number.',
    data: {
      registration,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status,
        forcePasswordChange: user.forcePasswordChange,
      },
    },
  });
});

const rejectStudent = asyncHandler(async (req, res) => {
  const registration = await StudentRegistration.findById(req.params.id);
  const { reason } = req.body;

  if (!registration) {
    throw new ApiError(404, 'Student registration not found');
  }

  if (registration.status !== 'pending') {
    throw new ApiError(400, 'Only pending registrations can be rejected');
  }

  registration.status = 'rejected';
  registration.reviewedBy = req.user._id;
  registration.rejectedAt = new Date();
  registration.rejectionReason = reason || 'Registration rejected by admin';
  await registration.save();

  res.status(200).json({ success: true, message: 'Student registration rejected', data: registration });
});

module.exports = { getAllUsers, getPendingStudents, approveStudent, rejectStudent };
