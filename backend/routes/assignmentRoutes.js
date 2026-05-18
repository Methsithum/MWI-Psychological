const express = require('express');
const { createAssignment, getAssignments } = require('../controllers/assignmentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/course/:courseId', protect, getAssignments);
router.post('/', protect, authorizeRoles('admin', 'teacher'), createAssignment);

module.exports = router;
