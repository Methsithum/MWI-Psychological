const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    videoUrl: { type: String, required: true },
    duration: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', videoSchema);
