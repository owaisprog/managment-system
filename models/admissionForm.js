const {DataTypes} = require('sequelize')
const sequelize = require('../config/connection')





const AdmissionForm = sequelize.define('AdmissionForm',{

    Registration_No: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        unique: true
      },
      Admission_Date: {
        type: DataTypes.DATEONLY, 
        allowNull: true, // or false, depending on your requirements
        defaultValue: DataTypes.NOW, // Set a default value if needed
      },
    Class_Roll_No:{ 
        type: DataTypes.STRING,
        allowNull:true,
        },
    Student_Name:{
        type: DataTypes.STRING,
        allowNull:true
    },
    Date_of_Birth:{
        type: DataTypes.STRING,
        allowNull:true
    },
    Left_School:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    Remarks:{
        type: DataTypes.STRING,
        allowNull:true
    },
    Class:{
        type: DataTypes.STRING,
        allowNull:true
    },
    Age:{
        type: DataTypes.STRING,
        allowNull:true
    },
    Gender:{
        type: DataTypes.STRING,
        allowNull:true
    },
    Reason_to_Leave:{
        type: DataTypes.STRING,
        allowNull:true
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
    }

})

AdmissionForm.beforeCreate(async (admissionForm, options) => {
    if (!admissionForm.Registration_No) {
      const highestRegistration = await AdmissionForm.max('Registration_No', { where: {} });
      admissionForm.Registration_No = (parseInt(highestRegistration, 10) || 0) + 1;
    }
  });
  


module.exports = AdmissionForm