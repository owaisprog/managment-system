const express = require('express')
const router = express.Router()

// !!!!!!! setting contollers !!!!!
const {HanleHomePage, HanlesignupForm, HanleLoginForm} = require('../controllers/usercontroller')


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


router.get('/',HanleHomePage)
router.post('/signup',HanlesignupForm)
router.post('/login',HanleLoginForm)


module.exports = router