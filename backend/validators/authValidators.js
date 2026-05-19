const { body, param } = require('express-validator');

const loginValidator = [
  param('role').isIn(['admin', 'teacher', 'student']).withMessage('Role must be admin, teacher, or student'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const studentRegisterValidator = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

module.exports = { loginValidator, studentRegisterValidator };