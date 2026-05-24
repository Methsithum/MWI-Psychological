const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    totalMarks: { type: Number, default: 0 },
    attachmentUrl: { type: String, default: '' },
    attachmentPublicId: { type: String, default: '' },
    attachmentMetadata: {
      originalName: { type: String, default: '' },
      mimeType: { type: String, default: '' },
      size: { type: Number, default: 0 },
      format: { type: String, default: '' },
      resourceType: { type: String, default: '' },
      bytes: { type: Number, default: 0 },
    },
    attachmentName: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assignment', assignmentSchema);
