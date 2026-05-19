const express = require('express');
const { getMaterials, uploadMaterial } = require('../controllers/materialController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/course/:courseId', protect, getMaterials);
router.post('/', protect, authorizeRoles('admin', 'teacher'), upload.single('file'), uploadMaterial);

module.exports = router;
