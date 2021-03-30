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
		const user=await User.findOne({_id:req.body._id})
		
	}
	catch (error) {
		res.status(500)
	}
});

module.exports=router;

