const asyncHandler = require('../utils/asyncHandler');
const Submission = require('../models/Submission');

const submitAssignment = asyncHandler(async (req, res) => {
  const submission = await Submission.create({
    assignment: req.body.assignment,
    student: req.user._id,
    fileUrl: req.file ? req.file.path : req.body.fileUrl,
    remarks: req.body.remarks,
  });

  res.status(201).json({ success: true, message: 'Assignment submitted', data: submission });
});

const getSubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find({ assignment: req.params.assignmentId }).populate('student', 'fullName email');
  res.status(200).json({ success: true, count: submissions.length, data: submissions });
});

module.exports = { submitAssignment, getSubmissions };
