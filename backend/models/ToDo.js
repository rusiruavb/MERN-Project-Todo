const mongoose = require('mongoose')

const ToDoSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users"
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  complete: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})

const ToDo = mongoose.model('todos', ToDoSchema)

module.exports = ToDo