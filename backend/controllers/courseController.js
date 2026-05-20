const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Course = require('../models/Course');
const StudentRegistration = require('../models/StudentRegistration');

const MAX_COURSES = 2;

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().populate('teacher', 'fullName email').populate('students', 'fullName email');
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

const getAvailableCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ status: 'published' })
    .select('title code description fee teacher status createdAt')
    .populate('teacher', 'fullName email')
    .sort({ createdAt: 1 });

  res.status(200).json({ success: true, count: courses.length, data: courses });
});

const createCourse = asyncHandler(async (req, res) => {
  const courseCount = await Course.countDocuments();

  if (courseCount >= MAX_COURSES) {
    throw new ApiError(400, 'Course limit reached. This project allows only two courses.');
  }

  const course = await Course.create({ ...req.body, teacher: req.user._id });
  res.status(201).json({ success: true, message: 'Course created', data: course });
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate('teacher', 'fullName email').populate('students', 'fullName email');
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }
  res.status(200).json({ success: true, data: course });
});

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }
  res.status(200).json({ success: true, message: 'Course updated', data: course });
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }
  res.status(200).json({ success: true, message: 'Course deleted' });
});

const getCourseStudents = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const status = req.query.status || 'all';

  const course = await Course.findById(courseId).select('title code status fee');
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  const filter = { course: courseId };
  if (status !== 'all') {
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      throw new ApiError(400, 'Invalid status filter');
    }
    filter.status = status;
  }

  const registrations = await StudentRegistration.find(filter)
    .populate('paymentInformation')
    .populate('user', 'fullName email phone status forcePasswordChange')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    course,
    count: registrations.length,
    data: registrations,
  });
});

module.exports = {
  getCourses,
  getAvailableCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseStudents,
};
