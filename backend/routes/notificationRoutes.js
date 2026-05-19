const express = require('express');
const { getNotifications, createNotification } = require('../controllers/notificationController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getNotifications);
router.post('/', protect, authorizeRoles('admin'), createNotification);

module.exports = router;
