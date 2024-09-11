const express = require('express');
const dashboardController = require('../controllers/dashboard');
const { protectRoute } = require('../auth');

const router = express.Router();

router.get('/',  dashboardController.dashboardView);

module.exports = router;
