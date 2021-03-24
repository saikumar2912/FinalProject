const express = require('express');
const router =express.Router();
const Bit =require('../Model/Bit');
const Skill=require('../Model/Skill')

//to ADD BIT
	router.post('/addbit', async (req, res) => {
        const newbit = new Bit(req.body);
	try {
		await newbit.save()
		.then((e)=>res.status(201).send({data:e}))
		.catch((e)=> console.log(e))
	} catch (err) {
		res.status(500).send(newbit);
	}
});
// TO GET BIT DETAILS
router.post('/getbit',async (req,res) =>{
	try{
		const skill=await Skill.find({_id:req.body._id})
		const skilldetails= skill.map((e)=>{
			return{
				   skill_id:e._id,
				   Title:e.Title,
				   Description:e.Description,
				   bit:[]
			}
		})

	   const bit=await Bit.find()
	   const bitdetails=bit.map((e)=>{
		return{
			bit_id:e._id,
			Title:e.title,
			Description:e.Description,
			content:[]
	 }
	   })
	  //console.log(bitdetails)
	  skilldetails.map((s)=>{
		  console.log(s)
		  bitdetails.map((c)=>{
			console.log(c)
			  if(s._id === c.skill_id) {
				  s.bit.push(c)
			  }
		  })
	  })
	  //console.log(skilldetails);
	  res.send(skilldetails)
	   
	}

	catch (error) {
		res.status(404).send({ error: 'Skill not found' });
	}
});
//to get bit using id
router.post('/id_bit',async(req,res)=>{
	try{
		const newbit=await Bit.findById({_id:req.body.id});
		res.status(200).send(newbit);
	}
	catch(error){
		res.status(404).send({error:'Invalid Bit ID'})

	}
});
//to get total bits count
router.post('/count',async (req,res)=>{
	try{
		const bit=await Bit.find({});
		const count=bit.length;
		console.log(count);
		res.status(200).send({"Total Bits":count})
	}
	
	catch (error) {
		res.status(500).send({ error: 'bit not found' });
	}
});

//skill id to get bit details
router.post('/newskill',async (req,res)=>{
	try{
		const bit=await Bit.find({skill_id:req.body.skill_id});
		const bitdetails= bit.map((e)=>{
			return{
				   bit_id:e._id,
				   title:e.title,
				   Description:e.Description
			}
		})
		res.status(200).send({"bits":bitdetails})
	}
	catch (error) {
		res.status(500).send({ error: 'bit not found' });
	}
});

module.exports = router;