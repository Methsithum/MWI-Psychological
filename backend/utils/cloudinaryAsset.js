const cloudinary = require('../config/cloudinary');
const ApiError = require('./ApiError');

const RESOURCE_TYPES = ['image', 'raw', 'video'];

/**
 * Normalize multer-storage-cloudinary file object into LMS asset fields.
 */
const extractUploadedAsset = (file) => {
  if (!file) {
    return null;
  }

  const fileUrl = file.path || file.secure_url;
  const publicId =
    file.public_id || file.filename || extractPublicIdFromUrl(fileUrl);

  if (!fileUrl || !publicId) {
    throw new ApiError(500, 'Cloudinary upload did not return file URL or public ID');
  }

  return {
    fileUrl,
    publicId: extractPublicIdFromUrl(fileUrl) || publicId,
    metadata: {
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      format: file.format || null,
      resourceType: file.resource_type || inferResourceType(file.mimetype),
      bytes: file.bytes || file.size,
    },
  };
};

const inferResourceType = (mimeType = '') => {
  if (mimeType.startsWith('image/')) {
    return 'image';
  }

  if (mimeType === 'application/pdf') {
    return 'image';
  }

  if (
    mimeType === 'application/msword' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return 'raw';
  }

  return 'auto';
};

/**
 * Delete a Cloudinary asset by public ID. Tries stored resource type first, then fallbacks.
 */
const deleteCloudinaryAsset = async (publicId, preferredResourceType) => {
  if (!publicId) {
    return { result: 'not_found' };
  }

  const typesToTry =
    preferredResourceType && preferredResourceType !== 'auto'
      ? [preferredResourceType, ...RESOURCE_TYPES.filter((type) => type !== preferredResourceType)]
      : RESOURCE_TYPES;

  let lastResult = { result: 'not found' };

  for (const resource_type of typesToTry) {
    try {
      lastResult = await cloudinary.uploader.destroy(publicId, {
        resource_type,
        invalidate: true,
      });

      if (lastResult.result === 'ok') {
        return lastResult;
      }
    } catch (error) {
      lastResult = { result: 'error', error: error.message };
    }
  }

  return lastResult;
};

const CLOUDINARY_FOLDERS = ['lms/documents', 'lms/payment-slips'];

const extractPublicIdFromUrl = (fileUrl) => {
  if (!fileUrl || !fileUrl.includes('cloudinary.com') || !fileUrl.includes('/upload/')) {
    return null;
  }

  const afterUpload = fileUrl.split('/upload/')[1];
  if (!afterUpload) {
    return null;
  }

  const withoutVersion = afterUpload.replace(/^v\d+\//, '');
  const withoutQuery = withoutVersion.split('?')[0];
  const withoutExtension = withoutQuery.replace(/\.[a-z0-9]+$/i, '');

  return withoutExtension || null;
};

const extractVersionFromUrl = (fileUrl) => {
  const match = String(fileUrl || '').match(/\/upload\/v(\d+)\//);
  return match ? Number(match[1]) : undefined;
};

const extractFormatFromUrl = (fileUrl) => {
  const match = String(fileUrl || '').match(/\.([a-z0-9]+)(?:\?|$)/i);
  return match ? match[1].toLowerCase() : undefined;
};

const buildPublicIdCandidates = (storedPublicId, fileUrl) => {
  const candidates = [];
  const fromUrl = extractPublicIdFromUrl(fileUrl);

  if (fromUrl) {
    candidates.push(fromUrl);
  }

  if (storedPublicId) {
    candidates.push(storedPublicId);

    if (!String(storedPublicId).includes('/')) {
      CLOUDINARY_FOLDERS.forEach((folder) => {
        candidates.push(`${folder}/${storedPublicId}`);
      });
    }
  }

  return [...new Set(candidates.filter(Boolean))];
};

const findCloudinaryResource = async (storedPublicId, fileUrl, metadata = {}) => {
  const publicIdCandidates = buildPublicIdCandidates(storedPublicId, fileUrl);
  const preferredType = resolveResourceType(fileUrl, metadata);
  const resourceTypes = [...new Set([preferredType, 'image', 'raw', 'video'])];

  for (const publicId of publicIdCandidates) {
    for (const resource_type of resourceTypes) {
      try {
        const resource = await cloudinary.api.resource(publicId, { resource_type });
        if (resource?.public_id) {
          return resource;
        }
      } catch {
        // try next candidate
      }
    }
  }

  return null;
};

const resolveDeliveryFormat = (resource, fileUrl, metadata, fileName) => {
  if (resource?.format) {
    return resource.format;
  }

  if (metadata?.format) {
    return metadata.format;
  }

  const fromUrl = extractFormatFromUrl(fileUrl);
  if (fromUrl) {
    return fromUrl;
  }

  const fromName = String(fileName || '').match(/\.([a-z0-9]+)$/i);
  if (fromName) {
    return fromName[1].toLowerCase();
  }

  if (metadata?.mimeType === 'application/pdf') {
    return 'pdf';
  }

  if (metadata?.mimeType === 'image/jpeg') {
    return 'jpg';
  }

  if (metadata?.mimeType === 'image/png') {
    return 'png';
  }

  return 'pdf';
};

/**
 * Accounts with restricted CDN delivery require the private download API URL (returns 200).
 * cloudinary.url(..., { sign_url: true }) often still returns 401 on those accounts.
 */
const buildPrivateDownloadUrl = (resource, fileUrl, metadata, fileName) => {
  const publicId = resource.public_id;
  const format = resolveDeliveryFormat(resource, fileUrl, metadata, fileName);
  const resourceType = resource.resource_type || resolveResourceType(fileUrl, metadata);
  const deliveryType = resource.type || 'upload';

  return cloudinary.utils.private_download_url(publicId, format, {
    resource_type: resourceType,
    type: deliveryType,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
  });
};

const buildPrivateDownloadCandidates = (publicId, fileUrl, metadata, fileName) => {
  const preferredFormat = resolveDeliveryFormat(null, fileUrl, metadata, fileName);
  const formats = [...new Set([preferredFormat, 'pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'])];
  const resourceTypes = [
    ...new Set([resolveResourceType(fileUrl, metadata), 'image', 'raw']),
  ];

  const urls = [];

  formats.forEach((format) => {
    resourceTypes.forEach((resource_type) => {
      urls.push(
        cloudinary.utils.private_download_url(publicId, format, {
          resource_type,
          type: 'upload',
          expires_at: Math.floor(Date.now() / 1000) + 3600,
        })
      );
    });
  });

  return [...new Set(urls)];
};

const sanitizeAttachmentName = (fileName = 'download') =>
  String(fileName)
    .trim()
    .replace(/[^\w.\-()+ ]/g, '_')
    .slice(0, 180) || 'download';

const resolveResourceType = (fileUrl, metadata) => {
  if (metadata?.resourceType && metadata.resourceType !== 'auto') {
    return metadata.resourceType;
  }

  if (fileUrl?.includes('/raw/upload/')) {
    return 'raw';
  }

  if (fileUrl?.includes('/video/upload/')) {
    return 'video';
  }

  return 'image';
};

module.exports = {
  extractUploadedAsset,
  deleteCloudinaryAsset,
  extractPublicIdFromUrl,
  extractVersionFromUrl,
  buildPublicIdCandidates,
  findCloudinaryResource,
  buildPrivateDownloadUrl,
  buildPrivateDownloadCandidates,
  resolveDeliveryFormat,
  resolveResourceType,
  inferResourceType,
};
