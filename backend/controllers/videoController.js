const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Video = require('../models/Video');

const getVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find({ course: req.params.courseId }).populate('uploader', 'fullName email');
  res.status(200).json({ success: true, count: videos.length, data: videos });
});

const uploadVideo = asyncHandler(async (req, res) => {
  const videoUrl = (req.body.videoUrl || '').trim();

  if (!videoUrl) {
    throw new ApiError(400, 'Video URL is required (YouTube, Vimeo, Zoom, etc.)');
  }

  const video = await Video.create({
    course: req.body.course,
    uploader: req.user._id,
    title: req.body.title,
    description: req.body.description || '',
    videoUrl,
    duration: req.body.duration || 0,
  });

  res.status(201).json({ success: true, message: 'Video added', data: video });
});

const deleteVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    throw new ApiError(404, 'Video not found');
  }

  const isOwner = String(video.uploader) === String(req.user._id);
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, 'You are not allowed to delete this video');
  }

  await Video.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, message: 'Video deleted' });
});

module.exports = { getVideos, uploadVideo, deleteVideo };
