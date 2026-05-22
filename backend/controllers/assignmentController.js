const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');

const createAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.create({ ...req.body, teacher: req.user._id });
  res.status(201).json({ success: true, message: 'Assignment created', data: assignment });
});

const getAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find({ course: req.params.courseId }).populate('teacher', 'fullName email');
  res.status(200).json({ success: true, count: assignments.length, data: assignments });
});

const deleteAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);

  if (!assignment) {
    throw new ApiError(404, 'Assignment not found');
  }

  const isOwner = String(assignment.teacher) === String(req.user._id);
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, 'You are not allowed to delete this assignment');
  }

  const deletedSubmissions = await Submission.deleteMany({ assignment: assignment._id });
  await Assignment.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Assignment deleted',
    data: { deletedSubmissions: deletedSubmissions.deletedCount || 0 },
  });
});

module.exports = { createAssignment, getAssignments, deleteAssignment };
