const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileUrl: { type: String, default: '' },
    publicId: { type: String, default: '' },
    metadata: {
      originalName: { type: String, default: '' },
      mimeType: { type: String, default: '' },
      size: { type: Number, default: 0 },
      format: { type: String, default: '' },
      resourceType: { type: String, default: '' },
      bytes: { type: Number, default: 0 },
    },
    fileName: { type: String, default: '' },
    remarks: { type: String, default: '' },
    grade: { type: String, default: '' },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);
