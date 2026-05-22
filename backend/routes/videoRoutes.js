const express = require('express');
const { getVideos, uploadVideo, deleteVideo } = require('../controllers/videoController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/course/:courseId', protect, getVideos);
router.post('/', protect, authorizeRoles('admin', 'teacher'), upload.single('video'), uploadVideo);
router.delete('/:id', protect, authorizeRoles('admin', 'teacher'), deleteVideo);

module.exports = router;
