const { Router } = require("express")
const router = Router()
const { Todo } = require("../db/models")

router.post('/')

router.get('/todo-items', async (req, res) => {
  try {
    const todos = await Todo.findAll()

    if(todos.length > 0) {
      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: todos
      })
    }

    return res.status(404).json({
      status: "Empty",
      message: "Todos Is Empty"
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/todo-items/:todo_id', async (req, res) => {
  const { todo_id } = req.params

  try {
    const todo = await Todo.findByPk(todo_id)

    if(todo) {
      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: todo
      })
    }

    return res.status(404).json({
      status: "Not Found",
      message: "Todo Not Found"
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.post('/todo-items', async (req, res) => {
  const { title, activity_group_id, is_active } = req.body

  try {
    const todo = await Todo.create({ title, activity_group_id, is_active })

    if(todo) {
      return res.status(201).json({
        status: "Success",
        message: "Success",
        data: todo
      })
    }

    return res.status(404).json({
      status: "Failed",
      message: "Create Todo Failed"
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.patch('/todo-items/:todo_id', async (req, res) => {
  const { todo_id } = req.params
  const { title, priority, is_active } = req.body

  try {
    const todo = await Todo.findByPk(todo_id)

    if(todo) {
      await todo.update({ title, priority, is_active })

      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: todo
      })
    }

    return res.status(404).json({
      status: "Not Found",
      message: "Todo Not Found"
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.delete('/todo-items/:todo_id', async (req, res) => {
  const { todo_id } = req.params

  try {
    const todo = await Todo.findByPk(todo_id)

    if(todo) {
      await todo.destroy()

      return res.status(200).json({
        status: "Success",
        message: "Success"
      })
    }

    return res.status(404).json({
      status: "Not Found",
      message: "Todo Not Found"
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router