const express = require('express');
const router = express.Router();

let Result = require('../models/result');

router.route('/').get((req,res) => {             //get topicName and body of all topics played by user
    const email = req.user.email;               //to display in ResultPage
    Result.find({email : email}, 'name body', (err, data) => {
        if(err)
            res.status(403).send(err);
        else
            res.json(data);
    })
})//

router.route('/:id').get((req,res) => {         //get user results for a particular topic
    const id = req.params.id;
    Result.findById(id,'answers name', (err, data) => {
        if(err)
            res.status(403).send(err);
        else
            res.json(data);
    })
})

router.route('/').post((req,res) => {       //post new Result for the user
    let newResult = new Result(req.body);
    let {email, name, answers} = req.body;

    //if topic previously played by user, update result else save new result
    Result.findOneAndUpdate({email : email, name : name}, {answers : answers}, (err, data) => {
        if(err){    
            console.log("err",err);
            res.status(403).send(err);
        }
        else{
            if(data === null){
                newResult.save((err, data)=>{
                    if(err)
                        res.status(403).send(data);
                    res.json(data);
                })
            }
            else
                res.json(data);
        }
    })
})

module.exports = router;