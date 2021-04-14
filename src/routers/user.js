const express = require('express');
const cors=require('cors');

const router =express.Router();
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const User=require('../Model/User');
const bodyParser=require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json(strict=true))


outer.post('/',(req, res) => {
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
        .then(res.status(201).send(user))

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

module.exports = router;