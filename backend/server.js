const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv').config()

const user_routes = require('./routes/user.route')
const todo_routes = require('./routes/todo.route')

const PORT = process.env.PORT || 8065

app.use(cors())
app.use(bodyParser.json())

const URI = process.env.MONGO_URL

mongoose.connect(URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const connection = mongoose.connection
connection.once("open", () => {
  console.log('MongoDB Connection Success!!!')
})

// routes
app.use('/user', user_routes)
app.use('/todo', todo_routes)

app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`)
})

