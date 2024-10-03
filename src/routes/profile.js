import express from 'express';
import controller from '../controllers/profile.js';
import policies from '../policies/profile.js';
import auth from '../auth.js';

const { protectRoute, idParamsRoute: userIdParamsRoute } = auth;

const router = express.Router();

const root = '/profile';

router.get(
    `${root}`,
    [
        protectRoute,
    ],
    controller.redirectToProfileView
);

router.get(
    `${root}/:userId`,
    [
        userIdParamsRoute,
        policies.profileViewValidation,
    ],
    controller.profileView
);

router.delete(
    `${root}/:userId/delete`,
    [
        userIdParamsRoute,
    ],
    controller.deleteUser
);

router.post(
    `${root}/:userId/password`,
    [
        userIdParamsRoute,
        policies.updateUserPasswordValidation,
    ],
    controller.updateUserPassword
);

router.post(
    `${root}/:userId`,
    [
        userIdParamsRoute,
        policies.updateUserProfileValidation,
    ],
    controller.updateUserProfile
);

export default router;
