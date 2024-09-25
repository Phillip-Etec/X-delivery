//import bcrypt from 'bcrypt';
import { encrypt, decrypt } from '../helpers/encryption.js';
import CreditCard from '../models/CreditCard.js';
// import User from '../models/User.js';

export default {

    creditCardView: async (req, res) => {
        const user = req.user;
        const empty = [];
        let no_cards_found = false;
        let cards_array = [];
        await CreditCard.findAndCountAll({
            where: { user_id: user.id },
        }).then(
            (results) => {
                cards_array = Array.from(results.rows);
            }
        );
        for (let i = 0; i < cards_array.length; i++) {
            cards_array[i].number = decrypt(cards_array[i].number);
            cards_array[i].cvv = decrypt(cards_array[i].cvv);
        }
        if (no_cards_found)
            cards_array = empty;
        res.render('creditcardadd', {
            noplasticmoney: no_cards_found,
            responseArray: cards_array,
            id: req.user.id,
        });
    },

    creditCardFormView: (req, res) => {
        //TODO
        res.render('cardform');
    },

    redirectToCreditCardView: (req, res) => {
        const id = req.user.id;
        res.redirect(`plasticmoney/${id}`)
    },

    addCreditCard: async (req, res) => {
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
        // bussiness logic
        if (await CreditCard.findOne({ where: { number: number } })) {
            return res.json({ success: false, error: 'um cartão com este número já está cadastrado' });
        }
        //TODO: find issuer and modality id before inserting;
        await CreditCard.create({
            name: name,
            issuer: issuer,
            number: encrypt(number),
            expiry: parseDate(expiry),
            cvv: encrypt(cvv),
            modality: modality,
            user_id: req.user.id,
        });
        res.json({ success: true });
    },

    updateCreditCard: async (req, res) => {
        const { name, issuer, number, expiry, cvv, modality, new_number } = req.body;
        let cardFound = false;
        let creditCard, cards;
        if (!name || !issuer || !number || !expiry || !cvv || !modality || !new_number) {
            return res.render(`/placeholder/url/`, { error: 'por favor, preencha todos os campos necessários' });
        }
        await CreditCard.findAll({
            where: { user_id: req.user.id }
        }).then(
            (results) => {
                cards = Array.from(results);
            }
        );

        if (!cards) {
            return res.redirect(`/plasticmoney`, { error: 'Você não tem nenhum cartão registrado' });
        }
        for (let i = 0; i < cards.length; i++) {
            if (decrypt(cards[i].number) == number) {
                cardFound = true;
                creditCard = cards[i];
                break;
            }
        }

        if (!cardFound) {
            return res.redirect('/plasticmoney', { error: 'Você não tem nenhum cartão registrado com este número' });
        }

        creditCard.update({
            name: name,
            issuer: issuer,
            number: encrypt(new_number),
            expiry: parseDate(expiry),
            cvv: encrypt(cvv),
            modality: modality,
            user_id: req.user.id,
        });
        return res.redirect('');
    },

    deleteCreditCard: async (req, res) => {
        const { number } = req.body;
        if (!number) {
            return res.json({ error: 'Número do cartão não fornecido' });
        }
        let creditCard;
        let cardFound = false;
        let cards = [];
        await CreditCard.findAll({
            where: { user_id: req.user.id }
        }).then((results) => {
            cards = Array.from(results);
        });
        if (!cards) {
            return res.json({ error: 'Você não tem nenhum cartão registrado' });
        }
        for (let i = 0; i < cards.length; i++) {
            if (decrypt(cards[i].number) === number) {
                cardFound = true;
                creditCard = cards[i];
                break;
            }
        }
        //
        if (!cardFound) {
            return res.json({ error: 'Você não tem nenhum cartão registrado com este número' });
        }
        else {
            await creditCard.destroy();
        }
        return res.json({ success: true });
    },

};

/*
 * Parses a string in the format "dd/mm/YYYY" into a Date object.
 * Will default to current date if str's format is invalid
 * @param {string} str: string to be validated and converted into a date object
 * @returns {Date} Date parsed from string
 */
function parseDate(str) {
    var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    return (m) ? new Date(m[3], m[2] - 1, m[1]) : Date.now();
}
