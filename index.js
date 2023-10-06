const express = require('express')
const app  = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const sequelize = require('./config/connection')
const cors = require('cors')
const PORT  = process.env.PORT || 6000
require('dotenv').config();


// !!!!!!!!!!!!!!!!!!!!! dbconnection !!!!!!!!!

require('./config/connection')

// !!!!!! import routes !!!!!!!

const userrouter = require('./routes/routes')



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Body parsing middleware using body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Body parsing middleware using body-parser
app.use(cookieParser())


// parsing cors 

app.use(cors())


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.use('/api',userrouter)




sequelize.sync().then(() => {
    console.log("database connected")
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

