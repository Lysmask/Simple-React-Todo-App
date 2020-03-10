const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  description: {
    type: String, 
    required: true
  },
  location: {
    type: String,
    required: true
  },
  author: {
    type: String, 
    required: true
  },
  solved: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('todo', TodoSchema)