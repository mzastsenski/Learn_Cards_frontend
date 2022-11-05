const express = require("express");
const router = express.Router();
require("dotenv").config();
const { MongoClient } = require("mongodb");

router.post("/api/post", (req, res) => {
  MongoClient.connect(process.env.MONGO_URI, (err, db) => {
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

router.get("/api/cards", (req, res) => {
  MongoClient.connect(process.env.MONGO_URI, (err, db) => {
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

router.get("/test", (req, res) => {
  res.send(202);
});

module.exports = router;
