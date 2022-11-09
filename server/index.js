const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
dotenv.config();

const db = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);
  const sqlLoginQuery =
    "SELECT * FROM login_details WHERE username = ? AND password = ?;";
  db.query(sqlLoginQuery, [username, password], (err, result) => {
    console.log(result);
    if (result.length) {
      res.send(result);
    } else {
      res.send("unverified");
    }
  });
});

app.post("/api/exCredentials", (req, res) => {
  const username = req.body.username;
  console.log(username);
  const sqlLoginQuery = "SELECT * FROM login_details WHERE username = ?;";
  db.query(sqlLoginQuery, [username], (err, result) => {
    console.log(result);
    if (result.length) {
      res.send("cUnavailable");
    } else {
      res.send("cAvailable");
    }
  });
});

app.post("/register", (req, res) => {
  const login = req.body.loginDetails;
  const personal = req.body.personalDetails;
  console.log(login);
  console.log(personal);
  res.send("Successful");
  const loginRegisterQuery =
    "INSERT INTO login_details VALUES( ? , ? , ? , ? );";
  const personalRegisterQuery =
    "INSERT INTO patient_details VALUES( ? , ? , ? , ? , ? , ? )";
  db.query(
    loginRegisterQuery,
    [login.patient_id, login.username, login.password, login.registrationDate],
    (err, result) => {
      console.log(err);
    }
  );
  db.query(
    personalRegisterQuery,
    [
      login.patient_id,
      personal.firstName,
      personal.lastName,
      parseInt(personal.age),
      personal.contact,
      personal.email,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get("/", (req, res) => {
  res.send("Base");
});

app.listen(3300, () => {
  console.log("Express Server 3300");
});