import express from 'express';
import authController from '../controllers/auth.js';
import authPolicies from '../policies/auth.js';

const router = express.Router();

router.get(
    '/register',
    authController.registerView
);

router.get(
    '/login',
    authController.loginView
);

router.get(
    '/logout',
    authController.logoutUser
);

router.post(
    '/register',
    [
        authPolicies.registerUserValidation
    ],
    authController.registerUser
);

router.post(
    '/login',
    authController.loginUser
);

export default router;
