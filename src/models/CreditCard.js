const { Sequelize, DataTypes } = require('sequelize');
const User = require('./User');
const sequelize = require('../db/database');

const CardModel = sequelize.define(
    'CreditCard',
    {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // should be its own table
        issuer: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // para o crypto.cipherIV
        number_iv: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        expiry: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        // para o crypto.cipherIV
        cvv_iv: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        cvv: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        //should be its own table, too
        // crédito, débito
        modality: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },

    },
    {

        sequelize,
        modelName: 'CreditCard',
        tableName: 'credit_cards',
        //indexes: [ { unique: true, fields [ 'email' ] } ],

    },
);

module.exports = CardModel;
