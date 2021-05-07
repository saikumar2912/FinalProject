const express = require('express');

const router =express.Router();

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
            const user=await User.find({_id:req.body._id})
            console.log(user);
            const skill=skill.map((e)=>{
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
            const skill=await Skill.find({user_id:req.body.user_id});
            const skilldetails= skill.map((e)=>{
                return{
                       user_id:e.user_id,
                       skill_id:e._id,
                       title:e.Title,
                       Description:e.Description
                }
            })
            res.status(200).send({"skills":skilldetails})
            console.log(bitdetails)
        }
        catch (error) {
            res.status(500).send({ error: 'bit not found' });
        }
    });
    router.get('/allpost',(req,res)=>{
        Skill.find()
        .populate("user_id","_id user_name")
        .then((skills)=>{
            res.send({skills})
        }).catch(err=>{
            console.log(err)
        })
        
    })
  //delete a skill
    router.delete('/deleteskill/:id', async (req, res) => {
        try {
            const skill = await Skill.findOne(req.params._id);
            if (!skill) {
                return res.status(404).send({ error: 'skill not found' });
            }
            skill.remove()
            res.send(skill);

        } catch (error) {
            res.status(500).send({ error: 'Internal server error' });
        }
    });
    
    // router.put('/follow',(req,res)=>{
    //     console.log(req.body)
    //     Skill.findByIdAndUpdate(req.body.skill_id,
    //         console.log(req.body.followId),
    //         {
    //         $push:{followers:req.body.user_id}
    //     },console.log(followers),{
    //         new:true
    //     },(err,result)=>{
    //         if(err){
    //             return res.status(422).json({error:err})
    //         }
    //       User.findByIdAndUpdate(req.body.user_id,{
    //           $push:{following:req.body.skill_id}
              
    //       },{new:true}).then(result=>{
    //           res.json(result)
    //       }).catch(err=>{
    //           return res.status(422).json({error:err})
    //       })
    
    //     }
    //     )
    // })

    router.put('/follow/:id',(req,res)=>{
        console.log(req)
        Skill.findByIdAndUpdate(req.params.id,

            {
            $push:{followers:req.body.user_id}
        },{
            new:true
        }).exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }else{
                res.json(result)
                console.log(result)
            }
        })
    })
    
    
module.exports = router