// const mysql = require("mysql2");
  
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "usersdb2",
//   password: "root",
//   port:"3307"

// });
 
// const user = ["Tom", 29];
// const sql = "INSERT INTO users(name, age) VALUES(?, ?)";
 
// connection.query(sql, user, function(err, results) {
//     if(err) console.log(err);
//     else console.log("Данные добавлены");
// });
 
// connection.end();


const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "mysql",
  password: "root",
  port:"3307"

}).promise();
 
// получение объектов
connection.query("SELECT * FROM db")
          .then(result =>{
            console.log(result);
          })
          .catch(err =>{
            console.log(err);
          });