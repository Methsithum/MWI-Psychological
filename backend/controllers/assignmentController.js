const asyncHandler = require('../utils/asyncHandler');
const Assignment = require('../models/Assignment');

const createAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.create({ ...req.body, teacher: req.user._id });
  res.status(201).json({ success: true, message: 'Assignment created', data: assignment });
});

const getAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find({ course: req.params.courseId }).populate('teacher', 'firstName lastName email');
  res.status(200).json({ success: true, count: assignments.length, data: assignments });
});

module.exports = { createAssignment, getAssignments };
