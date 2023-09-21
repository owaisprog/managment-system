const express = require('express')
const router = express.Router()

// !!!!!!! setting contollers !!!!!
const {HanleHomePage, HanlesignupForm, HanleLoginForm,HandleAdmissionForm} = require('../controllers/usercontroller')


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


router.get('/',HanleHomePage)
router.post('/signup',HanlesignupForm)
router.post('/login',HanleLoginForm)
router.post('/studentAdmission',HandleAdmissionForm)


module.exports = router