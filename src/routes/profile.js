const express = require('express');
const profileController = require('../controllers/profile');
const { protectRoute, idParamsRoute } = require('../auth');

const router = express.Router();

router.get('/profile', protectRoute, profileController.redirectToProfileView);
router.get('/profile/:userId', idParamsRoute, profileController.profileView);
router.delete('/profile/:userId/delete', idParamsRoute, profileController.deleteUser);
router.post('/profile/:userId/password', idParamsRoute, profileController.updateUserPassword);
router.post('/profile/:userId', idParamsRoute, profileController.updateUserProfile);

module.exports = router;
