const express = require('express');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/course/:courseId', protect, getAttendance);
router.post('/', protect, authorizeRoles('admin', 'teacher'), markAttendance);

module.exports = router;
