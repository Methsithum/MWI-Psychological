const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Material = require('../models/Material');
const { extractUploadedAsset, deleteCloudinaryAsset } = require('../utils/cloudinaryAsset');

const getMaterials = asyncHandler(async (req, res) => {
  const materials = await Material.find({ course: req.params.courseId }).populate('uploader', 'fullName email');
  res.status(200).json({ success: true, count: materials.length, data: materials });
});

const uploadMaterial = asyncHandler(async (req, res) => {
  const uploaded = extractUploadedAsset(req.file);
  const fileUrl = uploaded?.fileUrl || req.body.fileUrl;
  const fallbackName = String(fileUrl || '').split('/').pop() || '';
  const fileName = uploaded?.metadata?.originalName || req.body.fileName || fallbackName;

  if (!fileUrl) {
    throw new ApiError(400, 'File URL is required');
  }

  const material = await Material.create({
    course: req.body.course,
    uploader: req.user._id,
    title: req.body.title,
    fileName,
    fileUrl,
    publicId: uploaded?.publicId || '',
    metadata: uploaded?.metadata || {},
    fileType: uploaded?.metadata?.mimeType || req.body.fileType,
  });

  res.status(201).json({ success: true, message: 'Material uploaded', data: material });
});

const deleteMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);

  if (!material) {
    throw new ApiError(404, 'Material not found');
  }

  const isOwner = String(material.uploader) === String(req.user._id);
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, 'You are not allowed to delete this material');
  }

  if (material.publicId) {
    await deleteCloudinaryAsset(material.publicId, material.metadata?.resourceType);
  }

  await Material.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, message: 'Material deleted' });
});

module.exports = { getMaterials, uploadMaterial, deleteMaterial };
