const asyncHandler = require('../utils/asyncHandler');
const Report = require('../models/Report');

const createReport = asyncHandler(async (req, res) => {
  const report = await Report.create({ ...req.body, generatedBy: req.user._id });
  res.status(201).json({ success: true, message: 'Report generated', data: report });
});

const getReports = asyncHandler(async (req, res) => {
  const reports = await Report.find().populate('generatedBy', 'fullName email');
  res.status(200).json({ success: true, count: reports.length, data: reports });
});

module.exports = { createReport, getReports };
