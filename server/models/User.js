const { DataTypes } = require('sequelize')
const conn = require('../db/conn')

const User = conn.define('Users',{

    id_user:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(220),
        allowNull: false,
        require: true,
    },
    sobrenome: {
        type: DataTypes.STRING(220),
        allowNull: false,
        require: true,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        require: true,
    },
    senha: {
        type: DataTypes.STRING(220),
        allowNull: false,
        require: true,
    },
    status: {
        type: DataTypes.STRING(1),
        allowNull: false,
        require: true,
    },
    telefone: {
        type: DataTypes.STRING(45),
        allowNull: false,
        require: true,
    },
    datacreate_user: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }

}, {timestamps: false, freezeTableName: true})

module.exports = User