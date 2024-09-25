import express from 'express';
import profileController from '../controllers/profile.js';
import profilePolicies from '../policies/profile.js';
import auth from '../auth.js';

const { protectRoute, idParamsRoute: userIdParamsRoute } = auth;

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
    [ 
        userIdParamsRoute,
        profilePolicies.profileViewValidation,
    ],
    profileController.profileView
);

router.delete(
    '/profile/:userId/delete',
    [ 
        userIdParamsRoute, 
    ],
    profileController.deleteUser
);

router.post(
    '/profile/:userId/password',
    [
        userIdParamsRoute,
        profilePolicies.updateUserPasswordValidation,
    ],
    profileController.updateUserPassword
);

router.post(
    '/profile/:userId',
    [
        userIdParamsRoute,
        profilePolicies.updateUserProfileValidation,
    ],
    profileController.updateUserProfile
);

export default router;
