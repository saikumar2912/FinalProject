const express = require('express');

const router =express.Router();
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const User=require('../model/User');
router.post('/',(req, res) => {
    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            require.json({
                error:err
            })
        }
        const user=new User({
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPass
        })
        user.save()
        .then(res.status(201).send('user added successfully'))

    })
});


router.post('/login',(req,res)=>{
    var username=req.body.username
    var password=req.body.password

    User.findOne({email:username})
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

router.post('/getuser',async (req,res)=>{
    try{
        const user = await User.find()
        const userdetails=user.map((e)=>{
            if(e._id==req.body._id){
                return({
                    _id:e._id,
                        name:e.name,
                        age:e.age,
                        email:e.email,
                        password:e.password,
                        skill:[]
                 })
            }
        })
        
          res.status(200).send(userdetails)
        }
        
        catch (err) {
			res.status(500).send("not found");
		}

});

module.exports = router;