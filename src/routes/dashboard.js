import express from 'express';
import controller from '../controllers/dashboard.js';
import auth from '../auth.js';

const { protectRoute } = auth;

const router = express.Router();

router.get(
    '/',
    controller.dashboardView
);


export default router;
