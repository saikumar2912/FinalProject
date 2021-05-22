const express = require('express');
const {checkPermission}=require('../Middleware/permission')
const router =express.Router();

const User =require('../Model/User')
const Skill=require('../Model/Skill')
const Bit =require('../Model/Bit')
  //add a skill
 
 
  router.post('/addskill', async (req, res) => {
try {
    const newskill = new Skill(req.body);

    await newskill.save()
    .then((e)=>res.status(201).send({data:e}))
} 
catch (err) {
    res.status(404).send({err:"invalid data"});
}
}); 
// router.post('/adduser',async(req,res)=>{

//     try{
//         const adduse= new Skill.find({});
//     }
// })

    //to display all skills   
    router.post('/skills', async (req, res) => {
        
        try {
            const skill = await Skill.find({});
            res.send(skill);
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
    // skill id to count to bits presented
    router.post('/count',async (req,res)=>{
        try{
            const skill=await Bit.find({skill_id:req.body.skill_id});
            const count=skill.length;
            
            console.log(count);
            res.status(200).send({"Total Skill Bits":count})
        }
        
        catch (error) {
            res.status(500).send({ error: 'skill not found' });
        }
    });


    router.post('/newuser',async (req,res)=>{
        try{
            const user=await Skill.find({user_id:req.body.user_id});
            const userdetails= user.map((e)=>{
                return{
                       user_id:e._id,
                       title:e.Title,
                       Description:e.Description
                }
            })
            res.status(200).send({"user":userdetails})
        }
        catch (error) {
            res.status(500).send({ error: 'user not found' });
        }
    });
   
    router.post('/getskill',async (req,res)=>{
        try{
            const user=await Skill.find({followers:req.body.user_id})
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
    router.post('/userskills',async (req,res)=>{
        try{
            const skill=await Skill.find({followers:req.body.user_id});
            const skilldetails= skill.map((e)=>{
                return{
                       user_id:e.user_id,
                       skill_id:e._id,
                       title:e.Title,
                       Description:e.Description
                }
            })
            res.status(200).send({"skills":skilldetails})
            console.log(skill)
        }
        catch (error) {
            res.status(500).send({ error: 'skill not found' });
        }
    });

    router.get('/allusers',(req,res)=>{
        Skill.find()
        .populate("followers","_id user_name")
        .then((skills)=>{
            res.send(skills)
        }).catch(err=>{
            console.log(err)
        })
        
    })
    router.get('/userskills',(req,res)=>{
        Skill.find({followers:req.body._id})
        .populate("followers")
        .then((skills)=>{
            res.send(skills.followers)
        }).catch(err=>{
            console.log(err)
            res.status(404).send({message:"not followed any skill"})
        })
        
    })
    
  //delete a skill
    router.delete('/deleteskill/:id', async (req, res) => {
        try {
            const skill = await Skill.findById(req.params.id);
            if (!skill) {
                return res.status(404).send({ error: 'skill not found' });
            }
            skill.remove()
            res.send(skill);

        } catch (error) {
            res.status(500).send({ error: 'Internal server error' });
        }
    });
    
    router.post('/follow',async(req,res)=>{
		const skill = await Skill.findOne({ _id:req.body._id});
        console.log(skill)
		const user = req.body.user_id
        console.log(user)
	    const follow = skill.followers.includes(user)
	console.log(follow);
	if (follow === true) {
		skill.followers.remove(user)
    }
	else{
		skill.followers.push(user)
	}
	try {
		await skill.save();
		res.status(201).send(skill);
	} catch (err) {
		res.status(500).send("invalid skill")
    }})
    
    router.post('/unfollow',checkPermission(),async(req,res)=>{
		const skill = await Skill.findOne({ _id:req.body._id});
        console.log(skill)
		const user = req.body.user_id
        console.log(user)
	    const unfollow = skill.followers.includes(user)
	console.log(unfollow);
	if (unfollow === true) {
		skill.followers.remove(user)
    }
	else{
		skill.followers.pull(user)
	}
	try {
		await skill.save();
		res.status(201).send(skill);
	} catch (err) {
		res.status(500).send("invalid skill")
    }})
    

module.exports = router