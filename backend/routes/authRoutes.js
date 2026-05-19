const express = require('express');
const { login, registerStudent } = require('../controllers/authController');
const { loginValidator, studentRegisterValidator } = require('../validators/authValidators');
const validateRequest = require('../middleware/validateRequest');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/login', loginValidator, validateRequest, login);
router.post('/login/:role', loginValidator, validateRequest, login);
router.post('/register/student', upload.single('paymentSlip'), studentRegisterValidator, validateRequest, registerStudent);

module.exports = router;
