const express = require ('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "my token number";

// Route 1:Create User Using Post : "api/auth/createuser" Dosent rqquired auth createuser " .No login required
router.post('/createuser',[
  body('name',"Enter a vaild name").isLength({ min: 3 }),
  body('email',"Enter a vaild email").isEmail(),
  body('password',"password must be 5 chartecers").isLength({ min: 5 }),
],async (req,res)=>{

  // If there are errors , return Bad request and the errors
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // chek wheather the user with this email exists already
    try {
     let user =  await User.findOne({email:req.body.email});
     //console.log(user)
     if(user){
      return res.status(400).json({errors:"sorry the user already exists"})
     }
     const salt = await bcrypt.genSalt(10); // solat genreate 
    const secpassword = await bcrypt.hash(req.body.password,salt);

      user = await User.create({
      name: req.body.name,
      email:req.body.email,  
      password: secpassword, // variable
    }) 
    // create object
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken =jwt.sign (data,JWT_SECRET)
      //console.log(authtoken)
         res.json({authtoken})
  
     //res.json(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured")
    }
})  

//=====================================================================================================================

// Route 2: Authication a User Using Post : "api/auth/login" Dosent rqquired auth createuser " .No login required

router.post('/login',[
   body('email',"Enter a vaild email").isEmail(),
  body('password',"password cannot be balnk").exists(),
],async (req,res)=>{

    // If there are errors , return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
   // exist user
  const {email,password}=req.body 
  try {
    let user =  await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"please try agian login"})
      }
      // password compare 
      let passwordcompare= await bcrypt.compare(password,user.password)
        if(!passwordcompare){
           return res.status(400).json({error:"please try agian login"})
        }

        // Create object mokali if password correct
        const data= {
          user:{
            id:user.id
          }
        } 
        const authtoken = jwt.sign(data,JWT_SECRET)
        res.json({authtoken})

  } catch (error) {
     console.error(error.message);
     res.status(400).json("Internal servar Error")

    
  }
})

//===========================================================================================================

// Route 3: Get loggin User Detalis using: post "/api/auth/getuser". login required
router.post('/getuser',fetchuser, async (req,res)=>{
   try {
      userId=req.user.id;
     const user = await User.findById(userId).select("-password");
     res.send(user)
   } catch (error) {
      console.error({error:message});
      res.status(400).send ("please try agian login");
   }

})
    
module.exports= router 