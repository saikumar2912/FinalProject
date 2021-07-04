const express = require('express');
const router =express.Router();
const Post= require('../Model/Post');
const Achivement=require('../Model/Achivement');
const {checkPermission}=require('../Middleware/permission')

// TO ADD A POST
	router.post('/addpost',checkPermission(), async (req, res) => {
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
	const like={irrevelant_content:req.body.irrevelant_content}
	const updates = Object.keys(like);
	console.log(updates);
	console.log(req.body);
	const allowedUpdates = ['irrevelant_content'];
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


router.post('/getpost',checkPermission(),async(req,res)=>{
	try{
		const post=await Post.find().populate("bit_id user_id skill_id").sort({ createdAt: 'desc'})
		res.send(post)
	}catch(error)
	{
		res.status(500).send("not found")
	}
});
router.post('/getposts', async (req, res) => {
	try {
		
	// 	const post = await Post.find({}).populate("user_id").sort({createdAt: 'desc'})
	// res.status(200).send(post).catch((e)=>console.log(e))
	const post = await Post.aggregate([{
		$lookup:{
		 from:"users",
		 localField:'user_id',
		 foreignField:'_id',
		 as:'user'
		}
	},{
		$lookup:{
		 from:"skills",
		 localField:'skill_id',
		 foreignField:'_id',
		 as:'skill'
		}
	},{
		$lookup:{
		 from:"bits",
		 localField:'bit_id',
		 foreignField:'_id',
		 as:'bit'
		}
	},
	{$lookup:{
		from:"reports",
		localField:'_id',
		foreignField:'post_id',
		as:'reports'

	}},
	{
		$unwind:"$user"
	},{
		$unwind:"$skill"
	},{
		$unwind:"$bit"
	},
]).sort({createdAt:'desc'})
	
	
	res.status(200).send(post).catch((e)=>console.log(e))
	} catch (err) {
		res.status(500).send({error:err.message});
	}
})

router.post('/posted/count',async(req,res)=>{
	try{
		const post = await Post.aggregate([{
			$lookup:{
             from:"reports",
			 localField:'_id',
			 foreignField:'post_id',
			 as:'reports'
			}
		}])
		console.log(post)
		res.status(200).send(post)

	}catch{

	}
})

router.get('/allposts',checkPermission(),(req,res)=>{
	Post.find().populate("user_id skill_id bit_id","title Title user_name").sort({ createdAt: 'desc'})
	.then((data)=>{
		res.status(201).send(data)
	}).catch(err=>{
		console.log(err)
		res.status(404).send({message:"not a user"})
	})
	
})

router.get('/userposts',checkPermission(),(req,res)=>{
	Post.find({skill_id:req.body.skill_id}).populate("skill_id bit_id","title Title followers user_name").sort({ createdAt: 'desc'})
	.then((data)=>{
		res.status(201).send(data)
	}).catch(err=>{
		console.log(err)
		res.status(404).send({message:"not a user"})
	})
	
})
//user posts

router.post('/user_idposts',checkPermission(),async(req,res)=>{
	try{
		const newpost=await Post.find({user_id:req.body.user_id}).populate("skill_id bit_id");
		console.log(newpost);
		res.status(200).send(newpost);
	}
	catch(error){
		res.status(404).send({error:'Invalid user ID'})

	}
});

//to get total post count
router.post('/post/count',async (req,res)=>{
	try{
		const post=await Post.find({skill_id:req.body.skill_id});
		const count=post.length;
		console.log(count);
		res.status(200).send({"Total Post":count})
	}
	
	catch (error) {
		res.status(500).send({ error: 'bit not found' });
	}
});


router.post('/likes/counts',async(req,res)=>{
	try{
const post =await Post.find().sort({like:"desc"}).populate('skill_id bit_id user_id','Title Description photo title user_name')
console.log(post)
res.status(200).send(post)
	}catch(err){
res.status(500).send({error:err.message})
	}
})

router.post('/like',checkPermission(),async(req,res)=>{
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

router.post('/dislike',checkPermission(),async(req,res)=>{
	
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
	const report={
		user_id:req.body.user_id,
		irrevelant_content:req.body.irrevelant_content
	}
	const irrevelant = post.irrevelant_content.includes(report)
if (irrevelant === true) {
}
else{
	post.irrevelant_content.push(report)
}
try {
	await post.save();
	res.status(201).send(post);
} catch (err) {
	res.status(500).send("invalid skill")
}})

router.delete('/deletepost/:id', async (req, res) => {
	try {
		const ID=req.params.id
		const post = await Post.findById(ID);
	// const achive= await Achivement.find()
	//  console.log(achive.map(e=>e.achivement.map(a=>{if(a.toString() === ID.toString()){
		 
	//    } a.pop()  })))
		if (!post) {
			return res.status(404).send({ error: 'post not found' });
		}
		post.remove()
		res.send(post);

	} catch (error) {
		res.status(500).send({ error: error.message });
	}
});

router.post('/highposts',async(req,res)=>{
	try{
		const post = await Post.aggregate([{
			$lookup:{
			 from:"users",
			 localField:'user_id',
			 foreignField:'_id',
			 as:'user'
			}
		},{
			$lookup:{
			 from:"skills",
			 localField:'skill_id',
			 foreignField:'_id',
			 as:'skill'
			}
		},{
			$lookup:{
			 from:"bits",
			 localField:'bit_id',
			 foreignField:'_id',
			 as:'bit'
			}
		},
		{$lookup:{
			from:"reports",
			localField:'_id',
			foreignField:'post_id',
			as:'reports'
	
		}},
		{
			$unwind:"$user"
		},{
			$unwind:"$skill"
		},{
			$unwind:"$bit"
		},
	]).sort({popularity: 'desc'}).limit(10)
	res.status(200).send(post)

	}catch(error){
res.status(500).send({error:error.message})
	}
})

router.patch('/updatepost/:id', async (req, res) => {
	
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdates = ['content'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Operation' });
    }

    try {
        const post = await Post.findById(req.params.id)
        console.log(post);
        if (!post) {
           
            return res.status(404).send({ error: 'post not found' });
        }
        updates.forEach((update) => {
            post[update] = req.body[update];
        });
        await post.save();
        res.send(post);
    } catch (err) {
        res.status(500).send({error: err.message});
    }

});



module.exports = router;