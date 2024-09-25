import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { genderToAcronym, parseDate } from '../helpers/common.js'
import passport from 'passport';

export default {

    registerView: (_, res) => {
        res.render('register');
    },

    loginView: (_, res) => {
        res.render('login');
    },

    registerUser: async (req, res) => {
        const { name, email, password, cpf, birthday, gender } = req.body;
        let genderAcronym = genderToAcronym(gender);
        try {
            await User.create( {
                name,
                email,
                password: bcrypt.hashSync(password, 8),
                rnp: cpf,
                birthday: parseDate(birthday),
                isAdmin: false,
                isActive: true,
                gender: genderAcronym
            });
            res.redirect('/login?registrationdone');
        }
        catch(err) {
            process.stderr.write(`ERROR: ${err}`)
        }
    },

    loginUser: (req, res) => {
        passport.authenticate( 'local', {
            successRedirect: '/?loginsuccess',
            failureRedirect: '/login?error'
        })(req, res, { error: 'Um usuário com este endereço de e-mail já existe' });
    },

    logoutUser: (req, res) => {
        req.logout(() => res.redirect('/login?loggedout'));
    },

};
