const express = require('express');

const router =express.Router();
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const Admin=require('../Model/Admin');

// ADDMIN REGISTER
router.post('/',(req, res) => {
    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            require.json({
                error:err
            })
        }
        const admin=new Admin({
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPass
        })
        admin.save()
        .then(res.status(201).send(admin))

    })
});

// ADMIN LOGIN
router.post('/login',(req,res)=>{
    var username=req.body.username
    var password=req.body.password

    Admin.findOne({email:username})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token =jwt.sign({name:user.name},'verySecret',{expiresIn:'1h'})
                    res.send("login sucessful");
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
module.exports = router;