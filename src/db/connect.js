const mysql = require('mysql2/promise');
require("dotenv").config()

const dbName = process.env.NODE_ENV === "development" ? "todo4" : process.env.MYSQL_DBNAME
const user = process.env.NODE_ENV === "development" ? "root" : process.env.MYSQL_USER
const password = process.env.NODE_ENV === "development" ? "" : process.env.MYSQL_PASSWORD
const host = process.env.NODE_ENV === "development" ? "127.0.0.1" : process.env.MYSQL_HOST

const db = mysql.createConnection({
  host: host,
  user: user,
  database: dbName,
  password: password
});

module.exports = db