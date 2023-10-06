const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection')
const AdmissionForm = require('./admissionForm')


const feeInfo = sequelize.define('feeInfo', {
 
    Monthly_Fee: {
        type: DataTypes.STRING,
        allowNull: true, // 
    },
    Discount: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Security_DEP: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Select_Area: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Net_Fee: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})



module.exports = feeInfo