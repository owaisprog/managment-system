const bcrypt = require('bcrypt')
const multer = require('multer')


// importing user models here 

const usermodel = require('../models/userModels')
const admissionFormModel = require('../models/admissionForm')


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

async function HanleHomePage(req,res){
    const message = "hello owais"
    res.send(message)
}


// signup contoller 

async function HanlesignupForm(req, res) {
  try {
    const { name, email, phone, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database using Sequelize
    const newUser = await usermodel.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });



    // Generate an authentication token and set it as a cookie
    const token = await newUser.generateAuthToken();

    // Set the JWT token as a cookie (assuming you are using JWT)
    res.cookie('jwt', token, {
      // expires: new Date(Date.now() + 300000),
      httpOnly: true,
    });

    // Send a success response
    console.log("commit test")
    console.log(`sign-up succesful : ${newUser}`)
    res.status(201).json({ message: 'Sign-up successful',  user: newUser });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Server error. Please try again later.' }); // Send a user-friendly error message
  }
}




// login controller 

async function HanleLoginForm(req,resp){

    try {
        const email =  req.body.email;
       const password = req.body.password;
    
      const user = await usermodel.findOne({ where: { email } })
   
  
      

      if(!user){
       return resp.json({error:"invalid email "})
      }
     
      const passwordauth = await bcrypt.compare(password, user.password)
      const token = await user.generateAuthToken();
   
      resp.cookie('jwt',token,{
       expires:new Date(Date.now() + 300000),
       httpOnly:true
     })
   
      console.log(user)
      if(!passwordauth){
       return resp.json({error:"invalid password"})
      }
   
      console.log(`token: ${token}`);
   
   
      
      // resp.status(201).json("login successFull")
      resp.status(201).json({ message: "Login successful", token });

   
    } catch (error) {
      console.error(error); // Log the actual error for debugging purposes
      resp.status(400).send("An error occurred during login.");
    }
    

}


// multer configuration



const storage = multer.diskStorage({
  destination: function(req,file,cb){
      return cb(null,"./upload")
  },
  filename: function(req,file,cb){
      return cb(null,`${Date.now()}-${file.originalname}`)
  },
})


const upload = multer({storage})



// admission_Form controller 

async function HandleAdmissionForm(req,res){

  
  try{


    const  { Registration_No, Admission_Date, Class_Roll_No, Student_Name, Date_of_Birth, Left_School, Remarks, Class, Father_Name, Age, Gender, Reason_to_Leave,} = req.body

    // const {filename} = req.file
   
   const AdmissionFormData = await admissionFormModel.create({
    Registration_No,
    Admission_Date,
    Class_Roll_No,
    Student_Name,
    Date_of_Birth,
    Left_School,
    Remarks,
    Class,
    Father_Name,
    Age,
    Gender,
    Reason_to_Leave,
    // filename
   })
  

   console.log(`admission data save succesful : ${AdmissionFormData}`)
    res.status(201).json(AdmissionFormData);


  }catch (error) {
    // Handle errors
    console.log('Error creating admission form:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
module.exports = {
    HanleHomePage,
    HanlesignupForm,
    HanleLoginForm,
    HandleAdmissionForm,
}