const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique : true
  },
  body:{
    type: String,
    required: true
  },
  quiz:[{   //an array of questions
    question : String,
    choices : [String],
    answer : String,
    explaination : String
  }],
  date: { type: Date, default: Date.now }
});

let Topic = module.exports = mongoose.model('Topic', topicSchema);