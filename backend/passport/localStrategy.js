const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user');
const config = require('./database');
const bcrypt = require('bcrypt');

const strategy = new LocalStrategy(
	{
        usernameField: 'email', //important because email is not default
        passwordField: 'password'
	},
	function(email, password, done) {
        console.log("passport");
        User.findOne({email : email}, function(err, user){console.log(user);
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'No user found'});
            }
      
            // Match Password
            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } 
                else{
                    return done(null, false, {message: 'Wrong password'});
                }
            });
        });
	}
)

module.exports = strategy