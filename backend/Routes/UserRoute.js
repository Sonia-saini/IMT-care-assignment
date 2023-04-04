const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usermodel } = require("../Models/Usermodel");
const { loginValidator } = require("../Middlewares/loginvalidate");
const { registerValidator } = require("../Middlewares/Registervalidate");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/register", registerValidator, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await Usermodel.find({ email });
    console.log(user.length > 0);
    if (user.length === 0) {
       let x=email.split("@");
          if(x[1]==="admin.com"){
            const user = new Usermodel({
              name,
              email,
              password: password,
              admin:true
            });
            await user.save();
          }
          else{
          const user = new Usermodel({
            name,
            email,
            password: password,
            admin:false
          });
          await user.save();
        }
          res.status(201).json({msg:"Registration Successful"});
       } else {
      res.json({msg:"this email id already exists"});
    }
  } catch (error) {
    console.log("Some Error occurred, unable to Register.");
    res.status(400).send("Some Error occurred, unable to Register.");
  }
});

userRouter.post("/login", loginValidator, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usermodel.findOne({ email });

    const hash_password = user.password;
    if (user && hash_password) {
      console.log(user, "login id", user._id);
      var token = jwt.sign({ userID: user._id }, process.env.key, {
        expiresIn: "24h",
      });
      
      
      res.status(200).json({
        msg: "LogIn successfully",
        token: token,
       user
        
      });
    }
  } catch (error) {
    res.status(400).send("Some Error occurred, unable to Login.");
    console.log(error);
  }
});


module.exports = { userRouter };
