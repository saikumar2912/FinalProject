const express = require('express');

const router =express.Router();
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const User=require('../Model/User');
const { CreateToken } = require('../Middleware/Token');
const { checkPermission } = require('../Middleware/permission');
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
            role:req.body.role
        })
        user.save()
        .then(res.status(201).send({message:"registered successfully"}))

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
                    let token = CreateToken(user)
                    console.log(token)
                    res.send({message:"login sucessful",
                            token});
                    token
                }else{
                    res.json({
                        message:'please enter the correct password'
                    })
                }
            })

        }else{
            res.json({
                message:"Not a valid user"
            })
        }
    })
});


router.post('/particularUser',checkPermission(), async (req, res) => {
	try {
	  const user = await User.findOne({_id:req.user_id});
	if(!user){
		res.status(404).send({error:"user not found"});
	}

		res.status(200).send(user).catch((e)=>console.log(e))
	 }
	
		
		 catch (err) {
			res.status(500).send({error:err.message});
		}
});



module.exports = router;