const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

//Routes
const todoRoute = require('./routes/todos');

//Middlewares
app.use(express.json())
app.use(cors())

//Route Middlewares
app.use('/todos', todoRoute);

//Default API-base
app.get('/', (req, res) => {
  res.send('Welcome to the api-base')
})

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  () => console.log('connected to db')
)

app.listen(5000)