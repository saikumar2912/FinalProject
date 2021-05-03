const express = require('express');

const router =express.Router();
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const User=require('../Model/User');

router.post('/adduser',(req, res) => {
    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        const user=new User({
            user_name:req.body.user_name,
            email_id:req.body.email_id,
            phoneNo:req.body.phoneNo,
            password:hashedPass,
        })
        user.save()
        .then(res.status(201).send(user))

    })
});



router.post('/login',(req,res)=>{
    var email_id=req.body.email_id
    var password=req.body.password

    User.findOne({email_id:email_id})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token =jwt.sign({user_name:user.user_name},'verySecret',{expiresIn:'1h'})
                    res.send({message:"login sucessful",
                             _id:user._id,
                             user_name:user.user_name,
                             email_id:user.email_id,});
                    token
                }else{
                    res.json({
                        message:'password does not match'
                    })
                }
            })

        }else{
            res.json({
                message:"no user found"
            })
        }
    })
});


// const JWT = require("jsonwebtoken");
// const User = require("../models/User.model");
// const Token = require("../models/Token.model");
// const sendEmail = require("../utils/email/sendEmail");
// const crypto = require("crypto");
// const bcrypt = require("bcrypt");


// router.post('invaliduser');
// const signup = async (data) => {
//   let user = await User.findOne({ email: data.email });
//   if (user) {
//     throw new Error("Email already exist");
//   }
//   user = new User(data);
//   const token = JWT.sign({ id: user._id }, JWTSecret);
//   await user.save();
//   return (data = {
//     userId: user._id,
//     email: user.email,
//     name: user.name,
//     token: token,
//   });
// };

// const user = await User.findOne({ email });

//   if (!user) {
//       throw new Error("User does not exist");
//   }
//   let token = await Token.findOne({ userId: user._id });
//   if (token) { 
//         await token.deleteOne()
//   };

module.exports = router;