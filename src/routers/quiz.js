const express = require('express');
const router =express.Router();


const Quiz=require('../Model/Quiz')
router.post('/addquiz', async (req, res) => {
    
try {
    console.log(req.body)
    const quiz = await Quiz.insertMany(req.body)
    .then((e)=>res.status(201).send({data:e}))
    .catch((e)=> console.log(e))
} catch (err) {
    res.status(500).send({err:err.message});
}
});

router.post('/questions',async(req,res)=>{
    try{
const question= await Quiz.find().populate('bit_id')
res.status(200).send(question)
    }
    catch(error)
    {
res.status(500).send({message:error.message})
    }
})
router.post('/questions/id',(req,res)=>{
	Quiz.find({bit_id:req.body.bit_id})
	.then((bits)=>{
		res.send({bits})
	}).catch(err=>{
		console.log(err)
	})
	
});
router.delete('/delete_question/:id', async (req, res) => {
	try {
		const question = await Quiz.findById(req.params.id);
		if (!question) {
			return res.status(404).send({ error: 'question not found' });
		}
		question.remove()
		res.send(question);

	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});
router.patch('/updatequestion/:id', async (req, res) => {
	
    const updates = Object.keys(req.body);
    console.log(updates);
    const allowedUpdates = ['question','option1','option2','option3','option4',"answer"];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Operation' });
    }

    try {
        const question = await Quiz.findById(req.params.id)
        console.log(question);
        if (!question) {
           
            return res.status(404).send({ error: 'question not found' });
        }
        updates.forEach((update) => {
            question[update] = req.body[update];
        });
        await question.save();
        res.send(question);
    } catch (err) {
        res.status(500).send({error: err.message});
    }

});





module.exports = router;