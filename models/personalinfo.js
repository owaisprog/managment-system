const { DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

const personalInfo = sequelize.define('personalInfo', {

    Admission_to_Class: {
        type: DataTypes.STRING,
        allowNull: true, // This field cannot be null
    },
    Home_Address: {
        // type: DataTypes.DATE,
        type: DataTypes.STRING,
        allowNull: true,
        // defaultValue:DataTypes.NOW
    },
    Religion: {
        // type: DataTypes.INTEGER,
        type: DataTypes.STRING,
        allowNull: true
    },
    Health_issues: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Hobbies_Interest: {
        type: DataTypes.STRING,
        allowNull: true,
        // defaultValue:DataTypes.NOW  
    },
    L_school_Attended: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Leaving_reason: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Remedy: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Form_B_No: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Photographs: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Birth_Certificate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    School_Leaving_Certificate: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
    }

})






module.exports = personalInfo