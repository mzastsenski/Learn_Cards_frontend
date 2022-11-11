const express = require("express");
require("dotenv").config();
const router = express.Router();
// const db = require("./db");
const { auth } = require("./functions.js");
const { MongoClient } = require("mongodb");
const { Client } = require("pg");
const MONGO_URI = require("./db.js");
const db = new Client({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

router.get("/api/cards1", (req, res) => {
  const sql = "SELECT * FROM cards";
  db.connect();
  db.query(sql, (err, result) => {
    res.send(result.rows[0].cards);
  });
});

router.post("/api/post", (req, res) => {
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

router.get("/api/cards", (req, res) => {
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

router.get("/test", (req, res) => {
  res.send(202);
});

router.get("/api/posts1", (req, res) => {
  db.query(`SELECT * FROM posts`, (err, result) => {
    res.send(result);
  });
});
router.get("/api/userPosts/:user", (req, res) => {
  const user = req.params.user;
  const sql = `SELECT * FROM posts WHERE user='${user}'`;
  db.query(sql, (err, result) => {
    res.send(result);
  });
});
router.get("/api/comments/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM comments WHERE post_id=${id}`;
  db.query(sql, (err, result) => res.send(result));
});
router.post("/api/post", auth, (req, res) => {
  let time = new Date().toLocaleString(
    "us",
    ~{
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }
  );
  const sql = `INSERT INTO posts (user, title, subtitle, body, img, time) VALUES (?,?,?,?,?,?)`;
  const values = [
    req.body.user,
    req.body.title,
    req.body.Subtitle,
    req.body.Body,
    req.body.imgSource,
    time,
  ];
  db.query(sql, values);
});
router.put("/api/edit", auth, (req, res) => {
  const sql = `UPDATE posts SET title=?, subtitle=?, body=?, img=? WHERE id=?`;
  const values = [
    req.body.title,
    req.body.Subtitle,
    req.body.Body,
    req.body.imgSource,
    req.body.id,
  ];
  db.query(sql, values);
});
router.delete("/api/delete", auth, (req, res) => {
  const sql = `DELETE FROM posts WHERE id=?`;
  const values = [req.body.id];
  db.query(sql, values);
});
router.post("/api/newComment", (req, res) => {
  const sql = `INSERT INTO comments (user, comment, post_id) VALUES (?,?,?)`;
  const values = [req.body.user, req.body.comment, req.body.post_id];
  db.query(sql, values, (err) => {
    if (err) console.log(err);
  });
});
router.delete("/api/deleteComment", (req, res) => {
  const sql = `DELETE FROM comments WHERE id=${req.body.id}`;
  const sql2 = `DELETE FROM comments_likes WHERE comment_id=${req.body.id}`;
  db.query(sql);
  db.query(sql2);
});

module.exports = router;
