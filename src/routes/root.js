import { Router } from 'express';
import authRoutes from './auth.js';
import creditCardRoutes from './creditcard.js';
import dashboardRoutes from './dashboard.js'
import profileRoutes from './profile.js';

const router = Router();

router.use(authRoutes);
router.use(creditCardRoutes);
router.use(dashboardRoutes);
router.use(profileRoutes)

export default router;
