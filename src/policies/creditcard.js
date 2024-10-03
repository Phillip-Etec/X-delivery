import { validateForm, strategySendJsonError, strategySendHtmxAlert } from '../helpers/validation.js';
import { decrypt } from '../helpers/encryption.js';
import CreditCard from '../models/CreditCard.js';

export default {

    addCreditCardValidation: (req, res, next) => {
        const all = ['name', 'issuer', 'number', 'expiry', 'cvv', 'modality'];
        const required = ['name', 'issuer', 'number', 'expiry', 'cvv', 'modality'];
        const message = 'Por favor, preencha todos os campos necessários';
        const title = 'Faltou algum dado';

        validateForm(
            req, res, next,
            all, required, strategySendJsonError,
            message, title
        );
        next();
    },

    updateCreditCardValidation: (req, res, next) => {
        const all = ['number', 'name', 'issuer', 'cvv', 'modality', 'new_number'];
        const required = ['number'];
        const message = 'Por favor, preencha todos os campos necessários';
        const title = 'Faltou algum dado';

        validateForm(
            req, res, next,
            all, required, strategySendHtmxAlert,
            message, title
        );
        next();
    },

    deleteCreditCardValidation: (req, res, next) => {
        const all = ['number'];
        const required = ['number'];
        const message = 'É necessário enviar o número do cartão a ser deletado';
        const title = 'Faltou algum dado';

        validateForm(
            req, res, next,
            all, required, strategySendJsonError,
            message, title
        )
        next();
    },


    noCardRegistered: async (req, res, next) => {
        let creditCard;
        let cardFound = false;
        let cards = [];
        await CreditCard.findAll({
            where: { user_id: req.user.id }
        }).then((results) => {
            cards = Array.from(results);
        });
        if (cards.length === 0) {
            strategySendJsonError(res,
                'Você não tem nenhum cartão registrado',
                'Erro'
            );
        const cardFound = cards.some((card) => decrypt(card.number) === number);
        if (!cardFound) {
            return strategySendJsonSuccess(res,
                'Você não tem nenhum cartão registrado com este número',
                'Erro'
            );
        }
        const creditCard = cards.find((card) => decrypt(card.number) === number);
        res.locals.creditCard = creditCard;
        next();
    },

    cardAlreadyRegistered: async (req, res, next) => {
        const rec = res.locals.received;
        if (await CreditCard.findOne({
            where: { number: rec.number }
        })) {
            strategySendJsonError(res,
                'um cartão com este número já está cadastrado',
                'Erro'
            );
        }
        next();
    }

};
