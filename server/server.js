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
      "select * from account WHERE email = ?",
      [emailInput],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          if (result.length > 0) {
            if (passwordInput == result[0].password) {
              res.status(200).send({
                statusCode: 200,
                message: "Successful Login",
              });
            } else {
              res.status(200).send({
                statusCode: 400,
                message: "Incorrect Password",
              });
            }
          } else {
            res.status(200).send({
              statusCode: 404,
              message: "User not Found",
            });
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
    if (req.body.emailInput != "" || req.body.passwordInput != "") {
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
        res.status(200).send({
          message: "No Contacts Found",
        });
      }
    }
  });
});

app.get("/contactCount", function (req, res) {
  db.query("select count(*) as total_contact from contacts", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      if (result.length > 0) {
        res.status(200).send({
          data: result[0].total_contact,
        });
        //res.send(result[0].total_contact);
      } else {
        res.status(200).send({
          message: "No Data Found",
        });
      }
    }
  });
});

app.get("/contactCountState", function (req, res) {
  db.query(
    "select count(distinct contactState) as total_contact_state from contacts",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          res.status(200).send({
            data: result[0].total_contact_state,
          });
        } else {
          res.status(200).send({
            message: "No Data Found",
          });
        }
      }
    }
  );
});

app.post("/deleteClient", function (req, res) {
  if (req.body != null || !(req.body === undefined)) {
    db.query(
      "delete from contacts WHERE id = ?",
      [req.body.id],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          if (result.affectedRows == 1) {
            res.status(200).send({
              statusCode: 200,
              message: "Data successfully deleted",
            });
          } else {
            res.status(200).send({
              statusCode: 404,
              message: "No Data Found",
            });
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

app.post("/updateClient", function (req, res) {
  if (req.body != null || !(req.body === undefined)) {
    db.query(
      "UPDATE contacts SET contactName =?, contactStatus =? WHERE id = ?",
      [req.body.contactName, req.body.contactStatus, req.body.id],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          if (result.affectedRows == 1) {
            res.status(200).send({
              statusCode: 200,
              message: "Data successfully updated",
            });
          } else {
            res.status(200).send({
              statusCode: 404,
              message: "No Data Found",
            });
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

app.post("/alert", function (req, res) {
  db.query("select * from alerts", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(200).send({
          message: "No Alerts Found",
        });
      }
    }
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
