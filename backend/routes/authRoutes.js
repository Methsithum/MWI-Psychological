const express = require('express');
const { login, registerStudent, changePassword } = require('../controllers/authController');
const {
  loginValidator,
  loginBodyValidator,
  studentRegisterValidator,
  changePasswordValidator,
} = require('../validators/authValidators');
const validateRequest = require('../middleware/validateRequest');
const upload = require('../middleware/uploadMiddleware');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginBodyValidator, validateRequest, login);
router.post('/login/:role', loginValidator, validateRequest, login);
router.post('/register/student', upload.paymentSlipUpload.single('paymentSlip'), studentRegisterValidator, validateRequest, registerStudent);
router.patch('/change-password', protect, authorizeRoles('student'), changePasswordValidator, validateRequest, changePassword);

module.exports = router;
