const express = require('express');

const router =express.Router();

const Skill=require('../Model/Skill')
const Bit =require('../Model/Bit')
  //add a skill
    router.post('/addskill', async (req, res) => {
        //const newskill = new Skill(req.body);
	try {
		const skill1=await Skill.create(req.body);
        res.send(skill1)
	} catch (err) {
		res.status(500).send();
	}
       });  

    //to display all skills   
    router.post('/skills', async (req, res) => {
        
        try {
            const skill = await Skill.find({});
            res.send(skill);
        console.log(skill);
        } catch (error) {
            res.status(404).send({ error: 'Path not found' });
        }
    });

    //to display skill using id
    router.post('/id_skill', async (req, res) => {
        
        try {
            const skill = await Skill.findById({_id:req.body._id});
            res.send(skill);
        console.log(skill);
        } catch (error) {
            res.status(404).send({ error: 'Path not found' });
        }
    });

    //to get skill count
    router.post('/totalcounts',async (req,res)=>{
        try{
            const skill=await Skill.find({});
            const count=skill.length;
            console.log(count);
            res.status(200).send({"Total Skills":count})
        }
        
        catch (error) {
            res.status(500).send({ error: 'bit not found' });
        }
    });
    // skill id count
    router.post('/count',async (req,res)=>{
        try{
            const skill=await Skill.find({_id:req.body._id});
            const count=skill.length;
            const skilldetails= skill.map((e)=>{
                return{
                       _id:e._id,
                       Title:e.Title,
                       Description:e.Description
                }

            })
            
            console.log(count);
            res.status(200).send({"skills":skilldetails,"Total Skill Bits":count})
        }
        
        catch (error) {
            res.status(500).send({ error: 'skill not found' });
        }
    });
    

    
module.exports = router;