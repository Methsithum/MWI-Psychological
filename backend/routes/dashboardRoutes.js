const express = require('express');
const { getDashboardSummary } = require('../controllers/dashboardController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/summary', protect, authorizeRoles('admin', 'teacher'), getDashboardSummary);

module.exports = router;
