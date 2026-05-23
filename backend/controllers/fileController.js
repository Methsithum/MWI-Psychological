const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Material = require('../models/Material');
const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const { assertCourseAccess } = require('../utils/courseAccess');
const {
  extractPublicIdFromUrl,
  findCloudinaryResource,
  buildPrivateDownloadUrl,
  buildPrivateDownloadCandidates,
} = require('../utils/cloudinaryAsset');

const streamRemoteFile = async (sourceUrl, res, fileName) => {
  const upstream = await fetch(sourceUrl);

  if (!upstream.ok) {
    throw new ApiError(502, `Failed to fetch file from storage (${upstream.status})`);
  }

  const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
  const safeName = fileName.replace(/[^\w.\-()+\s]/g, '_');

  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', `attachment; filename="${safeName}"`);
  res.setHeader('Cache-Control', 'private, no-store');

  const buffer = Buffer.from(await upstream.arrayBuffer());
  res.send(buffer);
};

const resolveDownloadSource = (record) => {
  const fileUrl = record.fileUrl || record.attachmentUrl;
  const storedPublicId = record.publicId || record.attachmentPublicId || '';
  const publicId = extractPublicIdFromUrl(fileUrl) || storedPublicId;
  const metadata = record.metadata || record.attachmentMetadata || {};
  const fileName =
    record.fileName ||
    record.attachmentName ||
    metadata.originalName ||
    'download';

  if (publicId || (fileUrl && fileUrl.includes('cloudinary.com'))) {
    return { publicId, storedPublicId, fileUrl, metadata, fileName };
  }

  if (fileUrl && fileUrl.startsWith('http')) {
    return { url: fileUrl, fileName };
  }

  return null;
};

const deliverCloudinaryFile = async (source, res) => {
  const { publicId, storedPublicId, fileUrl, metadata, fileName } = source;

  const resource = await findCloudinaryResource(storedPublicId || publicId, fileUrl, metadata);
  const resolvedPublicId = resource?.public_id || extractPublicIdFromUrl(fileUrl) || publicId;

  if (!resolvedPublicId) {
    throw new ApiError(404, 'File not found in Cloudinary storage');
  }

  const downloadUrls = resource
    ? [buildPrivateDownloadUrl(resource, fileUrl, metadata, fileName)]
    : [];

  downloadUrls.push(
    ...buildPrivateDownloadCandidates(resolvedPublicId, fileUrl, metadata, fileName)
  );

  let lastError = null;

  for (const downloadUrl of [...new Set(downloadUrls.filter(Boolean))]) {
    try {
      await streamRemoteFile(downloadUrl, res, fileName);
      return;
    } catch (error) {
      lastError = error;
    }
  }

  if (lastError) {
    throw lastError;
  }

  throw new ApiError(404, 'File not found in Cloudinary storage');
};

const downloadMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);

  if (!material) {
    throw new ApiError(404, 'Material not found');
  }

  await assertCourseAccess(req.user, material.course);

  const source = resolveDownloadSource(material);

  if (!source) {
    throw new ApiError(404, 'File is not available for download');
  }

  if (source.publicId) {
    await deliverCloudinaryFile(source, res);
    return;
  }

  await streamRemoteFile(source.url, res, source.fileName);
});

const downloadAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);

  if (!assignment) {
    throw new ApiError(404, 'Assignment not found');
  }

  if (!assignment.attachmentUrl && !assignment.attachmentPublicId) {
    throw new ApiError(404, 'This assignment has no attachment');
  }

  await assertCourseAccess(req.user, assignment.course);

  const source = resolveDownloadSource({
    publicId: assignment.attachmentPublicId,
    fileUrl: assignment.attachmentUrl,
    metadata: assignment.attachmentMetadata,
    fileName: assignment.attachmentName,
  });

  if (!source) {
    throw new ApiError(404, 'File is not available for download');
  }

  if (source.publicId) {
    await deliverCloudinaryFile(source, res);
    return;
  }

  await streamRemoteFile(source.url, res, source.fileName);
});

const downloadSubmission = asyncHandler(async (req, res) => {
  const submission = await Submission.findById(req.params.id).populate('assignment');

  if (!submission) {
    throw new ApiError(404, 'Submission not found');
  }

  if (!submission.fileUrl && !submission.publicId) {
    throw new ApiError(404, 'This submission has no file');
  }

  const assignment = submission.assignment;
  if (!assignment) {
    throw new ApiError(404, 'Assignment not found for this submission');
  }

  await assertCourseAccess(req.user, assignment.course);

  const isOwner = String(submission.student) === String(req.user._id);
  const isTeacherOrAdmin = req.user.role === 'admin' || req.user.role === 'teacher';

  if (!isOwner && !isTeacherOrAdmin) {
    throw new ApiError(403, 'You are not allowed to download this submission');
  }

  const source = resolveDownloadSource(submission);

  if (!source) {
    throw new ApiError(404, 'File is not available for download');
  }

  if (source.publicId) {
    await deliverCloudinaryFile(source, res);
    return;
  }

  await streamRemoteFile(source.url, res, source.fileName);
});

module.exports = {
  downloadMaterial,
  downloadAssignment,
  downloadSubmission,
};
