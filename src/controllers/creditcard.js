//import bcrypt from 'bcrypt';
import assert from 'assert';
import { encrypt, decrypt } from '../helpers/encryption.js';
import { parseDate } from '../helpers/common.js';
import CreditCard from '../models/CreditCard.js';
import { strategySendJsonSuccess, serverError } from '../helpers/validation.js';
import { removeNullUndefinedEmptyKeys, areAllKeysNullOrUndefined } from '../helpers/common.js';
// import User from '../models/User.js';

export default {

    creditCardView: async (req, res) => {
        //interface cardResObj {
            //name: string,
            //issuer: string,
            //number: string,
            //expiry: string,
            //cvv: string,
            //modality: string
        //};
        const user = req.user;
        const empty = [];
        let no_cards_found = false;
        let cards_array = [];
        try {
            await CreditCard.findAndCountAll({
                where: { user_id: user.id },
            }).then( (results) => {
                cards_array = results.rows.map((card) => ({
                    ...card,
                    number: decrypt(card.number),
                    cvv: decrypt(card.cvv),
                }));
            };
            res.render('creditcardadd', {
                noplasticmoney: no_cards_found,
                responseArray: cards_array,
                id: req.user.id,
            });
        }
        catch (err) {
            console.error(`ERROR: ${err}\nON: ${err.stack}`);
            return serverError(res);
        }
    },

    creditCardFormView: (req, res) => {
        //TODO: sent title to view
        const { name, id } = req.user;
        const title = `Cartões de ${name}`;
        res.render('cardform', { title, id });
    },

    redirectToCreditCardView: (req, res) => {
        const id = req.user.id;
        res.redirect(`plasticmoney/${id}`);
    },

    addCreditCard: async (req, res) => {
        //TODO: find issuer and modality id before inserting;
        const rec = res.locals.received;
        assert.equal(areAllKeysNullOrUndefined(rec), false);
        const props = removeNullUndefinedEmptyKeys({
            name: rec.name,
            issuer: rec.issuer,
            number: encrypt(rec.number),
            expiry: parseDate(rec.expiry),
            cvv: encrypt(rec.cvv),
            modality: rec.modality
        });
        await CreditCard.create({
            ...props,
            user_id: req.user.id,
        });
        //TODO: send alert and redirect to all creditcards view
        res.redirect(`/plasticmoney`);
    },

    updateCreditCard: async (_, res) => {
        const rec = res.received;
        const creditCard = res.locals.creditCard;
        const props = removeNullUndefinedEmptyKeys({
            name: rec.name ?? '',
            issuer: rec.issuer ?? '',
            number: rec.new_number ? encrypt(rec.new_number) : '',
            expiry: rec.expiry ? parseDate(expiry) : '',
            cvv: rec.cvv ? encrypt(cvv) : '',
            modality: rec.modality ?? '',
        });
        try {
            await creditCard.update({
                ...props,
            });
            return res.redirect(`/plasticmoney`);
        }
        catch (err) {
            console.error(`ERROR: ${err}\nON: ${err.stack}`);
        }
    },

    deleteCreditCard: async (_, res) => {
        const creditCard = res.locals.creditCard;
        try {
            await creditCard.destroy();
            strategySendJsonSuccess(res,
                'Cartão cadastrado com sucesso',
                'Sucesso'
            );
        }
        catch (err) {
            console.error(`ERROR: ${err}\nON: ${err.stack}`);
        }
    },

};
