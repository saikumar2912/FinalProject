const express = require('express');

const router =express.Router();
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const User=require('../model/User');
const Skill=require('../model/Skills')
const Bit =require('../model/Bit');
router.post('/',(req, res) => {
    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            require.json({
                error:err
            })
        }
        let user=new User({
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPass
        })
        user.save()
        .then(res.status(201).send('user added successfully'))

    })
});


router.post('/login',(req,res)=>{
    var username= req.body.username
    var password=req.body.password

    User.findOne({$or:[{email:username}]})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token =jwt.sign({name:user.name},'verySecret',{expiresIn:'1h'})
                    res.json({
                        message:"login succesfully",
                        token
                    })
                }else{
                    res.json({
                        message:'password does not match'
                    })
                }
            })

        }else{
            res.json({
                message:"no user found"
            })
        }
    })
});

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
router.post('/:id/addbit', async (req, res) => {
	const newBit = new Bit(req.body);
	const  skillId = req.params.id;
	try {
		const user = await Skill.findById(skillId);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		newBit.skillId = user.id;
		await newBit.save();
		res.status(201).send(newBit);
	} catch (err) {
		res.status(500).send();
	}
});

module.exports = router;