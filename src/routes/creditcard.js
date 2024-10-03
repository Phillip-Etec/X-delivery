import express from 'express';
import controller from '../controllers/creditcard.js';
import policies from '../policies/creditcard.js';
import auth from '../auth.js';

const { protectRoute, idParamsRoute } = auth;

const router = express.Router();

router.get(
    '/plasticmoney',
    [
        protectRoute,
    ],
    controller.redirectToCreditCardView
);

router.get(
    '/plasticmoney/:userId',
    [
        idParamsRoute,
    ],
    controller.creditCardView
);

router.get(
    '/plasticmoney/:userId/add',
    [
        idParamsRoute,
    ],
    controller.creditCardFormView
);

router.delete(
    '/plasticmoney/:userId/delete',
    [
        idParamsRoute,
        policies.deleteCreditCardValidation,
        policies.noCardRegistered,
    ],
    controller.deleteCreditCard
);

router.post(
    '/plasticmoney/:userId/edit',
    [
        idParamsRoute,
        policies.updateCreditCardValidation,
        policies.noCardRegistered,
    ],
    controller.updateCreditCard
);

router.post(
    '/plasticmoney/:userId/add',
    [
        idParamsRoute,
        policies.addCreditCardValidation,
        policies.cardAlreadyRegistered,
    ],
    controller.addCreditCard
);

export default router;
