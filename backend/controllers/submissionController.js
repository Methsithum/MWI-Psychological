const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');
const { extractUploadedAsset, deleteCloudinaryAsset } = require('../utils/cloudinaryAsset');

const submitAssignment = asyncHandler(async (req, res) => {
  const uploaded = extractUploadedAsset(req.file);
  const fileUrl = uploaded?.fileUrl || req.body.fileUrl || '';
  const fileName = uploaded?.metadata?.originalName || req.body.fileName || '';
  const remarks = req.body.remarks || '';

  if (!fileUrl && !remarks) {
    throw new ApiError(400, 'Please upload a file or provide submission text');
  }

  const existing = await Submission.findOne({
    assignment: req.body.assignment,
    student: req.user._id,
  });

  if (existing?.publicId && uploaded?.publicId && existing.publicId !== uploaded.publicId) {
    await deleteCloudinaryAsset(existing.publicId, existing.metadata?.resourceType);
  }

  const submission = await Submission.findOneAndUpdate(
    { assignment: req.body.assignment, student: req.user._id },
    {
      assignment: req.body.assignment,
      student: req.user._id,
      fileUrl,
      publicId: uploaded?.publicId || existing?.publicId || '',
      metadata: uploaded?.metadata || existing?.metadata || {},
      fileName,
      remarks,
      submittedAt: new Date(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(201).json({ success: true, message: 'Assignment submitted', data: submission });
});

const getSubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find({ assignment: req.params.assignmentId }).populate('student', 'fullName email');
  res.status(200).json({ success: true, count: submissions.length, data: submissions });
});

const gradeSubmission = asyncHandler(async (req, res) => {
  const { grade } = req.body;

  if (grade === undefined || grade === null || grade === '') {
    throw new ApiError(400, 'Grade is required');
  }

  const submission = await Submission.findById(req.params.id);
  if (!submission) {
    throw new ApiError(404, 'Submission not found');
  }

  submission.grade = String(grade);
  await submission.save();

  res.status(200).json({ success: true, message: 'Submission graded', data: submission });
});

const getMySubmissions = asyncHandler(async (req, res) => {
  const query = { student: req.user._id };

  if (req.query.courseId) {
    const assignmentIds = await Assignment.find({ course: req.query.courseId }).distinct('_id');
    query.assignment = { $in: assignmentIds };
  }

  const submissions = await Submission.find(query).populate('assignment', 'course title totalMarks dueDate');

  res.status(200).json({ success: true, count: submissions.length, data: submissions });
});

module.exports = { submitAssignment, getSubmissions, getMySubmissions, gradeSubmission };
