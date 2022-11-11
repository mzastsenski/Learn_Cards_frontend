const express = require("express");
require("dotenv").config();
const router = express.Router();
// const db = require("./db");
const { auth, getUserFromToken } = require("./auth_functions.js");
const { MongoClient } = require("mongodb");
const { Client } = require("pg");
const MONGO_URI = require("./db.js");
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

router.post("/api/postMongo", (req, res) => {
  MongoClient.connect(MONGO_URI, (err, db) => {
    if (err) throw err;
    db.db("testDB")
      .collection("cards")
      .updateOne({ id: 1 }, { $set: { cards: req.body } }, (err, result) => {
        if (err) throw err;
        db.close();
        // console.log("1 document updated");
        // res.json("1 document updated");
      });
  });
});

router.get("/api/cardsMongo", (req, res) => {
  MongoClient.connect(MONGO_URI, (err, db) => {
    if (err) throw err;
    db.db("testDB")
      .collection("cards")
      .find({})
      .toArray((err, result) => {
        if (err) console.log(err);
        db.close();
        res.json(result[0].cards);
      });
  });
});

module.exports = router;
