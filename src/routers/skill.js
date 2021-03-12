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

    module.exports = router;