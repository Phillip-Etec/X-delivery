import express from 'express';
import controller from '../controllers/auth.js';
import policies from '../policies/auth.js';

const router = express.Router();

router.get(
    '/register',
    controller.registerView
);

router.get(
    '/login',
    controller.loginView
);

router.get(
    '/logout',
    controller.logoutUser
);

router.post(
    '/register',
    [
        policies.registerUserValidation
    ],
    controller.registerUser
);

router.post(
    '/login',
    controller.loginUser
);

export default router;
