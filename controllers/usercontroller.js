const bcrypt = require('bcrypt')


// importing user models here 

const usermodel = require('../models/userModels')


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

async function HanleHomePage(req,res){
    const message = "hello owais"
    res.send(message)
}

async function HanlesignupForm(req, resp) {
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
    resp.cookie('jwt', token, {
      expires: new Date(Date.now() + 300000),
      httpOnly: true,
    });

    // Send a success response
    console.log("commit test")
    console.log(`sign-up succesful : ${newUser}`)
    resp.status(201).json({ message: 'Sign-up successful',  newUser });
  } catch (error) {
    console.error(error); // Log the error for debugging
    resp.status(500).json({ error: 'Server error. Please try again later.' }); // Send a user-friendly error message
  }
}

module.exports = HanlesignupForm;





async function HanleLoginForm(req,resp){

    try {
        const email =  req.body.email;
       const password = req.body.password;
    
      const user = await usermodel.findOne({email})
   
  
      

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

module.exports = {
    HanleHomePage,
    HanlesignupForm,
    HanleLoginForm,
}