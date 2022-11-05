const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const PORT = process.env.PORT || 4000;
// const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI = require("./db.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/frontend"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/api/post", (req, res) => {
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

app.get("/api/cards", (req, res) => {
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

app.get("/test", (req, res) => {
  res.send(202);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
  // res.redirect('/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
