const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection')
const AdmissionForm = require('./admissionForm')


const contactInfo = sequelize.define('contactInfo', {

    Father_Name: {
        type: DataTypes.STRING,
        allowNull: true, // This field cannot be null
    },
    Father_CNIC: {
        // type: DataTypes.DATE,
        type: DataTypes.STRING,
        allowNull: true,
        // defaultValue:DataTypes.NOW
    },
    Father_Phone: {
        // type: DataTypes.INTEGER,
        type: DataTypes.STRING,
        allowNull: true
    },
    Residence_Phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Father_Occupation: {
        type: DataTypes.STRING,
        allowNull: true,
        // defaultValue:DataTypes.NOW  
    },
    SMS_Mobile: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})



module.exports = contactInfo