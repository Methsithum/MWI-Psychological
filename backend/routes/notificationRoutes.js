const express = require('express');
const { getNotifications, createNotification, createAnnouncement, deleteAnnouncement } = require('../controllers/notificationController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getNotifications);
router.post('/', protect, authorizeRoles('admin'), createNotification);
router.post('/announcements', protect, authorizeRoles('admin', 'teacher'), createAnnouncement);
router.delete('/announcements/:groupId', protect, authorizeRoles('admin', 'teacher'), deleteAnnouncement);

module.exports = router;
