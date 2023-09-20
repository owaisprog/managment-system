const jwt = require('jsonwebtoken');
// const Register = require('../models/mongoconn');

const auth = async (req, resp, next) => {
   try {
    const token = req.cookies.jwt;
    const verifyToken = jwt.verify(token, "thisismysecretekeyofthisproject");
    console.log(`verifyToken : ${verifyToken}`);
    next();
   } catch (error) {
     resp.status(401).render('login')
   }
}

module.exports = auth;
