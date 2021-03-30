const express = require('express');
const router =express.Router();
const Post= require('../Model/Post');
// TO ADD A POST
	router.post('/addpost', async (req, res) => {
        const newpost = new Post(req.body);
	try {
		await newpost.save()
		.then((e)=>res.status(201).send({e}))
		.catch((e)=> console.log(e))
	} catch (err) {
		res.status(500).send("not found");
	}
});

//TO UPDATE A POST  

router.patch('/updatepost', async (req, res) => {
	const updates = Object.keys(req.body);
	console.log(updates);
	const allowedUpdates = ['content','like','dislike'];
	
	 const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});
	console.log(isValidOperation);
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Operation' });
	}

	try {
		const post = await Post.findById(req.params.id)
		//console.log(post);
		 if(!post){
			 return res.status(404).send({error:'post not found'})
		 }
		updates.forEach((update)=>{
			post[update]=req.body[update]
		});
		await post.save();
		res.send(post)
	} catch (err) {
		res.status(500).send({ error: err.message});
	}
});
router.post('/getpost',async(req,res)=>{
	try{
		const post=await Post.find()
		res.send(post)
	}catch(error)
	{
		res.status(500).send("not found")
	}
})

module.exports = router;