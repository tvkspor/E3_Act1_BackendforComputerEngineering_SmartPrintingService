const mysql = require("mysql2");

//Connect Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});
db.connect((e) => {
  if (e) {
    throw e;
  }
  console.log("Connection success");
});

module.exports = db;
