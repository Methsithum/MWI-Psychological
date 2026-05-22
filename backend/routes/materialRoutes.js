const express = require('express');
const { getMaterials, uploadMaterial, deleteMaterial } = require('../controllers/materialController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/course/:courseId', protect, getMaterials);
router.post('/', protect, authorizeRoles('admin', 'teacher'), upload.single('file'), uploadMaterial);
router.delete('/:id', protect, authorizeRoles('admin', 'teacher'), deleteMaterial);

module.exports = router;
