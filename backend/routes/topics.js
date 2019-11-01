const express = require('express');
const router = express.Router();

let Topic = require('../models/topic');

router.route('/').get((req,res) => { //get all topics
    let search = '';
    if(req.query.search !== undefined)
        search = req.query.search;
    //regex is to find search anywhere inside topicname string and options is to use case-insensitive
    Topic.find({name : { "$regex": search, "$options": "i" }}, 'name body', (err, data) => {
        if(err)
            res.status(403).send(err);
        else
            res.json(data);
    })  
})

router.route('/:id').get((req,res) => {     //get a particular topic by id
    const id = req.params.id;
    Topic.findById(id, (err, data) => {
        if(err)
            res.status(403).send(err);
        else
            res.json(data);
    })  
})

router.route('/name/:topicName').get((req,res) => {     //get a particular topic by name
    const topicName = req.params.topicName;
    Topic.findOne({name : topicName}, (err, data) => {
        if(err)
            res.status(403).send(err);
        else
            res.json(data);
    })
})
module.exports = router;