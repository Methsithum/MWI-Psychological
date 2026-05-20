const express = require('express');
const {
  getStudentsByCourse,
  getCourseWiseStudentLists,
  getStudentCountsByCourse,
} = require('../controllers/studentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/course/:courseId', protect, authorizeRoles('admin', 'teacher'), getStudentsByCourse);
router.get('/course-wise', protect, authorizeRoles('admin', 'teacher'), getCourseWiseStudentLists);
router.get('/course-counts', protect, authorizeRoles('admin', 'teacher'), getStudentCountsByCourse);

module.exports = router;
