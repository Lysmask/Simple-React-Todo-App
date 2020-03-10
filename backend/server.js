const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const cors = require('cors');
const port = 5000

// Importing Routes
const todoRoute = require('./routes/todoRoute');

dotenv.config();

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
{ useNewUrlParser: true}, () => {
  console.log('Connected to database')
})

  //Middleware
  app.use(express.json());
  //Route Middlewares
  app.use('/api', todoRoute)





app.listen(port, () => console.log(`Server running on port ${port}`))

