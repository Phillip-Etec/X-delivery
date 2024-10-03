import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { parseDate, genderToAcronym, dateStringRearrange } from '../helpers/common.js';
import assert from 'assert';

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
        catch (err) {
            console.error(`ERROR: ${err}\nON: ${err.stack}`);
        }
    },

    deleteUser: async (req, res) => {
        const user = req.user;
        //TODO: delete credit cards and 
        // addresses associated with the user
        try {
            await user.destroy();
            req.logout(() => res.redirect("/login?loggedout"));
        }
        catch (err) {
            console.error(`ERROR: ${err}\nON: ${err.stack}`);
        }
    },

    updateUserPassword: async (req, res) => {
        const user = req.user;
        //console.log(req.body);
        const { newPassword } = req.body;
        try {
            user.update({
                password: bcrypt.hashSync(newPassword, 8),
            });
            req.logout(() => res.redirect("/login?loggedout"));
        }
        catch (err) {
            console.error(`ERROR: ${err}\nON: ${err.stack}`);
        }
    },

};
