const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require("./models/User");

module.exports = {

    init: () => {

        passport.use(
            new LocalStrategy( { usernameField: 'email' }, 
                async (email, password, done) => {
                const user = await User.findOne({where: { email }});
                    if(!user) { 
                        return done( null, false, { error: 'usuário ou senha incorreto' } );
                    }
                    if(!bcrypt.compareSync(password, user.password)) { 
                        return done( null, false, { error: 'usuário ou senha incorreto' } ); 
                    }
                    return done( null, user );
                } )
        );

        passport.serializeUser((user, done) => {;
            done( null, user.id );
        });

        passport.deserializeUser(async (id, done) => {
            const user = await User.findOne({where: { id }});
            done( null, user );
        });


        /*
         *passport.use(
         *    new LocalStrategy( { usernameField: 'isAdmin' }, 
         *        async (email, password, done) => {
         *        const user = await User.findOne({where: { email }});
         *            if(!user) { 
         *                return done( null, false );
         *            }
         *            if(!user.isAdmin) { 
         *                return done( null, false );
         *            }
         *            if(!bcrypt.compareSync(password, user.password)) { 
         *                return done( null, false ); 
         *            }
         *            return done( null, user );
         *        } )
         *);
         */
    },

    protectRoute: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login?next=' + req.url);
    },

    idParamsRoute: (req, res, next) => {
        //console.log(req.params);
        //console.log(req.user.dataValues.id);
        if(req.isAuthenticated() && req.params.userId == req.user.dataValues.id) {
            return next();
        }
        res.redirect('/' );
    },

    /*
     *adminRoute: (req, res, next) => {
     *    if(req.isAuthenticated() ) {
     *        const user = req.user;
     *        isAdmin = await User.findOne( { where: {user.email} } ).isAdmin;
     *        return next();
     *    }
     *    res.redirect('/login?next=' + req.url);
     *},
     */

};
