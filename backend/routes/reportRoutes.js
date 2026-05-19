const express = require('express');
const { createReport, getReports } = require('../controllers/reportController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, authorizeRoles('admin'), getReports);
router.post('/', protect, authorizeRoles('admin'), createReport);

module.exports = router;
