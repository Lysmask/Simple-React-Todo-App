const express = require('express')
const router = express.Router()
const Todo = require('../models/todoModel')

// Returns all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos)
  } catch(err) {
    res.json(err)
  }
});

// Return specific todo
router.get('/:todoId', async (req, res) => {
  // console.log(req.params.todoId)
  try {
    const todo = await Todo.findById(req.params.todoId)
    res.json(todo)
  } catch(err) {
    res.json(err)
  }
})

// Add a todo
router.post('/', async (req, res) => {
  console.log(req.body)
  const todo = new Todo({
    description: req.body.description,
    location: req.body.location,
    author: req.body.author,
    solved: req.body.solved || false
  });
  try {
    const savedTodo = await todo.save()
    res.json(savedTodo)
  } catch(err) {
    res.json(err)
  }
})

//Change value of todo's solved
router.patch('/:todoId', async (req, res) => {
  let todo_id = req.params.todoId
    try {
      let todo = await Todo.findById(todo_id)
      let isSolved = todo.solved
        await Todo.updateOne(
          { _id: todo_id },
          { $set: {solved: !isSolved}}
        )
        res.json(res)
    } catch(err) {
      res.json(err)
    }
})

// Delete specific todo
router.delete('/:todoId', async (req,res) => {
  try {
    await Todo.deleteOne({
      _id: req.params.todoId
    })
    res.send('Todo has been deleted')
  } catch(err) {
    res.json(err)
  }
}
 
)

module.exports = router;