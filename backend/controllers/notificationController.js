const asyncHandler = require('../utils/asyncHandler');
const Notification = require('../models/Notification');

const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: notifications.length, data: notifications });
});

const createNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.create(req.body);
  res.status(201).json({ success: true, message: 'Notification created', data: notification });
});

module.exports = { getNotifications, createNotification };
