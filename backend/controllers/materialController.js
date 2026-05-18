const asyncHandler = require('../utils/asyncHandler');
const Material = require('../models/Material');

const getMaterials = asyncHandler(async (req, res) => {
  const materials = await Material.find({ course: req.params.courseId }).populate('uploader', 'firstName lastName email');
  res.status(200).json({ success: true, count: materials.length, data: materials });
});

const uploadMaterial = asyncHandler(async (req, res) => {
  const material = await Material.create({
    course: req.body.course,
    uploader: req.user._id,
    title: req.body.title,
    fileUrl: req.file ? req.file.path : req.body.fileUrl,
    fileType: req.file ? req.file.mimetype : req.body.fileType,
  });

  res.status(201).json({ success: true, message: 'Material uploaded', data: material });
});

module.exports = { getMaterials, uploadMaterial };
