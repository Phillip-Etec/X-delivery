const express = require('express');
const creditCardController = require('../controllers/creditcard');
const { protectRoute, idParamsRoute } = require('../auth');

const router = express.Router();

router.get('/plasticmoney', protectRoute, creditCardController.redirectToCreditCardView);
router.get('/plasticmoney/:userId', idParamsRoute, creditCardController.creditCardView);
router.get('/plasticmoney/:userId/add', idParamsRoute, creditCardController.creditCardFormView);
router.delete('/plasticmoney/:userId/delete', idParamsRoute, creditCardController.deleteCreditCard);
router.post('/plasticmoney/:userId/edit', idParamsRoute, creditCardController.updateCreditCard);
router.post('/plasticmoney/:userId/add', idParamsRoute, creditCardController.addCreditCard);

module.exports = router;
