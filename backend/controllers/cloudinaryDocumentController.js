/**
 * Reference controllers for Cloudinary document upload/delete patterns.
 * Production routes use materialController, assignmentController, etc.
 */
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { extractUploadedAsset, deleteCloudinaryAsset } = require('../utils/cloudinaryAsset');

/**
 * Example: handle multipart upload (after upload.single('file') middleware).
 */
const exampleUploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No file uploaded');
  }

  const asset = extractUploadedAsset(req.file);

  // Persist in MongoDB (example shape)
  const documentRecord = {
    title: req.body.title,
    fileUrl: asset.fileUrl,
    publicId: asset.publicId,
    metadata: asset.metadata,
  };

  res.status(201).json({
    success: true,
    message: 'Document uploaded to Cloudinary',
    data: documentRecord,
  });
});

/**
 * Example: delete Cloudinary asset first, then MongoDB record.
 */
const exampleDeleteDocument = asyncHandler(async (req, res) => {
  const { publicId, resourceType } = req.body;

  if (!publicId) {
    throw new ApiError(400, 'publicId is required to delete from Cloudinary');
  }

  const cloudinaryResult = await deleteCloudinaryAsset(publicId, resourceType);

  if (cloudinaryResult.result !== 'ok' && cloudinaryResult.result !== 'not found') {
    throw new ApiError(502, 'Failed to delete file from Cloudinary');
  }

  // await YourModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Document deleted from Cloudinary and database',
    data: { cloudinaryResult },
  });
});

module.exports = {
  exampleUploadDocument,
  exampleDeleteDocument,
};
