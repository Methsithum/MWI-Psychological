const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Course = require('../models/Course');
const StudentRegistration = require('../models/StudentRegistration');

const buildStatusFilter = (status) => {
  if (!status || status === 'all') {
    return {};
  }

  const allowedStatuses = ['pending', 'approved', 'rejected'];
  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, 'Invalid status filter');
  }

  return { status };
};

const getStudentsByCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const statusFilter = buildStatusFilter(req.query.status);

  const course = await Course.findById(courseId).select('title code status');
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  const registrations = await StudentRegistration.find({
    course: courseId,
    ...statusFilter,
  })
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

const getCourseWiseStudentLists = asyncHandler(async (req, res) => {
  const statusFilter = buildStatusFilter(req.query.status);
  const courses = await Course.find({ status: 'published' }).select('title code status').sort({ createdAt: 1 });

  const result = await Promise.all(
    courses.map(async (course) => {
      const registrations = await StudentRegistration.find({
        course: course._id,
        ...statusFilter,
      })
        .populate('paymentInformation')
        .populate('user', 'fullName email phone status forcePasswordChange')
        .sort({ createdAt: -1 });

      return {
        course,
        count: registrations.length,
        students: registrations,
      };
    })
  );

  res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
});

const getStudentCountsByCourse = asyncHandler(async (req, res) => {
  const counts = await StudentRegistration.aggregate([
    {
      $group: {
        _id: '$course',
        total: { $sum: 1 },
        pending: {
          $sum: {
            $cond: [{ $eq: ['$status', 'pending'] }, 1, 0],
          },
        },
        approved: {
          $sum: {
            $cond: [{ $eq: ['$status', 'approved'] }, 1, 0],
          },
        },
        rejected: {
          $sum: {
            $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0],
          },
        },
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $project: {
        _id: 0,
        courseId: '$course._id',
        courseTitle: '$course.title',
        courseCode: '$course.code',
        total: 1,
        pending: 1,
        approved: 1,
        rejected: 1,
      },
    },
    {
      $sort: { courseTitle: 1 },
    },
  ]);

  res.status(200).json({
    success: true,
    count: counts.length,
    data: counts,
  });
});

module.exports = {
  getStudentsByCourse,
  getCourseWiseStudentLists,
  getStudentCountsByCourse,
};
