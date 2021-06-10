const express = require('express');



const router = express.Router();
const { checkPermission } = require('../Middleware/permission');
const Post=require('../Model/Post');


const Report=require('../Model/Report');

router.post('/reported',async (req, res) => {
	const newPost = new Report(req.body);
	console.log(newPost);
	try {
		console.log(newPost);
		await newPost.save()
		.then((e)=>res.status(201).send(e))
		.catch((e)=> console.log(e))
	} catch (err) {
		res.status(500).send();
	}
});

router.post('/reports',async (req, res) => {
	
	try {
		const status = await Report.find({}).populate("user_id post_id","user_name content")
		if (!status) {
			return res.status(404).send({ error: 'Status not found' });
		}
		res.send(status);
	} catch (err) {
		res.status(500).send({ error: err.message});
	}
});
router.delete('/deleteReport/:id',async (req, res) => {
   
	try {
		const reply = await Report.findByIdAndDelete(req.params.id);
		if (!reply) {
			return res.status(404).send({ error: 'reply not found' });
		}
		res.send(reply);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});
router.delete('/deleteReportedPost/:id/:pid',async (req, res) => {
   
	try {
		const reply = await Report.findByIdAndDelete(req.params.id);
		if (!reply) {
			return res.status(404).send({ error: 'reply not found' });
		}
		res.send(reply);
        const post = await Post.findByIdAndDelete(req.params.pid);
		if (!post) {
			return res.status(404).send({ error: 'reply not found' });
		}
		res.send(post);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

router.post('/report/count',async (req,res)=>{
	try{
		const report=await Report.find({post_id:req.body.post_id});
		const count=report.length;
		console.log(count);
		res.status(200).send({count:count})
	}
	
	catch (error) {
		res.status(500).send({ error: 'bit not found' });
	}
});
router.post('/like',checkPermission(),async(req,res)=>{
	console.log(req.body)
	const report = await Report.findOne({ _id:req.body._id});
	const user = req.body.user_id
	const reportlike = report.reportlike.includes(user)
	const reportdislike = report.reportdislike.includes(user)
console.log(reportlike);
if (reportlike === true) {
	report.reportlike.remove(user)
}
else if(reportdislike === true){
	report.reportdislike.remove(user)
	report.reportlike.push(user)
}
else{
	report.reportlike.push(user)
}
try {
	await report.save();
	res.status(201).send(report);
} catch (err) {
	res.status(500).send({err:err.message});
}
})

router.post('/dislike',checkPermission(),async(req,res)=>{
	
const report = await Report.findOne({ _id:req.body._id});
	const user = req.body.user_id
	const reportlike = report.reportlike.includes(user)
	const reportdislike = report.reportdislike.includes(user)
console.log(reportlike);
if (reportlike === true) {
	report.reportlike.remove(user)
	report.reportdislike.push(user)
}
else if(reportdislike === true){
	report.reportdislike.remove(user)
}
else{
	report.reportdislike.push(user)
}
try {
	await report.save();
	res.status(201).send(report);
} catch (err) {
	res.status(500).send();
}
})

module.exports = router;
