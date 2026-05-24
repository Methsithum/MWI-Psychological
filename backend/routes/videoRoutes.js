const express = require('express');
const { getVideos, uploadVideo, deleteVideo } = require('../controllers/videoController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/course/:courseId', protect, getVideos);
router.post('/', protect, authorizeRoles('admin', 'teacher'), uploadVideo);
router.delete('/:id', protect, authorizeRoles('admin', 'teacher'), deleteVideo);

module.exports = router;
