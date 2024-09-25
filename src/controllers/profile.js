import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { parseDate, genderToAcronym, dateStringRearrange } from '../helpers/common.js';

export default {
    profileView: (req, res) => {
        // parse User info and pass as arguments
        const user_gender = genderToAcronym(req.user.gender)
        const date = req.user.birthday.toString();
        res.render("profile", {
            name: req.user.name,
            email: req.user.email,
            rnp: req.user.rnp,
            gender: user_gender,
            birthday: dateStringRearrange(date),
        });
    },

    redirectToProfileView: (req, res) => {
        const id = req.user.id;
        res.redirect(`/profile/${id}`);
    },

    updateUserProfile: async (req, res) => {
        const user = req.user;
        const { name, email, rnp, birthday, gender } = req.body;
        let updated_gender,
            updated_birthday = "";
        
        updated_gender = genderToAcronym(gender);
        updated_birthday = parseDate(birthday);
        try {
            await user.update({
                name: name,
                email: email,
                rnp: rnp,
                birthday: updated_birthday,
                gender: updated_gender,
            })
            res.redirect(`/profile/${user.id}`);
        }
        catch(err) {
            process.stderr.write(`ERROR: ${err}`)
        }
    },

    deleteUser: async (req, res) => {
        const user = req.user;
        //TODO: deletar cartões, endereços associados com o usuário
        await user.destroy();
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

