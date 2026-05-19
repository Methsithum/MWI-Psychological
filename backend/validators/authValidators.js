const { body } = require('express-validator');

const loginValidator = [
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const studentRegisterValidator = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('nic').notEmpty().withMessage('NIC is required'),
  body('program').notEmpty().withMessage('Program is required'),
  body('course').optional({ nullable: true }).isString().withMessage('Course must be a string'),
  body('paymentMethod').notEmpty().withMessage('Payment method is required'),
  body('transactionId').notEmpty().withMessage('Transaction ID is required'),
  body('phone').optional({ nullable: true }).isString().withMessage('Phone must be a string'),
];

module.exports = { loginValidator, studentRegisterValidator };