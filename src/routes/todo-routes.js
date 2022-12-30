const { Router } = require("express")
const router = Router()
const db = require("../db/models")
const { QueryTypes } = require("sequelize")

router.get('/todo-items', async (req, res) => {
  try {
    const todos = await db.sequelize.query(`SELECT * FROM todos`, {
      type: QueryTypes.SELECT
    })

    if (todos.length > 0) {
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
    const todo = await db.sequelize.query(`SELECT * FROM todos WHERE id = ${todo_id} LIMIT 1`, {
      type: QueryTypes.SELECT
    })

    if (todo[0]) {
      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: todo[0]
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
    const [result] = await db.sequelize.query(`INSERT INTO todos (title, activity_group_id, is_active, createdAt, updatedAt) VALUES ($title, $activity_group_id, $is_active, $createdAt, $updatedAt)`, {
      bind: {
        title,
        activity_group_id,
        is_active,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      type: QueryTypes.INSERT,
    })
    const [todo] = await db.sequelize.query(`SELECT * FROM todos WHERE id = ${result}`, {
      type: QueryTypes.SELECT
    })

    if (todo) {
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
    const [todo] = await db.sequelize.query(`SELECT * FROM todos WHERE id = ${todo_id}`, {
      type: QueryTypes.SELECT
    })

    if (todo) {
      await db.sequelize.query(`UPDATE todos SET title=$title, priority=$priority, is_active=$is_active, updatedAt=$updatedAt WHERE id = ${todo.id}`, {
        bind: {
          title,
          priority,
          is_active,
          updatedAt: new Date()
        },
        type: QueryTypes.UPDATE
      })
      const [updated] = await db.sequelize.query(`SELECT * FROM todos WHERE id = ${todo_id}`, {
        type: QueryTypes.SELECT
      })

      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: updated
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
    const [todo] = await db.sequelize.query(`SELECT * FROM todos WHERE id = ${todo_id}`, {
      type: QueryTypes.SELECT
    })

    if (todo) {
      await db.sequelize.query(`DELETE FROM todos WHERE id = ${todo.id}`)

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