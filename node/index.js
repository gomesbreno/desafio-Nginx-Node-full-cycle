const express = require("express");
const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  var sql =
    "CREATE TABLE people (id int auto_increment,name VARCHAR(255),primary key (id))";
  connection.query(sql, (err) => {
    if (err) throw err;
    console.log("Table created");
  });
});

// connection.end();

const possiblePersonNameList = [
  "Breno",
  "Matheus",
  "Amanda",
  "Jonas",
  "Nathan",
  "Bruno",
  "Nilton",
  "Erick",
];

const insertNewPerson = () => {
  const index = Math.floor(possiblePersonNameList.length * Math.random());
  const sql = `INSERT INTO people(name) values('${possiblePersonNameList[index]}')`;
  connection.query(sql);
};

const getPeopleList = (res) => {
  const sql = `SELECT * FROM people;`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    let list = "<ul>";
    results.map((result) => {
      const { name } = result;
      list += `<li><h2>${name}</h2></li>`;
    });
    list += "</ul>";
    res.send(`<h1>Full Cycle Rocks!</h1><br/>${list}`);
  });
};

app.get("/", (req, res) => {
  insertNewPerson();
  getPeopleList(res);
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
