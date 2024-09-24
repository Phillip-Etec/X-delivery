import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import passport from 'passport';

export default {

    registerView: (req, res) => {
        res.render('register');
    },

    loginView: (req, res) => {
        res.render('login');
    },

    registerUser: async (req, res) => {
        const { name, email, password, cpf, birthday, gender } = req.body;
        // checar se todos os campos foram preenchidos
        if(!name || !email || !password) {
            return res.render('register', { error: 'Por favor, preencha todos os campos necessários' });
        }
        // checar se o email já está cadastrado
        if( await User.findOne( { where: {email} } ) ) {
            return res.render('register', { error: 'Um usuário com este endereço de e-mail já existe' });
        }
        let genderAcronym = genderToAcronym(gender);
        switch(gender) {
            case 'prefiro não informar':
                genderAcronym = 'NA';
                break;
            case 'não-binário':
                genderAcronym = 'NB';
                break;
            case 'feminino':
                genderAcronym = 'FM';
                break;
            case 'masculino':
                genderAcronym = 'ML';
                break;
            default:
                genderAcronym = 'NA';
        }
        const parseDate = (str) => {
            var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            return (m) ? new Date(m[3], m[2]-1, m[1]) : Date.now();
        }
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

function genderToAcronym( str ) {
    let genderAcronym = '';
    switch(str) {
        case 'prefiro não informar':
            genderAcronym = 'NA';
            break;
        case 'não-binário':
            genderAcronym = 'NB';
            break;
        case 'feminino':
            genderAcronym = 'FM';
            break;
        case 'masculino':
            genderAcronym = 'ML';
            break;
        default:
            genderAcronym = 'NA';
    }
    return genderAcronym;
}
