const express = require("express");
require("dotenv").config();
const router = express.Router();
const { Client } = require("pg");
const { auth, getUserFromToken } = require("./auth_functions.js");
const db = new Client({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
db.connect();

router.get("/api/cards/:user", (req, res) => {
  const sql = "SELECT * FROM cards_cards WHERE user_name=$1";
  db.query(sql, [req.params.user], (err, result) => {
    res.send(result.rows);
  });
});

router.post("/api/post", auth, (req, res) => {
  const user = getUserFromToken(req);
  let collection = req.body.collection;
  if (!collection) collection = "Collection";
  const sql = `INSERT INTO cards_cards (user_name, rus, eng, lang, collection) VALUES ($1,$2,$3, $4, $5)`;
  const values = [user, req.body.rus, req.body.eng, "eng", collection];
  db.query(sql, values, (err, result) => {
    res.sendStatus(200);
  });
});

router.delete("/api/deleteCard", auth, (req, res) => {
  const sql = `DELETE FROM cards_cards WHERE id=$1`;
  const values = [req.body.id];
  db.query(sql, values, (err, result) => {
    res.sendStatus(200);
  });
});

module.exports = router;
