
const express = require('express');
require('dotenv').config();
var nodemailer = require('nodemailer');

const router =express.Router();
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const User=require('../Model/User');
const { CreateToken } = require('../Middleware/Token');
const { checkPermission } = require('../Middleware/permission');
const { Auth, LoginCredentials } = require("two-step-auth");
const SERVICE_ID=process.env.SERVICE_ID
const ACCOUNT_SID=process.env.ACCOUNT_SID
const AUTH_TOKEN=process.env.AUTH_TOKEN
const client = require('twilio')(ACCOUNT_SID,AUTH_TOKEN);
const Verification= require('../Model/Verification')

console.log(process.env.ACCOUNT_SID)
// const mailgun = require("mailgun-js");
// const API="5f81dfa9359ffd562f3947a45686d95e-fa6e84b7-62f99bf9"
// const JWT_ACC="accountactivated"
// const CLIENT_URL="http://localhost3000"
// const DOMAIN = "sandboxa6a2595ae4dd414086926ece65d7d6a2.mailgun.org"
// const mg = mailgun({apiKey:API, domain:DOMAIN});




router.post('/addUser', async (req, res) => {
	const email =await  User.findOne({email_id:req.body.email_id})
console.log(email);
		 if (email === null ) {
			bcrypt.hash(req.body.password,10,(err,hashedPass)=>{
				if (err) {
					res.json({error:err})
				}
			
		const newUser = new User({
					user_name:req.body.user_name,
					email_id:req.body.email_id,
					password:hashedPass,
                    phoneNo:req.body.phoneNo,
					role:req.body.role
			})
			try {
					  console.log(newUser);
					 newUser.save()
					.then((e)=>res.status(201).send({data:e,message:"Registered successfully you will get verification mail"}))
					.catch((e)=>console.log(e));
					} catch (err) {
					res.status(500).send({error:err.message});
				}
		
			})
		 }
		
		else if(email.email_id === req.body.email_id || email.user_name === req.body.user_name){
           res.send({message:"email or userName already exits"})
		}
	

	
	
});


router.post('/login',(req,res)=>{
    var password=req.body.password
 
    User.findOne({$or:[{email_id:req.body.user},{phoneNo:req.body.user}]})
    .then(user=>{
        console.log(user)
        if(user.status==='Verified'){
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
                        message:'Invalid Password'
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

router.post('/allusers',async(req,res)=>{
    try{
const user=await User.find()
res.status(201).send(user)
    }
    catch(err) {
res.status(500).send({error:err.message})
    }
})
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

router.patch('/updateUser/:id',checkPermission(), async (req, res) => {
	
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdates = ['user_name','phoneNo','profile_picture','Education','Bio'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Operation' });
    }

    try {
        const user = await User.findById(req.params.id)
        console.log(user);
        if (!user) {
           
            return res.status(404).send({ error: 'user not found' });
        }
        updates.forEach((update) => {
            user[update] = req.body[update];
        });
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(500).send({error: err.message});
    }

});

router.post('/forgetPassword', async (req, res) => {
    const user =await  User.findOne({email_id:req.body.email_id})
    console.log(user);
        if(user.email_id === req.body.email_id){
            bcrypt.hash(req.body.password,10,(err,hashedPass)=>{
                if (err) {
                    res.json({error:err})
                }
            
        
                user.password = hashedPass
             try {
                    //   console.log(newUser);
                     user.save()
                    .then((e)=>res.status(201).send(e))
                    .catch((e)=>console.log(e));
                    } catch (err) {
                    res.status(500).send({error:err.message});
                }
            })
        }
        else{
            res.status(200).send({message:"email_id doesn't exist"});
        }
    

})

router.post('/adminVerification',async(req,res)=>{
	const post = await User.findOne({ email_id:req.body.email_id})
	const email = post.email_id;
	const name =  post.user_name;
	post.status = req.body.status
try {
	await post.save().catch(e=>console.log(e))
	if(post.status === 'Verified'){
		var transporter = nodemailer.createTransport({
			service: 'outlook',
			auth: {
				user: 'buildout2021@outlook.com',
				pass: 'Varalakshmi1$'
			}
		  });
		  console.log(email);
		  var mailOptions = {
			from: 'buildout2021@outlook.com',
			to: `${email}`,
			subject: 'Account verification',
			text: `Hi ${name} your account has been ${post.status}! you can post your idea's`
		  };
		  
		  transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			  console.log(error);
			} else {
			  console.log('Email sent: ' + info.response);
			}
		  });	
	}

} catch (err) {
	res.status(500).send({error:err.message});
}
res.status(201).send(post);
})
  


router.post('/logins',(req,res)=>{
    console.log(req.body)
    console.log(process.env)

    User.findOne({phoneNo:req.body.phoneNo})
    .then(user=>{
        console.log(user)
        
        if (user.phoneNo===req.body.phoneNo) {
            client
            .verify
            .services(SERVICE_ID)
            .verifications
            .create({
                to: `+${req.body.phoneNo}`,
                channel: req.body.channel==='call' ? 'call' : 'sms' 
            })
            .then(data => {
                res.status(200).send({
                    message: "Verification is sent!!",
                    phonenumber: req.body.phoneNo,
                    data
                })
            }) 
         }
         
         else {
            res.status(400).send({
                message: "Wrong phone number :",
                phonenumber: req.body.phonenumber,
                data
            })
         }

        
    })
});


// Verify Endpoint
router.post('/verify',(req,res)=>{
    console.log(req.body)
    User.findOne({phoneNo:req.body.phoneNo})
    .then(user=>{
        console.log(user)
        if (req.body.phoneNo && (req.body.code).length === 6) {
            client
                .verify
                .services(SERVICE_ID)
                .verificationChecks
                .create({
                    to: `+${req.body.phoneNo}`,
                    code: req.body.code
                })
                .then(data => {
                    if (data.status === "approved") {
                        let token = CreateToken(user)
                    console.log(token)

                        res.status(200).send({
                            message: "User is Verified!!",
                            data,token
                        });
                        token
                    }
              
                })
        } else {
            res.status(400).send({
                message: "Wrong phone number or code",
                phonenumber: req.body.phoneNo,
                data
            })
        }
        
         
        
        
    })
});


router.delete('/deleteuser/:_id', async (req, res) => {
    try {
        const user = await User.findById(req.params._id);
        if (!user) {
            return res.status(404).send({ error: 'user not found' });
        }
        user.remove()
        res.send({message:"Rejected"});

    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});


module.exports = router;