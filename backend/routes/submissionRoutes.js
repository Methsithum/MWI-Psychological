const express = require('express');
const { submitAssignment, getSubmissions } = require('../controllers/submissionController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/assignment/:assignmentId', protect, authorizeRoles('admin', 'teacher'), getSubmissions);
router.post('/', protect, authorizeRoles('student'), upload.single('file'), submitAssignment);

module.exports = router;
