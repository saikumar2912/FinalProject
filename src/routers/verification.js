const express = require('express');
const router = express.Router();
const User=require('../Model/User');
const Admin=require('../Model/Admin');

const Verification = require('../Model/Verification');


//1. admin profile
router.post('/verification', async (req, res) => {
	const verification = new Verification(req.body);
	try {
		await verification.save()
		.then((e)=>res.status(201).send({data:e}))
		.catch((e)=>console.log(e));
		} catch (err) {
		res.status(500).send();
	}
});

router.post('/user',async (req,res)=>{
	try{
		const user=await User.find({});
		const userdetails= user.map((e)=>{
			return{
				user_id:e._id,
				name:e.name,
				age:e.age,
				email:e.email,
				phone:e.phone,
				password:e.password
			}
		})
		if(user){

		}
		res.status(200).send({"user":userdetails})
	}
	catch (error) {
		res.status(500).send({ error: 'user not found' });
	}
});

module.exports = router;