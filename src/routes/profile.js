import express from 'express';
import profileController from '../controllers/profile.js';
import auth from '../auth.js';

const { protectRoute, idParamsRoute } = auth;

const router = express.Router();

router.get(
    '/profile',
    [
        protectRoute,
    ],
    profileController.redirectToProfileView
);

router.get(
    '/profile/:userId',
    idParamsRoute,
    profileController.profileView
);

router.delete(
    '/profile/:userId/delete',
    idParamsRoute,
    profileController.deleteUser
);

router.post(
    '/profile/:userId/password',
    idParamsRoute,
    profileController.updateUserPassword
);

router.post(
    '/profile/:userId',
    idParamsRoute,
    profileController.updateUserProfile
);

export default router;
