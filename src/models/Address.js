import { Sequelize, DataTypes } from 'sequelize';
import User from './User.js';
import sequelize from '../db/database.js';

let AddressModel = sequelize.define(
    'Address',
    {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            field: 'add_id'
        },

        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        alias: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        zip: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'zip_code'
        },

        addon: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'add_on'
        },

        // logradouro
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },


        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // should be its own table
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // should be its own table
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // should be its own table
        // bairro: neighbourhood? county? idk
        county: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // should be its own table
        region: {
            type: DataTypes.STRING(11),
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            },
        },

    },
    {

        sequelize,
        //modelName: 'Address',
        tableName: 'addresses',
        //indexes: [ { unique: true, fields [ 'email' ] } ],

    },
);

// relations

export { AddressModel as default };
