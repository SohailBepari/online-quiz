const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('../passport/index')

let User = require('../models/user');

router.route('/signup').post((req, res) => {
    console.log('user signup');
    let newUser = new User(req.body);
    //hash password and store user in database
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if(err){
                console.log(err);
            }
            newUser.password = hash;
            newUser.save(function(err, data){
                if(data){
                    res.json(data);
                } else {
                    res.status(403).send("Same email exists");
                }
            });
        });
    });    
})

router.route('/login').post( 
    (req, res, next) => {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body);
        next();
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.headers);
        var userInfo = {
            user: req.user
        };
        res.json(userInfo);
    }
)

router.route('/').get((req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user);
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
});

router.route('/logout').get((req, res) => {
    console.log("Logout user");
    console.log("in logout", req.user);
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router