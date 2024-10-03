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
        if (!cards) {
            strategySendJsonError(res,
                'Você não tem nenhum cartão registrado',
                'Erro'
            );
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
            strategySendJsonSuccess(res,
                'Você não tem nenhum cartão registrado com este número',
                'Erro'
            );
        }
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
