const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: "database",
  user: "root",
  password: "root",
  database: "devopsdb"
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

app.get("/api", (req, res) => {
  db.query("SELECT message FROM demo LIMIT 1", (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

app.listen(port, () => console.log(`Backend running on port ${port}`));
