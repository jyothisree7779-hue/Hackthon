const express = require('express');
const { createReport, getUserReports, getAllReports } = require('../controllers/reportController');
const { auth, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, createReport);
router.get('/my-reports', auth, getUserReports);
router.get('/all', auth, authorize(['health_worker', 'admin']), getAllReports);

module.exports = router;
