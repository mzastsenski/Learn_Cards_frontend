const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(__dirname + "/build"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(require("./mongo"));
app.use(require("./postgres"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'index.html'))
//  // res.redirect('/index.html');
// });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
