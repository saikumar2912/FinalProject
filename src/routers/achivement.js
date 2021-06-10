const express = require('express');
const router = express.Router();
const User=require('../Model/User');

const Achivement = require('../Model/Achivement');


//1. admin profile
router.post('/achivement', async (req, res) => {
	console.log(req.body)

const achive= await Achivement.findOne({user_id:req.body.user_id});
console.log(typeof Achivement.achivement)
if(achive===null){
	const achivement = new Achivement(req.body);
	try {
		await achivement.save()

		.then((e)=>res.status(201).send({data:e}))
		.catch((e)=>console.log(e));
		} catch (err) {
		res.status(500).send();
	}
}
else{

	try {
		if(achive.achivement.includes(req.body.achivement)===false){
			achive.achivement.push(req.body.achivement)

			await achive.save()
	
			.then((e)=>res.status(201).send({data:e}))
			.catch((e)=>console.log(e));
			}
			else{
res.send({message:"already given"})
			}
		}
	 catch (err) {
		res.status(500).send();
	}
}
	
});

router.post('/userachive',(req,res)=>{
	console.log(req.body)
	Achivement.findOne({user_id:req.body.user_id})
	.then((achive)=>{
		console.log(achive)
		res.send(achive)
	}).catch(err=>{
		console.log(err)
		res.status(404).send({message:"no achivements"})
	})
	
})

router.delete('/deleteachive/:id',async(req,res)=>{
	try{
		const ID=req.params.id
const achive= await Achivement.findAll(ID)
// console.log(achive.map(e=>e.achivement.map(a=>{if(a.toString() === ID.toString()){ a.remove()  }  })))

res.send(achive)
	}

	catch{
res.status(500).send('not found')
	}
})




module.exports = router;