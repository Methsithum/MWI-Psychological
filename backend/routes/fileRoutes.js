const express = require('express');
const {
  downloadMaterial,
  downloadAssignment,
  downloadSubmission,
} = require('../controllers/fileController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/material/:id/download', protect, downloadMaterial);
router.get('/assignment/:id/download', protect, downloadAssignment);
router.get('/submission/:id/download', protect, downloadSubmission);

module.exports = router;
