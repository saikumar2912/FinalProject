const express = require('express');
const router =express.Router();
const Bit =require('../Model/Bit');
const Skill=require('../Model/Skill')
const Post=require('../Model/Post')
const Reports=require('../Model/Report')
const Quiz= require('../Model/Quiz')
const TestResults =require('../Model/TestResults')

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

router.post('/addnewbit',async(req,res)=>{
	const bit=new Bit(req.body);
	const skill_id=req.body.skill_id
const title=req.body.title
console.log(title,bit)
	try{
		Bit.findOne({$and:[{title,skill_id}]}, function (err, result) {
			if (err) {
				throw (err);
			}else if(!result){
				try {
					 bit.save()
					.then((e)=>res.status(201).send({data:e}))
					.catch((e)=> console.log(e))
				} catch (err) {
					res.status(500).send(bit);
				}
			}else{
				res.send('already exists')
			}
		})
		}
		catch(err){
res.send('error')
	}
	
})
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
			}
		})
		res.status(200).send({"bits":bitdetails})
		console.log(bitdetails)
	}
	catch (error) {
		res.status(500).send({ error: 'bit not found' });
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
router.delete('/delete_bit/:id', async (req, res) => {
	// console.log("delete post",req.body._id);
	try {
		const bit = await Bit.findById(req.params.id,(err,p)=>{
			
              if(err){
				  console.log(err);
			  }
			  else{
				Post.find({},(err,c)=>{
					if(err){
						console.log(err);
					}else{

						Reports.find({},(err,r)=>{
							if(err){
								console.log(err)
							}
							else{
								Quiz.find({},(err,q)=>{
									if(err){
										console.log(err)
									}else{
                                        TestResults.find({},(err,t)=>{
											if(err){
												console.log(err)
											}
											else{
												q.map((quiz)=>{
													t.map((result)=>{
														if(p._id.toString()===result.bit_id.toString()){
															return result.remove()
														}
													})
												})
											}
											q.map((s)=>{
												if(p._id.toString()===s.bit_id.toString()){
													return s.remove()
												}
											})
										})
									}
								})
								c.map((post)=>{
									console.log(post,'7')
									r.map((reports)=>{

										if(post._id.toString()===reports.post_id.toString()){
											 reports.remove()
										}
									})
								})		
							}
						})
					}c.map((e)=>{
						if(p._id.toString() ===e.bit_id.toString() ){
							 return e.remove()
						}
						console.log(e)
					})

					
					
				})
			}
		})
		bit.remove()
	res.send(post)
	}
			catch{
				res.send("bit not found")
			}})

module.exports = router;