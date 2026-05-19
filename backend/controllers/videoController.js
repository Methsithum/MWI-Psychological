const asyncHandler = require('../utils/asyncHandler');
const Video = require('../models/Video');

const getVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find({ course: req.params.courseId }).populate('uploader', 'fullName email');
  res.status(200).json({ success: true, count: videos.length, data: videos });
});

const uploadVideo = asyncHandler(async (req, res) => {
  const video = await Video.create({
    course: req.body.course,
    uploader: req.user._id,
    title: req.body.title,
    videoUrl: req.file ? req.file.path : req.body.videoUrl,
    duration: req.body.duration || 0,
  });

  res.status(201).json({ success: true, message: 'Video uploaded', data: video });
});

module.exports = { getVideos, uploadVideo };
