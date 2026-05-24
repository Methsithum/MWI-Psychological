const express = require('express');
const { createAssignment, getAssignments, deleteAssignment } = require('../controllers/assignmentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/course/:courseId', protect, getAssignments);
router.post('/', protect, authorizeRoles('admin', 'teacher'), upload.single('file'), createAssignment);
router.delete('/:id', protect, authorizeRoles('admin', 'teacher'), deleteAssignment);

module.exports = router;
