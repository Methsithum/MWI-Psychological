const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Notification = require('../models/Notification');

const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: notifications.length, data: notifications });
});

const createNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.create(req.body);
  res.status(201).json({ success: true, message: 'Notification created', data: notification });
});

const createAnnouncement = asyncHandler(async (req, res) => {
  const { courseId, title, description, link = '' } = req.body;

  if (!courseId || !title || !description) {
    throw new ApiError(400, 'Course, title and description are required');
  }

  const course = await Course.findById(courseId).select('title teacher students');
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  const isTeacherOwner = req.user.role === 'teacher' && String(course.teacher) === String(req.user._id);
  const isAdmin = req.user.role === 'admin';

  if (!isTeacherOwner && !isAdmin) {
    throw new ApiError(403, 'You are not allowed to post announcements for this course');
  }

  const announcementGroupId = new mongoose.Types.ObjectId().toString();
  const recipients = Array.isArray(course.students) ? course.students : [];
  const announcementDocs = recipients.map((studentId) => ({
    recipient: studentId,
    sender: req.user._id,
    title,
    link,
    type: 'announcement',
    message: description,
    metadata: {
      courseId: String(course._id),
      courseTitle: course.title,
      announcementGroupId,
    },
  }));

  announcementDocs.push({
    recipient: req.user._id,
    sender: req.user._id,
    title,
    link,
    type: 'announcement',
    message: description,
    metadata: {
      courseId: String(course._id),
      courseTitle: course.title,
      announcementGroupId,
      isOwnerCopy: true,
    },
  });

  const createdAnnouncements = await Notification.insertMany(announcementDocs);

  res.status(201).json({
    success: true,
    message: 'Announcement posted',
    data: {
      announcementGroupId,
      createdCount: createdAnnouncements.length,
      announcement: createdAnnouncements[createdAnnouncements.length - 1],
    },
  });
});

const deleteAnnouncement = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  const result = await Notification.deleteMany({
    sender: req.user._id,
    type: 'announcement',
    'metadata.announcementGroupId': groupId,
  });

  if (!result.deletedCount) {
    throw new ApiError(404, 'Announcement not found');
  }

  res.status(200).json({ success: true, message: 'Announcement deleted', data: { deletedCount: result.deletedCount } });
});

module.exports = { getNotifications, createNotification, createAnnouncement, deleteAnnouncement };
