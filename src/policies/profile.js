import User from '../models/User.js';

export default {

    profileViewValidation: (req, res, next) => {
        const user = req.user;
        const { name, email, rnp, birthday, gender } = req.user;
        if (!name || !email || !rnp || !birthday || !gender) {
            return res.render(`profile`, {
                updateError: "Por favor, preencha todos os campos necessários",
            });
        }
        next();
    },

    updateUserProfileValidation: async (req, res, next) => {
        const user = req.user;
        const { name, email, rnp, birthday, gender } = req.body;
        if (!name || !email || !rnp || !birthday || !gender) {
            return res.render(`profile`, {
                updateError: "Por favor, preencha todos os campos necessários",
            });
        }
        try {
            // No 2 users can have the same email
            if (await User.findOne({ where: { email } })) {
                return res.render(`profile`, {
                    updateError: "Um usuário com este endereço de e-mail já existe",
                });
            }
            next();
        }
        catch(err) {
            process.stderr.write(`ERROR: ${err}`)
        }
    },

    updateUserPasswordValidation: async (req, res, next) => {
        const user = req.user;
        const { password, newPassword, renewPassword } = req.body;
        if (!password || !newPassword || !renewPassword) {
            return res.render(`profile`, {
                passwordError: "Por favor, preencha todos os campos necessários",
            });
        }
        // must be the same password
        if (!bcrypt.compareSync(password, user.password)) {
            return res.render(`profile`, { passwordError: "Senha incorreta" });
        }
        // new password shalln't be the same as the old one
        if (bcrypt.compareSync(newPassword, user.password)) {
            return res.render(`profile`, {
                passwordError: "Senha nova não pode ser a igual à senha atual",
            });
        }
        next();
    },

};
