const express = require('express');

const router =express.Router();

const Skill=require('../model/Skills')
const User=require('../model/User');

router.post('/addskills',async(req,res)=>{
    const newSkill=new Skill(req.body);
     
    try{
        await newSkill.save()
        res.status(201).send(newSkill);
        }
        catch(err){
            res.status(500).send()
        }
    
    });

    router.post('/:id/addskill', async (req, res) => {
        const newSkill = new Skill(req.body);
        const  userId = req.params.id;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }
            newSkill.userId = user.id;
            await newSkill.save();
            res.status(201).send(newSkill);
        } catch (err) {
            res.status(500).send();
        }
    });
    router.post('/skills', async (req, res) => {
        
        try {
            const skill = await Skill.find({});
            res.send(skill);
        console.log(skill);
        } catch (error) {
            res.status(404).send({ error: 'Path not found' });
        }
    });
    router.post('/getskill', async (req,res) => {
       try{
           const skill=await Skill.find()
           const skilldetails= skill.map((e)=>{
               if(e.Title==req.body.Title){
                   return({
                    _id:e_id,
                    Title:e.Title,
                    Description:e.Description,
                    userId:e.userId
                   })
                  
               }
              })

           res.status(200).send(skilldetails)} 
        catch (err) {
        res.status(500).send("not found");
    }
    });
    
module.exports = router;