const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  user: process.env.USER || "root",
  host: process.env.HOST || "localhost",
  password: process.env.PASSWORD || "root",
  database: process.env.DATABASE || "e_commerce",
});

db.connect((err) => {
  if (err) console.log(err.message);
  else console.log("DB Connection Done");
});

// console.log(`${process.env.DATABASE}`);
module.exports = db;
