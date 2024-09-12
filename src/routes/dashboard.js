import express from 'express';
import dashboardController from '../controllers/dashboard.js';
import auth from '../auth.js';

const { protectRoute } = auth;

const router = express.Router();

router.get('/',  dashboardController.dashboardView);

export default router;
