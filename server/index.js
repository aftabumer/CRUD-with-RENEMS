const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "pass123",
  database: "employeesystem",
  port: "3306",
});

db.connect(function (err) {
  if (!err) {
    console.log("Database is connected");
  } else {
    console.log("Error connecting database", err);
  }
});

// app.get("/", (req, res) => {});

app.post("/create", (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log("error", err);
        res.send(err);
      } else {
        console.log("result", result);
        res.send("Value Inserted");
      }
    }
  );
});

// app.get("/employees", (req, res) => {
//   db.query("SELECT * from employees", (err, result) => {
//     if (err) {
//       console.log("error", err);
//       res.send(err);
//     } else {
//       console.log(result, "result");
//       res.send(result);
//     }
//   });
// });

app.get("/employees", (req, res) => {
  db.query("call GetAllEmpl();", (err, result) => {
    if (err) {
      console.log("error", err);
      res.send(err);
    } else {
      console.log(result[0], "result");
      res.send(result[0]);
    }
  });
});

app.listen(3001, () => {
  console.log("yahoooo!, your server is running on port 3001");
});
