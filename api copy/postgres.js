const express = require("express");
const router = express.Router();
require("dotenv").config();
const { Client } = require("pg");
const postgres = new Client({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

postgres.connect();

router.get("/api/cards1", (req, res) => {
  const sql = "SELECT * FROM cards";
  postgres.query(sql, (err, result) => {
    res.send(result.rows[0].cards);
  });
});

router.post("/api/post1", (req, res) => {
  console.log(req.body);
  const sql = `UPDATE cards SET cards=$1 WHERE id=1`;
  const values = [JSON.stringify(req.body)];
  postgres.query(sql, values, (err) => {
    if (err) console.log(err);
    res.sendStatus(200);
  });
});

router.get("/phones", (req, res) => {
  const sql = "SELECT * FROM phones";
  postgres.query(sql, (err, result) => {
    res.send(result.rows);
  });
});
module.exports = router;
