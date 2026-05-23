const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const ApiError = require('../utils/ApiError');

const DOCUMENT_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const PAYMENT_SLIP_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

const documentStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'lms/documents',
    resource_type: 'auto',
    access_mode: 'public',
    type: 'upload',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
    use_filename: true,
    unique_filename: true,
    overwrite: false,
  }),
});

const paymentSlipStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'lms/payment-slips',
    resource_type: 'auto',
    access_mode: 'public',
    type: 'upload',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
    use_filename: true,
    unique_filename: true,
    overwrite: false,
  }),
});

const documentFileFilter = (req, file, cb) => {
  if (DOCUMENT_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
    return;
  }

  cb(new ApiError(400, 'Unsupported file type. Allowed: PDF, DOC, DOCX, JPG, PNG'), false);
};

const paymentSlipFileFilter = (req, file, cb) => {
  if (PAYMENT_SLIP_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
    return;
  }

  cb(new ApiError(400, 'Payment slip must be JPEG, PNG, or PDF'), false);
};

const upload = multer({
  storage: documentStorage,
  fileFilter: documentFileFilter,
  limits: { fileSize: 1024 * 1024 * 500 },
});

const paymentSlipUpload = multer({
  storage: paymentSlipStorage,
  fileFilter: paymentSlipFileFilter,
  limits: { fileSize: 1024 * 1024 * 10 },
});

upload.paymentSlipUpload = paymentSlipUpload;

module.exports = upload;
