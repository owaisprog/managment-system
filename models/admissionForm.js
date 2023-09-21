const {DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

const AdmissionForm = sequelize.define('AdmissionForm',{
    Registration_No: {
        type: DataTypes.STRING,
        allowNull: false, // This field cannot be null
      },
    Admission_Date:{
        // type: DataTypes.DATE,
        type:DataTypes.STRING,
        allowNull:false,
        // defaultValue:DataTypes.NOW
    },
    Class_Roll_No:{ 
        // type: DataTypes.INTEGER,
        type: DataTypes.STRING,
        allowNull:false
    },
    Student_Name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Date_of_Birth:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Left_School:{
        type: DataTypes.STRING,
        allowNull:false,
        // defaultValue:DataTypes.NOW  
    },
    Remarks:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Class:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Father_Name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Age:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Gender:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Reason_to_Leave:{
        type: DataTypes.STRING,
        allowNull:false
    },
    // filename: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    //   },
})

module.exports = AdmissionForm