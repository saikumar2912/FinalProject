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

router.patch('/updatepost', async (req, res) => {
	const like={like:req.body.like}
	const updates = Object.keys(like);
	console.log(updates);
	console.log(req.body);
	const allowedUpdates = ['content','like','dislike'];
	 const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});
	console.log(allowedUpdates);
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Operation' });
	}

	try {
		 const post = await Post.findById(req.body.id)
		console.log(post);
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
		const post=await Post.find().populate("bit_id user_id skill_id")
		res.send(post)
	}catch(error)
	{
		res.status(500).send("not found")
	}
});

router.get('/allposts',(req,res)=>{
	Post.find().populate("user_id skill_id bit_id","title Title user_name")
	.then((data)=>{
		res.status(201).send(data)
	}).catch(err=>{
		console.log(err)
		res.status(404).send({message:"not a user"})
	})
	
})
router.get('/userposts',(req,res)=>{
	Post.find({skill_id:req.body.skill_id}).populate("skill_id bit_id","title Title followers user_name")
	.then((data)=>{
		res.status(201).send(data)
	}).catch(err=>{
		console.log(err)
		res.status(404).send({message:"not a user"})
	})
	
})
//user posts

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
router.post('/like',async(req,res)=>{
	console.log(req.body)
	const post = await Post.findOne({ _id:req.body._id});
	const user = req.body.user_id
	const like = post.like.includes(user)
	const dislike = post.dislike.includes(user)
console.log(like);
if (like === true) {
	post.like.remove(user)
}
else if(dislike === true){
	post.dislike.remove(user)
	post.like.push(user)
}
else{
	post.like.push(user)
}
try {
	await post.save();
	res.status(201).send(post);
} catch (err) {
	res.status(500).send({err:err.message});
}
})

router.post('/dislike',async(req,res)=>{
	
const post = await Post.findOne({ _id:req.body._id});
	const user = req.body.user_id
	const like = post.like.includes(user)
	const dislike = post.dislike.includes(user)
console.log(like);
if (like === true) {
	post.like.remove(user)
	post.dislike.push(user)
}
else if(dislike === true){
	post.dislike.remove(user)
}
else{
	post.dislike.push(user)
}
try {
	await post.save();
	res.status(201).send(post);
} catch (err) {
	res.status(500).send();
}
})

router.post('/irrevelant',async(req,res)=>{
	const post = await Post.findOne({ _id:req.body._id});
	const user = req.body.user_id
	console.log(user)
	const irrevelant = post.irrevelant_content.includes(user)
if (irrevelant === true) {
	post.irrevelant_content.remove(user)
}
else{
	post.irrevelant_content.push(user)
}
try {
	await post.save();
	res.status(201).send(post);
} catch (err) {
	res.status(500).send("invalid skill")
}})


module.exports = router;