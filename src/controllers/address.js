import User from '../models/User.js';

export default {

    addressView: (req, res) => {
        //TODO
        res.render('address', {
            //addresses array
        });
    },

    addressFormView: (req, res) => {
        //TODO
        res.render('addressform');
    },

    redirectToAddressView: (req, res) => {
        //TODO
        res.redirect('placeholder/url')

    },

    addUserAddress: async (req, res) => {
        //TODO
        const { type, alias, zip, number, addon, street, city, state, county, region } = req.body;
        // checar se todos os campos foram preenchidos
        if( !type|| !alias|| !zip|| !number|| !addon|| !street|| !city|| !state|| !county|| !region ) {
            return res.render(`/placeholder/url/`, { error: 'por favor, preencha todos os campos necessários' });
        }
        await Address.create( {
            type    : type   ,
            alias   : alias  ,
            zip     : zip    ,
            number  : number ,
            addon   : addon  ,
            street  : street ,
            city    : city   ,
            state   : state  ,
            county  : county ,
            region  : region ,
            user_id : req.user.id,
        } );
        res.redirect('placeholder/url');
    },

    updateUserAddress: async (req, res) => {
        //TODO
        res.redirect('');
    },

    deleteUserAddress: (req, res) => {
        //TODO
       res.redirect('');
    },

};

