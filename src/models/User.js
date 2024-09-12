import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

let user = sequelize.define(
    'User',
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

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        // cpf
        rnp: {
            type: DataTypes.STRING(11),
            allowNull: false,
        },

        birthday: {
            type: DataTypes.DATEONLY,
        },

        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        // should be its own table
        gender: {
            type: DataTypes.ENUM('ML', 'FM', 'NB', 'NA'), // ML, FM, NB, NA
            allowNull: false,
        },

    },
    {

        sequelize,
        modelName: 'User',
        tableName: 'users',
        //indexes: [ { unique: true, fields [ 'email' ] } ],

    },
);

export { user as default };
