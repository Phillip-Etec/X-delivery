import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

export default {

    init: () => {

        passport.use(
            new LocalStrategy({ usernameField: 'email' },
                async (email, password, done) => {
                    const user = await User.findOne({ where: { email } });
                    if (!user) {
                        return done(null, false, { error: 'usuário ou senha incorreto' });
                    }
                    if (!bcrypt.compareSync(password, user.password)) {
                        return done(null, false, { error: 'usuário ou senha incorreto' });
                    }
                    return done(null, user);
                })
        );

        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser(async (id, done) => {
            const user = await User.findOne({ where: { id } });
            done(null, user);
        });

    },

    protectRoute: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login?next=' + req.url);
    },

    idParamsRoute: (req, res, next) => {
        if (req.isAuthenticated() && req.params.userId == req.user.dataValues.id) {
            return next();
        }
        res.redirect('/');
    },

    adminRoute: (req, res, next) => {
       if (req.isAuthenticated() && req.user.dataValues.isAdmin) {
           return next();
       }
       res.redirect('/');
    },

};
