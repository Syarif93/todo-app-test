const { Router } = require("express")
const router = Router()
const { Activity } = require("../db/models")

router.get("/activity-groups", async (req, res) => {
  try {
    const activities = await Activity.findAll()

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
    const activity = await Activity.findByPk(activity_id)

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
    const activity = await Activity.create({
      title, email
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
    const activity = await Activity.findByPk(activity_id)

    if(activity) {
      await activity.update({ title })

      return res.status(202).json({
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

router.delete("/activity-groups/:activity_id", async (req, res) => {
  const { activity_id } = req.params

  try {
    const activity = await Activity.findByPk(activity_id)

    if(activity) {
      await activity.destroy()

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