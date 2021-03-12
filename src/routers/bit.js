const express = require('express');
const router =express.Router();
const Bit =require('../model/Bit');
const Skill=require('../model/Skills')


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