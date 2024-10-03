import User from '../models/User.js';
import { validateForm, strategySendJsonError, strategySendHtmxAlert } from '../helpers/validation.js'

export default {

    registerUserValidation: async (req, res, next) => {
        const all = ['name', 'email', 'password', 'rnp', 'birthday', 'gender'];
        const required = ['name', 'email', 'password', 'rnp', 'birthday', 'gender'];
        const message = 'Por favor, preencha todos os campos necessários';
        const title = 'Faltou algum dado';
        validateForm(
            req, res, next,
            all, required, strategySendJsonError,
            message, title
        )
        // No 2 users can have the same email
        try {
            const email = req.body.email;
            if (await User.findOne({ where: { email } })) {
                return strategySendJsonError(res,
                    'Já existe um usuário com este mesmo e-mail cadastrado',
                    'Usuário já existe'
                );
            }
        }
        catch (err) {
            console.error(`ERROR: ${err}\nON: ${err.stack}`);
        }
        next();
    },

};
