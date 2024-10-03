import User from '../models/User.js';
import { validateForm, strategyTemporaryProfile } from '../helpers/validation.js';

export default {

    profileViewValidation: (req, res, next) => {
        const props = {
            updateError: "Por favor, preencha todos os campos necessários",
            name: req.user.name,
            email: req.user.email,
            rnp: req.user.rnp,
            gender: genderToAcronym(gender),
            birthday: dateStringRearrange(date),
        }
        const all = ['name', 'email', 'rnp', 'birthday', 'gender'];
        const required = ['name', 'email', 'rnp', 'birthday', 'gender'];
        validateForm(
            req, res, next,
            all, required, strategyTemporaryProfile,
            'profile', props
        );
        next();
    },

    updateUserProfileValidation: async (req, res, next) => {
        const props = {
            updateError: "Por favor, preencha todos os campos necessários",
        }
        const all = ['name', 'email', 'rnp', 'birthday', 'gender'];
        const required = ['name', 'email', 'rnp', 'birthday', 'gender'];
        validateForm(
            req, res, next,
            all, required, strategyTemporaryProfile,
            'profile', props
        );
        try {
            // No 2 users can have the same email
            if (await User.findOne({ where: { email } })) {
                return strategyTemporaryProfile('profile', {
                    updateError: "Um usuário com este endereço de e-mail já existe",
                });
            }
            next();
        }
        catch (err) {
            console.error(`ERROR: ${err}\nON: ${err.stack}`);
        }
    },

    updateUserPasswordValidation: async (req, res, next) => {
        const props = {
            passwordError: "Por favor, preencha todos os campos necessários",
        }
        const all = ['password', 'newPassword', 'renewPassword'];
        const required = ['password', 'newPassword', 'renewPassword'];
        validateForm(
            req, res, next,
            all, required, strategyTemporaryProfile,
            'profile', props
        );
        // must be the same password
        if (!bcrypt.compareSync(password, user.password)) {
            return strategyTemporaryProfile(`profile`, { passwordError: "Senha incorreta" });
        }
        // new password shalln't be the same as the old one
        if (bcrypt.compareSync(newPassword, user.password)) {
            return strategyTemporaryProfile(`profile`, {
                passwordError: "Senha nova não pode ser a igual à senha atual",
            });
        }
        next();
    },

};
