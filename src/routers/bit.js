const express = require('express');
const router =express.Router();
const Bit =require('../Model/Bit');
const Skill=require('../Model/Skill')
const {checkPermission}=require('../Middleware/permission')


//to ADD BIT
	router.post('/addbit',checkPermission(), async (req, res) => {
        const newbit = new Bit(req.body);
	try {
		await newbit.save()
		.then((e)=>res.status(201).send({data:e}))
		.catch((e)=> console.log(e))
	} catch (err) {
		res.status(500).send(newbit);
	}
});
router.post('/allbits',checkPermission(), async (req, res) => {
        
	try {
		const bit = await Bit.find({});
		res.send(bit);
	} catch (error) {
		res.status(404).send({ error: 'Path not found' });
	}
});



//to get bit details using skillid
router.get('/allbits',checkPermission(),(req,res)=>{
	Bit.find().populate("skill_id")
	.then((bits)=>{
		res.send({bits})
	}).catch(err=>{
		console.log(err)
	})
	
})
router.get('/bits/skillid',checkPermission(),(req,res)=>{
	Bit.find({skill_id:req.body.skill_id}).populate("skill_id")
	.then((bits)=>{
		res.send({bits})
	}).catch(err=>{
		console.log(err)
	})
	
})
//to get bit using id
router.post('/id_bit',checkPermission(),async(req,res)=>{
	try{
		const newbit=await Bit.findById({skill_id:req.body.skill_id});
		res.status(200).send(newbit);
	}
	catch(error){
		res.status(404).send({error:'Invalid skill ID'})

	}
});
//to get total bits count
router.post('/count',checkPermission(),async (req,res)=>{
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
router.post('/newskill',checkPermission(),async (req,res)=>{
	try{
		const bit=await Bit.find({skill_id:req.body.skill_id});
		const bitdetails= bit.map((e)=>{
			return{
				skill_id:e.skill_id,
				   bit_id:e._id,
				   title:e.title,
				   Description:e.Description
			}
		})
		res.status(200).send({"bits":bitdetails})
		console.log(bitdetails)
	}
	catch (error) {
		res.status(500).send({ error: 'bit not found' });
	}
});

router.delete('/delete_bit/:id', async (req, res) => {
	try {
		const bit = await Bit.findById(req.params.id);
		if (!bit) {
			return res.status(404).send({ error: 'bit not found' });
		}
		bit.remove()
		res.send(bit);

	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});
router.patch('/updatebit/:id', async (req, res) => {
	
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdates = ['title'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Operation' });
    }

    try {
        const bit = await Bit.findById(req.params.id)
        console.log(bit);
        if (!bit) {
           
            return res.status(404).send({ error: 'bit not found' });
        }
        updates.forEach((update) => {
            bit[update] = req.body[update];
        });
        await bit.save();
        res.send(bit);
    } catch (err) {
        res.status(500).send({error: err.message});
    }

});

module.exports = router;