const express = require("express");
const app = express();
const cors = require("cors");
const { createPool } = require("mysql");

const db = createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "usersdb",
  connectionLimit: 10,
});

app.get("/", (req, res) => {
  res.send("Welcome to Dashboard");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post("/login", function (req, res) {
  if (req.body != null || !(req.body === undefined)) {
    const emailInput = req.body.email;
    const passwordInput = req.body.password;

    db.query(
      "select * from account WHERE email = ? AND password = ?",
      [emailInput, passwordInput],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          if (result.length > 0) {
            if (passwordInput == result[0].password) {
              res.status(200).send({
                message: "Successful Login",
              });
            } else {
              res.status(200).send({
                message: "Password Incorrect",
              });
            }
          } else {
            res.send({ message: "User not Found" });
          }
        }
      }
    );
  } else {
    res.status(200).send({
      message: "Error",
    });
  }
});

app.post("/signup", function (req, res) {
  if (req.body != null || !(req.body === undefined)) {
    const emailInput = req.body.email;
    const passwordInput = req.body.password;

    db.query(
      "select * from account WHERE email = ?",
      [emailInput],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          if (result.length > 0) {
            res.send({ message: "Email already exists" });
          } else {
            db.query(
              "INSERT INTO account (email, password) VALUES (?,?)",
              [emailInput, passwordInput],
              (err) => {
                if (err) {
                  res.send({ err: err });
                } else {
                  res.status(200).send({
                    message: "User successfully created",
                  });
                }
              }
            );
          }
        }
      }
    );
  } else {
    res.status(200).send({
      message: "Error",
    });
  }
});

app.post("/contact", function (req, res) {
  db.query("select * from contacts", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "No Contacts Found" });
      }
    }
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
