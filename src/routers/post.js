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
});0

//TO UPDATE A POST  

router.patch('/updatepost/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	//console.log(updates);
	const allowedUpdates = ['content','like','dislike'];
	 const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});
	//console.log(allowedUpdates);
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Operation' });
	}

	try {
		 const post = await Post.findById(req.params.id)
	//	console.log(post);
		if(!post){
			res.status(500).send("not a user")
		}
		updates.forEach((update)=>{
			post[update]=req.body[update]
		});
		await post.save()
		console.log(post);
		res.json(post)
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
});

router.post('/id_post',async(req,res)=>{
	try{
		const newpost=await Post.find({user_id:req.body.user_id});
		const count=newpost.length
		console.log(count);
		res.status(200).send({'total posts':count});
	}
	catch(error){
		res.status(404).send({error:'Invalid user ID'})

	}
});
//to get total post count
router.post('/post/count',async (req,res)=>{
	try{
		const post=await Post.find({});
		const count=post.length;
		console.log(count);
		res.status(200).send({"Total Post":count})
	}
	
	catch (error) {
		res.status(500).send({ error: 'bit not found' });
	}
});




module.exports = router;