import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { genderToAcronym, parseDate } from '../helpers/common.js';
import passport from 'passport';
import assert from 'assert';
import { areAllKeysNullOrUndefined } from '../helpers/common.js';

export default {

    registerView: (_, res) => {
        //TODO: send title
        res.render('register');
    },

    loginView: (_, res) => {
        //TODO: send title
        res.render('extras/login');
    },

    registerUser: async (req, res) => {
        assert.equal(areAllKeysNullOrUndefined(res.locals.received), false);
        const { name, email, password, rnp, birthday, gender } = res.locals.received;
        // console.log(res.locals.received);
        let genderAcronym = genderToAcronym(gender);
        try {
            await User.create({
                name: name,
                email: email,
                password: bcrypt.hashSync(password, 8),
                rnp: rnp,
                birthday: parseDate(birthday),
                isAdmin: false,
                isActive: true,
                gender: genderAcronym
            });
            res.redirect('/login?registrationdone');
        }
        catch (err) {
            console.error(`ERROR: ${err}\nON: ${err.stack}`);
        }
    },

    loginUser: (req, res) => {
        passport.authenticate('local', {
            successRedirect: '/?loginsuccess',
            failureRedirect: '/login?error'
        })(req, res, { error: 'Um usuário com este endereço de e-mail já existe' });
    },

    logoutUser: (req, res) => {
        req.logout(() => res.redirect('/login?loggedout'));
    },

};
