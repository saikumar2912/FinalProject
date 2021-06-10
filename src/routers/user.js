
const express = require('express');
require('dotenv').config();

const router =express.Router();
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const User=require('../Model/User');
const { CreateToken } = require('../Middleware/Token');
const { checkPermission } = require('../Middleware/permission');
const { Auth, LoginCredentials } = require("two-step-auth");
const SERVICE_ID="VA5f6e5373a57974e5da22f5b7e92a3ce3"
const ACCOUNT_SID="ACa96bbfb644ab21cc552c6159152896a0"
const AUTH_TOKEN="82394a4fbc66f3082f517d9a422aeebb"
const client = require('twilio')(ACCOUNT_SID,AUTH_TOKEN);


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


  

// router.post('/verify',async function login(emailId) {
//     const ress = await Auth(emailId);
//     // You can follow this approach,
//     // but the second approach is suggested,
//     // as the mails will be treated as important
//     const res = await Auth(emailId, "LOVE YOU");
//     console.log(ress);
//     console.log(ress.mail);
//     console.log(ress.OTP);
//     console.log(ress.success);

//   }
    

// )


// router.post('/verifyy',async(req,res)=>{
//         try {
//             const ress = await Auth("ksai4666@gmail.com", "Company Name");
//             console.log(ress);
//             console.log(ress.mail);
//             console.log(ress.OTP);
//             console.log(ress.success);
//         } catch (error) {
//             console.log(error)
//         }
//     console.log(Auth())
    
//     LoginCredentials.mailID = "ksai4666@gmail.com" //This should have less secure apps enabled
//     LoginCredentials.password = "Your password" // you can store them in your env variables and access them, it will work fine
//     LoginCredentials.use = true
    
// })

router.post('/logins',(req,res)=>{
    console.log(req.body)
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
                message: "Wrong phone number :(",
                phonenumber: req.body.phonenumber,
                data
            })
         }

        
    })
});


// Verify Endpoint
router.post('/verify', (req, res) => {
    console.log(req.body)
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
                    res.status(200).send({
                        message: "User is Verified!!",
                        data
                    })
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



// //to add movie
// router.post('/signup',(req,res)=>{
//     const {name,email,password,role}=req.body;
//     User.findOne({email}).exec((err,user)=>{
//         if(user){
//             return res.status(400).json({error:"already exits"});
//         }
// const token=jwt.sign({name,email,password,role},JWT_ACC,{expiresIn:'20m'})

//         const data = {
//             from: 'BuildOut@gmail.com',
//             to: email,
//             subject: 'ACCOUNT ACTIVATION SENT',
//             html:`<h2>please click the link to activate your account</h2> <p>${CLIENT_URL}/authentication/activate/${token} </p> `
//         };
//         mg.messages().send(data, function (error, body) {
//             if(error){
//                 return res.json({message:error.message})
//             }
//             return res.json({message:"Email has been send "})
//         });
//  })
// })
// router.post('/login',(req,res)=>{
//     const {token}=req.body;
//     if(token){
// jwt.verify(token,JWT_ACC,function(err,decodedToken){
//     if(err){
//         return res.status(400).json({error:"incorrect or expired link"})
//     }
//     const{name,email,password}=decodedToken;
//     User.findOne({email}).exec((err,user)=> {
//         if(user){
//         return res.status(400).json({error:"already exits"});
//     }
//     let newUser= new User({name,email,password});
//     newUser.save((err,success)=>{
//         if(err){
//          console.log("error in signup while activation",err);
//         return res.status(400),json({error:"error activating account"})
//       }
//       res.json({
//           message:"signup success"      
//         })
//     })
//     })
// })
//     }else{
//         return res.json({error:"something went wrong"})
//     }
// })









module.exports = router;