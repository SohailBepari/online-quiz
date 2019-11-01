const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const mongoose = require('mongoose')
const config = require('./passport/database')
const passport = require('./passport')

//connect mongoose to database
mongoose.connect(config.database, {useNewUrlParser: true});   
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

//cors
app.use(cors({credentials: true, origin: true}));   

//body-parser
app.use(express.json());

//session //session is required for passport.js
app.use(
    session({
        secret: 'monkeydluffy',   //pick a random string to make the hash that is generated secure
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 5184000000 // 60 days
        }
    })
)
    
// Passport
app.use(passport.initialize())
app.use(passport.session())     // calls serializeUser and deserializeUser

//routes
const topicRouter = require('./routes/topics.js')
const createRouter = require('./routes/create.js')
const userRouter = require('./routes/user.js')
const resultRouter = require('./routes/results.js')

app.use('/topics', topicRouter);
app.use('/create', createRouter);
app.use('/user', userRouter);
app.use('/results', resultRouter);

app.listen(5000);