const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    reportType: {
      type: String,
      enum: ['attendance', 'academic', 'activity', 'user'],
      required: true,
    },
    filters: { type: mongoose.Schema.Types.Mixed, default: {} },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
