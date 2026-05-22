const express = require('express');
const { createAssignment, getAssignments, deleteAssignment } = require('../controllers/assignmentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/course/:courseId', protect, getAssignments);
router.post('/', protect, authorizeRoles('admin', 'teacher'), createAssignment);
router.delete('/:id', protect, authorizeRoles('admin', 'teacher'), deleteAssignment);

module.exports = router;
