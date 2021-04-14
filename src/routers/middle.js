const express = require('express');

const router =express.Router();
const Middle = require('../Model/Middle')
const User=require('../Model/User');
const Skill=require('../Model/Skill')

// TO ADD A USER AND ADMIN IN A MIDDLEWARE

router.post('/addskill', async (req, res) => {
	//const newskill = new Skill(req.body);
try {
	const skill1=await Middle.create(req.body);
	res.send(skill1)
} catch (err) {
	res.status(500).send("not found");
}
   }); 
   
  router.post('/getskill',async (req,res)=>{
	try{
		const user=await Skill.find({user_id:req.body.user_id})
		console.log(user);
		const skill=user.map((e)=>{
			return{
				Title:e.Title
			}
		})
		res.send(skill)
		

	}
	catch (error) {
		res.status(500).send({error:'error message'})
	}
});

module.exports=router;

