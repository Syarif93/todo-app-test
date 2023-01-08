const { Router } = require("express")
const router = Router()
const pool = require("../db/connection")

router.get('/todo-items', async (req, res) => {
  try {
    const [todos] = await pool.query(`SELECT * FROM todos`)

    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: todos
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/todo-items/:todo_id', async (req, res) => {
  const { todo_id } = req.params

  if(!todo_id) return res.status(404).json({ status: "Bad Reques", message: "Bad Reques", })

  try {
    const [todo] = await pool.query(`SELECT * FROM todos WHERE id = ${todo_id}`)

    if(todo[0]) {
      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: todo[0]
      })
    }

    return res.status(404).json({
      status: "Not Found",
      message: `Todo with ID ${todo_id} Not Found`
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.post('/todo-items', async (req, res) => {
  const { title, activity_group_id, is_active } = req.body

  if(!title) return res.status(400).json({ status: "Bad Request", message: "title cannot be null", })
  if(!activity_group_id) return res.status(400).json({ status: "Bad Request", message: "activity_group_id cannot be null", })

  try {
    const [result] = await pool.query(
      `INSERT INTO todos (title, activity_group_id, is_active, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`,
      [title, activity_group_id, is_active, new Date(), new Date()]
    )
    const [[todo]] = await pool.query(`SELECT * FROM todos WHERE id = ${result.insertId}`)

    return res.status(201).json({
      status: "Success",
      message: "Success",
      data: todo
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.patch('/todo-items/:todo_id', async (req, res) => {
  const { todo_id } = req.params
  const { title, priority, is_active } = req.body

  if(!todo_id) return res.status(404).json({ status: "Bad Reques", message: "Bad Reques", })

  try {
    const [[todo]] = await pool.query(`SELECT * FROM todos WHERE id = ${todo_id}`)

    if(todo) {
      await pool.query(
        `UPDATE todos SET title=?, priority=?, is_active=?, updatedAt=? WHERE id = ${todo.id}`,
        [title, priority, is_active, new Date()]
      )
      const [[updated]] = await pool.query(`SELECT * FROM todos WHERE id = ${todo_id}`)
  
      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: updated
      })
    }

    return res.status(404).json({
      status: "Not Found",
      message: `Todo with ID ${todo_id} Not Found`
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.delete('/todo-items/:todo_id', async (req, res) => {
  const { todo_id } = req.params

  if(!todo_id) return res.status(404).json({ status: "Bad Reques", message: "Bad Reques", })

  try {
    const [[todo]] = await pool.query(`SELECT * FROM todos WHERE id = ${todo_id}`)

    if(todo) {
      await pool.query(`DELETE FROM todos WHERE id = ${todo.id}`)
  
      return res.status(200).json({
        status: "Success",
        message: "Success"
      })
    }

    return res.status(404).json({
      status: "Not Found",
      message: `Todo with ID ${todo_id} Not Found`
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router