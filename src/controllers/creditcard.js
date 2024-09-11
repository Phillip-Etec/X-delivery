//const bcrypt = require('bcrypt')
const { encrypt, decrypt } = require('../functions/encrypt');
const CreditCard = require('../models/CreditCard');
const { User } = require('../models/User');

module.exports = {

    creditCardView: (req, res) => {
        const user = req.user;
        const empty = [];
        let no_cards_found = false;
        let responseArray ;
        CreditCard.findAndCountAll( {
            where: { user_id: user.id },
        } ).then
        ((results ) => 
            {
                console.log(typeof( results.rows ));
                if(results.count === 0) {
                    no_cards_found = true;
                    responseArray = [];
                } else { 
                    no_cards_found = false; 
                    responseArray = results.rows;
                } 
            }
        )
        
        //TODO: decrypt credit card details before sending them
        /*
         *for( let i=0; i<responseArray.length; i++ ) {
         *    responseArray[i].number = decrypt( responseArray[i].number );
         *    responseArray[i].cvv = decrypt( responseArray[i].cvv );
         *}
         */
        console.log(responseArray)
        if ( no_cards_found ) {
            res.render('creditcardadd', {
                noplasticmoney: no_cards_found,
                responseArray: empty,
            });
        } else {
            res.render('creditcardadd', {
                noplasticmoney: no_cards_found,
                responseArray: [],
            });
        }
    },

    creditCardFormView: (req, res) => {
        //TODO
        res.render('cardform');
    },

    redirectToCreditCardView: (req, res) => {
        const id = req.user.id;
        res.redirect(`plasticmoney/${id}`)
    },

    addCreditCard: async (req, res) => {
        const { name, issuer, number, expiry, cvv, modality } = req.body;
        // checar se todos os campos foram preenchidos
        if(!name || !issuer || !number || !expiry || !cvv || !modality ) {
            return res.json({ success: false, error: 'por favor, preencha todos os campos necessários' });
        }
        if( await CreditCard.findOne( { where: { number: number } } ) ) {
            return res.json({ success: false, error: 'um cartão com este número já está cadastrado' });
        }
        //TODO: find issuer and modality id before inserting;
        enc_number = encrypt(number);
        enc_cvv = encrypt(cvv);
        await CreditCard.create( {
            name: name,
            issuer: issuer,
            number_iv: enc_number.iv,
            number: enc_number.encryptedData,
            expiry: parseDate(expiry),
            cvv_iv: enc_cvv.iv,
            cvv: enc_cvv.encryptedData,
            modality: modality,
            user_id : req.user.id,
        } );
        res.json( { success: true } );
    },

    updateCreditCard: async (req, res) => {
        const { name, issuer, number, expiry, cvv, modality, new_number } = req.body;
        let cardFound = false;
        let creditCard;
        if(!name || !issuer || !number || !expiry || !cvv || !modality || !new_number ) {
            return res.render(`/placeholder/url/`, { error: 'por favor, preencha todos os campos necessários' });
        }
        cards = await CreditCard.findAll( {
            where: { user_id: req.user.id }
        } );

        if( !cards ) {
            res.redirect('/plasticmoney', { error: 'Você não tem nenhum cartão registrado' });
        }
        for( card in cards ) {
            if( decrypt({iv: card.number_iv, encryptedData: card.number}) === number ) {
                cardFound = true;
                creditCard = card;
                break;
            }
        }
        
        if ( !cardFound ) {
            res.redirect('/plasticmoney', { error: 'Você não tem nenhum cartão registrado com este número' });
        }
        else {
            creditCard.update( {
                name: name,
                issuer: issuer,
                number: encrypt( new_number ),
                expiry: parseDate(expiry),
                cvv: encrypt( cvv, 8 ),
                modality: modality,
                user_id : req.user.id,
            } );
            res.redirect('');
        }
    },

    deleteCreditCard: (req, res) => {
        const { number } = req.body;
        cards = CreditCard.findAll( {
            where: { user_id: req.user.id }
        } )
        if( !cards ) {
            res.redirect('/plasticmoney', { error: 'Você não tem nenhum cartão registrado' });
        }
        for( card in cards ) {
            if( decrypt({iv: card.number_iv, encryptedData: card.number}) === number ) {
                cardFound = true;
                creditCard = card;
                break;
            }
        }

        if ( !cardFound ) {
            res.redirect('/plasticmoney', { error: 'Você não tem nenhum cartão registrado com este número' });
        }
        else {
            creditCard.destroy().
                then( res.redirect('') );
            
        }
        res.redirect('');
    },

};

const parseDate = (str) => {
    var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    return (m) ? new Date(m[3], m[2]-1, m[1]) : Date.now();
}
