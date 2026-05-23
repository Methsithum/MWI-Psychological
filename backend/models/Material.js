const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    fileName: { type: String, default: '' },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Material', materialSchema);
