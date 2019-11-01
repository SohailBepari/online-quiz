const LocalStrategy = require('./localStrategy')
const passport = require('passport')
const User = require('../models/user')

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	console.log("serialize called", user)
	done(null, user.id)
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
    console.log("deserialize called", id)
    User.findById(id, function(err, user) {
        done(err, user);
    });
})

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport