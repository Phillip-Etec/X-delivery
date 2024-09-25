import User from '../models/User.js';

export default {

    registerUserValidation: async (req, res, next) => {
        const { name, email, password, cpf, birthday, gender } = req.body;
        // checar se todos os campos foram preenchidos
        if(!name || !email || !password || !cpf || !birthday || !gender) {
            return res.render('register', { error: 'Por favor, preencha todos os campos necessários' });
        }
        // No 2 users can have the same email
        if( await User.findOne( { where: {email} } ) ) {
            return res.render('register', { error: 'Um usuário com este endereço de e-mail já existe' });
        }
        next();
    },

};
