const { Router } = require("express")
const router = Router()
const db = require("../db/models")
const { QueryTypes } = require("sequelize")

router.get("/activity-groups", async (req, res) => {
  try {
    const activities = await db.sequelize.query(`SELECT * FROM activities`, {
      type: QueryTypes.SELECT
    })

    if(activities.length > 0) {
      return res.status(200).json({
        status: "Success",
        message: "Success",
        data: activities
      })
    }

    return res.status(404).json({
      status: "Empty",
      message: "Activities Is Empty"
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get("/activity-groups/:activity_id", async (req, res) => {
  const { activity_id } = req.params

  try {
    const [activity] = await db.sequelize.query(`SELECT * FROM activities WHERE id = ${activity_id}`, {
      type: QueryTypes.SELECT
    })

    if(activity) {
      return res.json({
        status: "Success",
        message: "Success",
        data: activity
      })
    }

    return res.status(404).json({
      status: "Not Found",
      message: "Activity Not Found"
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.post("/activity-groups", async (req, res) => {
  const { title, email } = req.body

  try {
    const [result] = await db.sequelize.query(`INSERT INTO activities (title, email, createdAt, updatedAt) VALUES ($title, $email, $createdAt, $updatedAt)`, {
      bind: {
        title,
        email,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      type: QueryTypes.INSERT
    })
    const [activity] = await db.sequelize.query(`SELECT * FROM activities WHERE id = ${result}`, {
      type: QueryTypes.SELECT
    })

    if(activity) {
      return res.status(201).json({
        status: "Success",
        message: "Success",
        data: activity
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
    const [activity] = await db.sequelize.query(`SELECT * FROM activities WHERE id = ${activity_id}`, {
      type: QueryTypes.SELECT
    })

    if(activity) {
      await db.sequelize.query(`UPDATE activities SET title=$title, updatedAt=$updatedAt WHERE id = ${activity.id}`, {
        bind: {
          title,
          updatedAt: new Date()
        },
        type: QueryTypes.UPDATE
      })
      const [updated] = await db.sequelize.query(`SELECT * FROM activities WHERE id = ${activity_id}`, {
        type: QueryTypes.SELECT
      })

      return res.status(202).json({
        status: "Success",
        message: "Success",
        data: updated
      })
    }

    return res.status(404).json({
      status: "Not Found",
      message: "Activity Not Found"
    })
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.delete("/activity-groups/:activity_id", async (req, res) => {
  const { activity_id } = req.params

  try {
    const [activity] = await db.sequelize.query(`SELECT * FROM activities WHERE id = ${activity_id}`, {
      type: QueryTypes.SELECT
    })

    if(activity) {
      await db.sequelize.query(`DELETE FROM activities WHERE id = ${activity.id}`)

      return res.status(202).json({
        status: "Success",
        message: "Success"
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