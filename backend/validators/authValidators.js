const { body, param } = require('express-validator');

const loginValidator = [
  param('role').isIn(['admin', 'teacher', 'student']).withMessage('Role must be admin, teacher, or student'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const loginBodyValidator = [
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const studentRegisterValidator = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('whatsappNumber').notEmpty().withMessage('WhatsApp number is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('nic').notEmpty().withMessage('NIC number is required'),
  body('highestQualification').notEmpty().withMessage('Highest qualification is required'),
  body('courseId').isMongoId().withMessage('Valid course ID is required'),
  body('paymentMethod')
    .isIn(['online_payment', 'bank_transfer'])
    .withMessage('Payment method must be online_payment or bank_transfer'),
  body('transactionId').notEmpty().withMessage('Transaction/reference ID is required'),
  body('notes').optional().isString().withMessage('Notes must be text'),
];

const changePasswordValidator = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
];

module.exports = {
  loginValidator,
  loginBodyValidator,
  studentRegisterValidator,
  changePasswordValidator,
};