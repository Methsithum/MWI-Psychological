const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    fileName: { type: String, default: '' },
    fileUrl: { type: String, required: true },
    publicId: { type: String, default: '' },
    metadata: {
      originalName: { type: String, default: '' },
      mimeType: { type: String, default: '' },
      size: { type: Number, default: 0 },
      format: { type: String, default: '' },
      resourceType: { type: String, default: '' },
      bytes: { type: Number, default: 0 },
    },
    fileType: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Material', materialSchema);
