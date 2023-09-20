



const Sequelize = require('sequelize');

const dbName = 'managment';
const dbUser = 'root';
const dbPassword = 'safecare_89ba96c4';


const sequelize = new Sequelize(dbName,dbUser,dbPassword, {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
