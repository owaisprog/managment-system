const bcrypt = require('bcrypt')
const multer = require('multer')


// getting user id through middleware 

const verifyToken = require('../middlewares/middleware')   


console.log("kjcnkdsjncsdck")


// importing user models here 

const signup = require('../models/signup')
const { admission_Form, personalInfo, contactInfo, feeInfo } = require('../association/asssociations')
// const personalInfoModel = require('../models/personalinfo')


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

async function HanleHomePage(req, res) {
  const message = "hello owais"
  res.send(message)
}


// !!!!!!!!!!!!!!!!!!!!!    signup contoller   !!!!!!!!!!!!!! 

async function HanlesignupForm(req, res) {
  try {
    const { name, email, phone, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database using Sequelize
    const newUser = await signup.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });



    // Generate an authentication token and set it as a cookie
    const token = await newUser.generateAuthToken();

    // Set the JWT token as a cookie (assuming you are using JWT)
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 300000),
      httpOnly: true,
    });

    // Send a success response
    console.log("commit test")
    console.log(`sign-up succesful : ${newUser}`)
    res.status(201).json({ message: 'Sign-up successful', user: newUser });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Server error. Please try again later.' }); // Send a user-friendly error message
  }
}



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// !!!!!!!!!!!!!!!!!!!!!!!!!  login controller  !!!!!!!!!!!!!!!!!!! 

async function HanleLoginForm(req, resp) {

  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await signup.findOne({ where: { email } })




    if (!user) {
      return resp.json({ error: "invalid email " })
    }

    const passwordauth = await bcrypt.compare(password, user.password)
    const token = await user.generateAuthToken();

    resp.cookie('jwt', token, {
      expires: new Date(Date.now() + 300000),
      httpOnly: true
    })

    console.log(user)
    if (!passwordauth) {
      return resp.json({ error: "invalid password" })
    }

    console.log(`token: ${token}`);



    resp.status(201).json({ message: "Login successful", token });


  } catch (error) {
    console.error(error);
    resp.status(400).send("An error occurred during login.");
  }


}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




// multer configuration



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './upload')
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`)
  },
})


const upload = multer({ storage }).single('profileimg')


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! handle admission form  !!!!!!!!!!!!!!!!!!!!1

async function HandleAdmissionForm(req, res) {

  try {
    const {
      Registration_No,
      Admission_Date,
      Class_Roll_No,
      Student_Name,
      Date_of_Birth,
      Left_School,
      Remarks,
      Class,
      Age,
      Gender,
      Reason_to_Leave,
      Admission_to_Class,
      Home_Address,
      Religion,
      Health_issues,
      Hobbies_Interest,
      L_school_Attended,
      Leaving_reason,
      Remedy,
      Form_B_No,
      Photographs,
      Birth_Certificate,
      School_Leaving_Certificate,
      Father_Name,
      Father_CNIC,
      Father_Phone,
      Residence_Phone,
      Father_Occupation,
      SMS_Mobile,
      Monthly_Fee,
      Discount,
      Security_DEP,
      Select_Area,
      Net_Fee,
    } = req.body;



    const filename = req.file;


    // const userId = req.userId;


    let existingUser = await admission_Form.findOne({
      where: { Registration_No },
    });


    if (existingUser) {



      await admission_Form.update({
        Registration_No,
        Admission_Date,
        Class_Roll_No,
        Student_Name,
        Date_of_Birth,
        Left_School,
        Remarks,
        Class,
        Age,
        Gender,
        Reason_to_Leave,
        filename
      },
        {
          where: { Registration_No } // Specify the where clause
        }
      )


      console.log('Admission data save successful');
      res.status(201).json({ message: "Admission data update successfully" });



    } else {
 

      let status = 'active'

      // Create the AdmissionForm record
      const admissionFormData = await admission_Form.create({
        Registration_No,
        Admission_Date,
        Class_Roll_No,
        Student_Name,
        Date_of_Birth,
        Left_School,
        Remarks,
        Class,
        Age,
        Gender,
        Reason_to_Leave,
        status,
        filename
        // registerUser_id:userId
      }

      );

      // Create the associated PersonalInfo record
      const personalInfoData = await personalInfo.create({
        admissionFormId: admissionFormData.id, // Set the foreign key correctly
        Admission_to_Class,
        Home_Address,
        Religion,
        Health_issues,
        Hobbies_Interest,
        L_school_Attended,
        Leaving_reason,
        Remedy,
        Form_B_No,
        Photographs,
        Birth_Certificate,
        School_Leaving_Certificate,
        status
      });

      // Create the associated ContactInfo record
      const contactInfoData = await contactInfo.create({
        admissionFormId: admissionFormData.id, // Set the foreign key correctly
        Father_Name,
        Father_CNIC,
        Father_Phone,
        Residence_Phone,
        Father_Occupation,
        SMS_Mobile,
        status
      });

      // Create the associated FeeInfo record
      const feeinfoData = await feeInfo.create({
        admissionFormId: admissionFormData.id, // Set the foreign key correctly
        Monthly_Fee,
        Discount,
        Security_DEP,
        Select_Area,
        Net_Fee,
        status
      });

      console.log('Admission data save successful');
      res.status(201).json({ personalInfoData, contactInfoData, feeinfoData });



    }

  } catch (error) {
    // Handle errors
    console.log('Error creating admission form:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// !!!!!!!!!!!!!!!!!!!!!!!!!! handle searchUser form  !!!!!!!!!!!!!!!!!!!!

async function handleSearchUser(req, res) {
  const Registration_No = req.params.Registration_No;

  try {
    const user = await admission_Form.findOne({
      where: { Registration_No },
      include: [
        { model: personalInfo },
        { model: contactInfo },
        { model: feeInfo },
      ],
    });

    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// !!!!!!!!!!!!!!! get all user controller !!!!!!!!!!



async function handleAllUserData(req, res) {
  try {

    const user = await admission_Form.findAll({
      include: [
        { model: personalInfo },
        { model: contactInfo },
        { model: feeInfo },
      ],
      where: {
        status: 'unActive' // Filter by the 'status' field with the value 'active'
      }
    });

    res.status(201).json(user)

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}



// ````````````````````````````````````````````````````````````````````````````

// !!!!!!!!!!!!!!! delete user controller !!!!!!!!!!


async function handleDeleteUser(req, res) {
  try {

    const userId = req.params.id

    const user = await admission_Form.findByPk(userId,{
      include: [
        { model: personalInfo },
        { model: contactInfo },
        { model: feeInfo },
      ],
  })

    if (!user) {
      res.status(404).json({ error: 'user not found' })
    }


     await user.update({
      status : 'unActive'
    })
     await user.personalInfo.update({
      status : 'unActive'
    })
    await user.contactInfo.update({
      status: 'unActive'
    })
    await user.feeInfo.update({
      status: 'unActive'
    })

    res.status(201).json({ message: 'user delete successfully' })

  } catch (error) {
    console.log(`error : ${error}`)
    res.status(404).json({ message: 'internal server error' })
  }
}



// ''''''''''''''''''''''''    exporting all controllers    '''''''''''''''''

module.exports = {
  HanleHomePage,
  HanlesignupForm,
  HanleLoginForm,
  HandleAdmissionForm,
  handleSearchUser,
  upload,
  handleAllUserData,
  handleDeleteUser,
}