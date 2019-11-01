const express = require('express');
const router = express.Router();

let Topic = require('../models/topic');

router.route('/').post((req,res) => {
    let newTopic = new Topic(req.body);
    newTopic.save((err, data) => {
        if(data){
            res.json(data);
        } else {
            console.log("error in new topic save", err);
            res.status(403).send("same topic name exists");
        }
    })
})

module.exports = router;