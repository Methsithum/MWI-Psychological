const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Course = require('../models/Course');

const MAX_COURSES = 2;

const getCourses = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.teacher === 'true' && req.user.role === 'teacher') {
    query.teacher = req.user._id;
  } else if (req.query.teacherId) {
    query.teacher = req.query.teacherId;
  }

  const courses = await Course.find(query)
    .populate('teacher', 'fullName email')
    .populate('students', 'fullName email nic status course');
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

const getPublicCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}).select('title code description status');
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
  const course = await Course.findById(req.params.id).populate('teacher students');
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }
  res.status(200).json({ success: true, data: course });
});

const getCourseStudents = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate('students', 'fullName email nic status course');

  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  if (req.user.role === 'teacher' && course.teacher.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Forbidden: this course is not assigned to you');
  }

  res.status(200).json({
    success: true,
    count: course.students.length,
    data: course.students,
  });
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

module.exports = { getCourses, createCourse, getCourseById, getCourseStudents, updateCourse, deleteCourse };
