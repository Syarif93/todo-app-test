const { Router } = require("express")
const pool = require("../db/connection")
const router = Router()

router.get("/activity-groups", async (req, res) => {
  try {
    const [activities] = await pool.query("SELECT * FROM activities")

    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: activities
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get("/activity-groups/:activity_id", async (req, res) => {
  const { activity_id } = req.params

  try {
    const [activity] = await pool.query(`SELECT * FROM activities WHERE id = ${activity_id}`)

    if(activity[0]) {
      return res.json({
        status: "Success",
        message: "Success",
        data: activity[0]
      })
    }

    return res.status(404).json({
      status: "Not Found",
      message: `Activity with ID ${activity_id} Not Found`
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.post("/activity-groups", async (req, res) => {
  const { title, email } = req.body

  if(!title) return res.status(400).json({ status: "Bad Request", message: "title cannot be null", })

  try {
    const [result] = await pool.query(
      `INSERT INTO activities (title, email, createdAt, updatedAt) VALUES (?, ?, ?, ?)`,
      [title, email, new Date(), new Date()]
    )
    const [activity] = await pool.query(`SELECT * FROM activities WHERE id = ${result.insertId}`)

    if(activity[0]) {
      return res.status(201).json({
        status: "Success",
        message: "Success",
        data: activity[0]
      })
    }

    return res.status(404).json({
      status: "Failed",
      message: "Activity Create Failed"
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.patch("/activity-groups/:activity_id", async (req, res) => {
  const { title } = req.body
  const { activity_id } = req.params

  try {
    const [activity] = await pool.query(`SELECT * FROM activities WHERE id = ${activity_id}`)

    if(activity[0]) {
      await pool.query(
        `UPDATE activities SET title=?, updatedAt=? WHERE id = ${activity[0].id}`,
        [title, new Date()]
      )
      const [updated] = await pool.query(`SELECT * FROM activities WHERE id = ${activity_id}`)

      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: updated[0]
      })
    }

    return res.status(404).json({
      status: "Not Found",
      message: `Activity with ID ${activity_id} Not Found`
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.delete("/activity-groups/:activity_id", async (req, res) => {
  const { activity_id } = req.params

  try {
    const [activity] = await pool.query(`SELECT * FROM activities WHERE id = ${activity_id}`)

    if(activity[0]) {
      await pool.query(`DELETE FROM activities WHERE id = ${activity[0].id}`)

      console.log(deleted);

      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: {}
      })
    }

    return res.status(404).json({
      status: "Not Found",
      message: `Activity with ID ${activity_id} Not Found`
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router