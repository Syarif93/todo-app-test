const express = require("express")
const app = express()
const dotenv = require("dotenv")
const TodoRoutes = require("./routes/todo-routes")
const ActivityRoutes = require("./routes/activity-toutes")
const { default: helmet } = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser")
const compression = require("compression")

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(bodyParser.json({ limit: "30mb" }))
app.use(morgan("dev"))
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(express.json())

dotenv.config()

const port = process.env.APP_PORT

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server online!" })
})

app.use("/", TodoRoutes)
app.use("/", ActivityRoutes)

app.listen(port, () => {
  console.log("App listening at http://localhost:" + port);
})