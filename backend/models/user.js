const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique : true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now }
});

const User = module.exports = mongoose.model('User', UserSchema);