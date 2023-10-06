const express = require('express')
const router = express.Router()

// !!!!!!! setting contollers !!!!!
const {HanleHomePage, HanlesignupForm, HanleLoginForm,HandleAdmissionForm, handleSearchUser, upload, handleAllUserData, handleDeleteUser} = require('../controllers/usercontroller')


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// getting user id thorugh middleware


const verifyToken = require('../middlewares/middleware')




router.get('/',HanleHomePage)
router.post('/signup',HanlesignupForm)
router.post('/login',HanleLoginForm)
router.post('/studentAdmission',upload,HandleAdmissionForm)
router.get('/studentSearch/:Registration_No',handleSearchUser)
router.get("/getAllUser",handleAllUserData)
router.delete('/deleteUser/:id',handleDeleteUser)
// router.post('/studentPersonalInfoForm',HandlePersonalInfoForm)
// router.post('/studentContactInfoForm',handleContactInfoForm)
// router.post('/studentfeeInfoForm',handlefeeInfoForm)


module.exports = router