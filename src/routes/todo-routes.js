const { Router } = require("express")
const router = Router()
const { Todo } = require("../db/models")

router.post('/')

router.get('/todo-items', async (req, res) => {
  try {
    const todos = await Todo.findAll()

    if(todos.length > 0) {
      return res.json(todos)
    }

    return res.status(404).json({
      status: "Empty",
      message: "Todos Is Empty"
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router