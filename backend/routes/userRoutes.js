const express = require('express');
const { getAllUsers, getPendingStudents, approveStudent, rejectStudent, deleteStudent } = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, authorizeRoles('admin'), getAllUsers);
router.get('/pending-students', protect, authorizeRoles('admin'), getPendingStudents);
router.patch('/students/:id/approve', protect, authorizeRoles('admin'), approveStudent);
router.patch('/students/:id/reject', protect, authorizeRoles('admin'), rejectStudent);
router.delete('/students/:id', protect, authorizeRoles('admin'), deleteStudent);

module.exports = router;
