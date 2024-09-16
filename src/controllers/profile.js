import bcrypt from "bcryptjs";
import User from "../models/User.js";

export default {
    profileView: (req, res) => {
        // don't foget to check if user is authenticated first
        //console.log( req );
        if (!req.isAuthenticated()) {
            res.redirect("/login?profilerequest");
        }
        // parse User info and pass as arguments
        let user_gender = "";
        switch (req.user.gender) {
            case "NA":
                user_gender = "prefiro não informar";
                break;
            case "NB":
                user_gender = "não-binário";
                break;
            case "FM":
                user_gender = "feminino";
                break;
            case "ML":
                user_gender = "masculino";
                break;
            default:
                user_gender = "deu ruim";
                break;
        }
        const date = req.user.birthday.toString();
        //console.log(`===================================================`);
        //console.log(`user: ${req.user.birthday}`);
        //console.log(`===================================================`);
        res.render("profile", {
            name: req.user.name,
            email: req.user.email,
            rnp: req.user.rnp,
            gender: user_gender,
            birthday: date,
        });
    },

    redirectToProfileView: (req, res) => {
        // check if req is autheticated
        if (!req.isAuthenticated()) {
            res.redirect("/login?profilerequest");
        }
        const id = req.user.id;
        res.redirect(`/profile/${id}`);
    },

    updateUserProfile: async (req, res) => {
        //console.log(req.body);
        //console.log("================ hit  ========");
        const user = req.user;
        const { name, email, rnp, birthday, gender } = req.body;
        let updated_gender,
            updated_birthday = "";
        // checar se todos os campos foram preenchidos
        if (!name || !email || !rnp || !birthday || !gender) {
            return res.render(`profile`, {
                updateError: "Por favor, preencha todos os campos necessários",
            });
        }
        // checar se o email já está cadastrado
        if (await User.findOne({ where: { email } })) {
            return res.render(`profile`, {
                updateError: "Um usuário com este endereço de e-mail já existe",
            });
        }
        updated_gender = genderToAcronym(gender);
        updated_birthday = parseDate(birthday);
        await user
            .update({
                name: req.body.name,
                email: req.body.email,
                rnp: req.body.cpf,
                birthday: updated_birthday,
                gender: updated_gender,
            })
            .then(() => { });
        res.redirect(`/profile/${user.id}`);
    },

    deleteUser: (req, res) => {
        //console.log("================ delete  ========");
        if (!req.isAuthenticated()) {
            //console.log('não estou autenticado');
        }
        //// está autenticado
        else {
            const user = req.user;
            //TODO: deletar cartões, endereços associados com o usuário
            user.destroy().then(() => {
                //req.
            });
        }
        req.logout(() => res.redirect("/login?loggedout"));
    },

    updateUserPassword: async (req, res) => {
        const user = req.user;
        //console.log(req.body);
        const { password, newPassword, renewPassword } = req.body;
        // checar se todos os campos foram preenchidos
        if (!password || !newPassword || !renewPassword) {
            return res.render(`profile`, {
                passwordError: "Por favor, preencha todos os campos necessários",
            });
        }
        // checar se a senha enviada é correta
        if (!bcrypt.compareSync(password, user.password)) {
            return res.render(`profile`, { passwordError: "Senha incorreta" });
        }
        // checar se a nova senha é a mesma à atual
        if (bcrypt.compareSync(newPassword, user.password)) {
            return res.render(`profile`, {
                passwordError: "Senha nova não pode ser a igual à senha atual",
            });
        }
        user.update({
            password: bcrypt.hashSync(newPassword, 8),
        });
        req.logout(() => res.redirect("/login?loggedout"));
    },
};

function genderToAcronym(str) {
    let genderAcronym = "";
    switch (str) {
        case "prefiro não informar":
            genderAcronym = "NA";
            break;
        case "não-binário":
            genderAcronym = "NB";
            break;
        case "feminino":
            genderAcronym = "FM";
            break;
        case "masculino":
            genderAcronym = "ML";
            break;
        default:
            genderAcronym = "NA";
    }
    return genderAcronym;
}

const parseDate = (str) => {
    if (str !== undefined) {
        var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        return m ? new Date(m[3], m[2] - 1, m[1]) : Date.now();
    } else {
        return Date.now();
    }
};
