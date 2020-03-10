const router = require('express').Router()
const Todo = require('../models/todoModel');

router.post('/todo/add', async (req,res) => {
  const todo = new Todo({
    description: req.body.description,
    location: req.body.location,
    author: req.body.author,
    solved: req.body.solved || false
  });
  console.log(req.body)
  try {
    const savedTodo = await todo.save()
      res.send(savedTodo)
  } catch  {
    console.log('Error saving your todo')
    res.status(400).send(err);
  }
});

router.get('/todo/get', (req, res) => {
  res.send('This is the data')
})

module.exports = router;
