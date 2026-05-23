const mongoose = require('mongoose');

const paymentInformationSchema = new mongoose.Schema(
  {
    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudentRegistration',
      required: true,
      unique: true,
    },
    paymentMethod: {
      type: String,
      enum: ['online_payment', 'bank_transfer'],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      trim: true,
    },
    paymentSlipUrl: {
      type: String,
      required: true,
      trim: true,
    },
    paymentSlipPublicId: {
      type: String,
      default: '',
      trim: true,
    },
    paymentSlipMetadata: {
      originalName: { type: String, default: '' },
      mimeType: { type: String, default: '' },
      size: { type: Number, default: 0 },
      format: { type: String, default: '' },
      resourceType: { type: String, default: '' },
      bytes: { type: Number, default: 0 },
    },
    paymentSlipMimeType: {
      type: String,
      required: true,
      trim: true,
    },
    paymentSlipOriginalName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PaymentInformation', paymentInformationSchema);
