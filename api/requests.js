const express = require("express");
require("dotenv").config();
const router = express.Router();
const { Client } = require("pg");
const { auth, getUserFromToken } = require("./auth_functions.js");
const options = {
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

router.get("/api/cards/:user", auth, async (req, res) => {
  const sql = "SELECT * FROM cards_cards WHERE user_name=$1";
  const db = new Client(options);
  db.connect();
  db.query(sql, [req.params.user], (err, result) => {
    res.send(result.rows);
    db.end();
  });
});

router.post("/api/post", auth, (req, res) => {
  const user = getUserFromToken(req);
  let collection = req.body.collection;
  if (!collection) collection = "Collection";
  const sql = `INSERT INTO cards_cards (user_name, rus, eng, lang, collection) VALUES ($1,$2,$3, $4, $5)`;
  const values = [user, req.body.rus, req.body.eng, "eng", collection];
  const db = new Client(options);
  db.connect();
  db.query(sql, values, (err, result) => {
    db.end();
    res.sendStatus(200);
  });
});

router.delete("/api/deleteCard", auth, (req, res) => {
  const sql = `DELETE FROM cards_cards WHERE id=$1`;
  const values = [req.body.id];
  const db = new Client(options);
  db.connect();
  db.query(sql, values, (err, result) => {
    db.end();
    res.sendStatus(200);
  });
});

module.exports = router;
