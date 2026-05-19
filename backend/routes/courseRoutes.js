const express = require('express');
const { getCourses, createCourse, getCourseById, getCourseStudents, updateCourse, deleteCourse } = require('../controllers/courseController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getCourses);
router.get('/:id', protect, getCourseById);
router.get('/:id/students', protect, authorizeRoles('admin', 'teacher'), getCourseStudents);
router.post('/', protect, authorizeRoles('admin', 'teacher'), createCourse);
router.put('/:id', protect, authorizeRoles('admin', 'teacher'), updateCourse);
router.delete('/:id', protect, authorizeRoles('admin', 'teacher'), deleteCourse);

module.exports = router;
