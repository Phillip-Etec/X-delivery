//import bcrypt from 'bcrypt';
import { encrypt, decrypt } from '../helpers/encryption.js';
import CreditCard from '../models/CreditCard.js';
// import User from '../models/User.js';

export default {

    creditCardView: async (req, res, next) => {

    },

    creditCardFormView: (req, res, next) => {

        res.render('cardform');
    },

    redirectToCreditCardViewValidation: (req, res, next) => {

    },

    addCreditCardValidation: async (req, res, next) => {
        const { name, issuer, number, expiry, cvv, modality } = req.body;
        // checking/sanitizing
        if (!name || !issuer || !number || !expiry || !cvv || !modality) {
            return res.json({ success: false, error: 'por favor, preencha todos os campos necessários' });
        }
        if (typeof name     !== 'string' ||
            typeof issuer   !== 'string' ||
            typeof number   !== 'string' ||
            typeof expiry   !== 'string' ||
            typeof cvv      !== 'string' ||
            typeof modality !== 'string'
            ) {
            res.json({ success: false, error: 'por favor, preencha todos os campos necessários' });
            throw new TypeError('One of the values sent by the client is of the wrong type');
        }
        next();
    },

    updateCreditCardValidation: async (req, res, next) => {
        const { name, issuer, number, expiry, cvv, modality, new_number } = req.body;
        if (!name || !issuer || !number || !expiry || !cvv || !modality || !new_number) {
            return res.render(`/placeholder/url/`, { error: 'por favor, preencha todos os campos necessários' });
        }
        next();
    },

    deleteCreditCardValidation: async (req, res, next) => {
        const { number } = req.body;
        if (!number) {
            return res.json({ error: 'Número do cartão não fornecido' });
        }
        next();
    },

};
