require("dotenv").config();
const router = require("express").Router();
// const db = require("./db");
const { Client } = require("pg");
const { auth, newAccessToken } = require("./auth_functions.js");
const options = {
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

router.post("/api/checkUser", auth, (req, res) => {
  res.json(200);
});

router.post("/api/login", (req, res) => {
  const sql = `SELECT * FROM users_cards WHERE name = $1 and password = $2`;
  const values = [req.body.user, btoa(req.body.pass)];
  const db = new Client(options);
  db.connect();
  db.query(sql, values, (err, result) => {
    if (err) throw err;
    if (result.rows[0]) {
      const accessToken = newAccessToken({ name: req.body.user });
      res.cookie("token", accessToken, {
        httpOnly: true,
        maxAge: 21 * 24 * 60 * 60 * 1000,
      });
      res.json(200);
    } else {
      res.json(401);
    }
    db.end();
  });
});

router.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json(200);
});

router.post("/api/signUp", (req, res) => {
  const sql = `SELECT * FROM users_cards WHERE name = $1`;
  const sql2 = `INSERT INTO users_cards (name, password) VALUES ($1,$2)`;
  const values1 = [req.body.user];
  const values = [req.body.user, btoa(req.body.pass)];
  const db = new Client(options);
  db.connect();
  db.query(sql, values1, (err, result) => {
    if (err) throw err;
    if (result.rows[0]) {
      res.send('"User exist"');
    } else {
      db.query(sql2, values, (err, result) => {
        if (err) throw err;
        res.send('"Success"');
      });
    }
    db.end();
  });
});

module.exports = router;
