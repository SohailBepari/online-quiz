const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
  email : {
      type: String,
      required : true
  } ,
  name:{      //this is topic name
    type: String,
    required: true
  },
  body:{    //topic description
    type: String,
    required: true
  },
  answers : [String],   //user answers array
  date: { type: Date, default: Date.now }
});

let Result = module.exports = mongoose.model('Result', resultSchema);