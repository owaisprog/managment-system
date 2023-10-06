const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Import your Sequelize configuration
const jwt = require('jsonwebtoken')
const Managment = sequelize.define('registrations', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tokens: {
    type: DataTypes.JSON, // Use JSON data type to store an object
    allowNull: true, // You can set allowNull to true if the field can be null
  },
});

const secreteKey  = "thisismysecretekeyofthisproject"



Managment.prototype.generateAuthToken = async function () {
    try {
      const token = jwt.sign({ _id: this._id }, secreteKey);
  
      this.tokens = this.tokens || [];
  
      this.tokens = this.tokens.concat({ token: token });
  
      console.log(`token: ${token}`);
      await this.save();
      return token;
    } catch (error) {
      throw error;
    }
  };
  



module.exports = Managment;




