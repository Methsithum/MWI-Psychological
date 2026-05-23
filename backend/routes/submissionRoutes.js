const express = require('express');
const { submitAssignment, getSubmissions, getMySubmissions, gradeSubmission } = require('../controllers/submissionController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/assignment/:assignmentId', protect, authorizeRoles('admin', 'teacher'), getSubmissions);
router.get('/student/me', protect, authorizeRoles('student'), getMySubmissions);
router.post('/', protect, authorizeRoles('student'), upload.single('file'), submitAssignment);
router.patch('/:id/grade', protect, authorizeRoles('admin', 'teacher'), gradeSubmission);

module.exports = router;
