const express = require('express');
const router =express.Router();
const Post= require('../Model/Post');

	router.post('/addpost', async (req, res) => {
        const newpost = new Post(req.body);
	try {
		await newpost.save()
		.then((e)=>res.status(201).send({e}))
		.catch((e)=> console.log(e))
	} catch (err) {
		res.status(500).send(newpost);
	}
}
       
);
module.exports = router;