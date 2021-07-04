const express = require('express');
const router = express.Router();
const Test=require('../Model/TestResults');

router.post('/addresult', async (req, res) => {
    const test = new Test(req.body);
    const bit_id = req.body.bit_id;
    const user_id = req.body.user_id;
    console.log(bit_id)
    console.log(user_id)  

try{
    
    Test.findOne({$and:[{bit_id,user_id}]}, function (err, result) {
        if (err) {
            throw (err);
        }else if(!result){
            try {
                 test.save()
                .then((e)=>res.status(201).send({data:e}))
                .catch((e)=> console.log(e))
            } catch (err) {
                res.status(500).send(test);
            }
        }
         else {
            if (result) {
                console.log(result,'hi')
                if(req.body.score > result.score)
                {
                    result.score = req.body.score;
                }else{
                    result.score
                }

                    result.save(function (err, updatedScore) {
                        if (err) throw (err);
        
                        res.status(200).send(updatedScore)
                    });
                
            }else{
                res.status(200).send('Invalid Test')
            }
        }
    });
}catch(err){
    res.send("error")
}
});

   
router.post('/getallquiz',async (req,res)=>{
    try{
        const user=await Test.find({}).populate('bit_id skill_id','Title title')
        res.send(user)
     }
    catch (error) {
        res.status(500).send({error:'error message'})
    }
});

router.post('/gettopusers',async(req,res)=>{

	try{
		const test =await Test.find().populate('skill_id bit_id user_id','Title title user_name profile_picture').sort({score:'desc'}).limit(10)
    res.status(201).send(test)
    }catch{
res.send('no test found')
    } });

module.exports = router;