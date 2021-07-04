require('dotenv').config();
const express = require('express');

var nodemailer = require('nodemailer');


const router = express.Router();

const Verification=require('../Model/Verification');
const { checkPermission } = require('../Middleware/permission');




router.post('/verification', async (req, res) => {
	const verification = new Verification(req.body);
	try {
		await verification.save()
		.then((e)=>res.status(201).send(e))
		.catch((e)=>console.log(e));
		} catch (err) {
		res.status(500).send();
	}
});
router.post('/adminVerification',async(req,res)=>{
	const post = await Verification.findOne({ _id:req.body._id}).populate("user_id");
	const email = post.user_id.email_id;
	const name =  post.user_id.user_name;
	post.user_id = req.body.user_id,
	post.admin_id = req.body.admin_id,
	post.status = req.body.status
try {
	await post.save();
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
router.post('/getReq',checkPermission(),async(req,res)=>{
	const post = await Verification.find({}).populate('user_id').sort({createdAt: 'desc'});

try {
	
	res.status(201).send(post);
} catch (err) {
	res.status(500).send({error:err.message});
}
})

router.post('/status',async (req, res) => {
	
	try {
		const status = await Verification.findOne({user_id:req.body.user_id});
		if (!status) {
			return res.status(404).send({ error: 'Status not found' });
		}
		res.send(status);
	} catch (err) {
		res.status(500).send({ error: err.message});
	}
});
router.delete('/statusDelete/:id',async (req, res) => {
	
	try {
		const status = await Verification.findOneAndRemove({user_id:req.params.id});
		if (!status) {
			return res.status(404).send({ error: 'not found' });
		}
		res.send(status);
	} catch (err) {
		res.status(500).send({ error: err.message});
	}
});

module.exports = router;