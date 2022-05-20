//! Создание базы данных
// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   port:'3307'
// });
 
// connection.query("CREATE DATABASE usersdb1",
//   function(err, results) {
//     if(err) console.log(err);
//     else console.log("База данных создана");
// });
// connection.end();

// //! Создание таблицы в базе данных
// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   port:'3307',
//   database: "usersdb"
//   });
//   const sql = `create table if not exists users(
//     id int primary key auto_increment,
//     name varchar(255) not null,
//     age int not null
//   )`;
   
//   connection.query(sql, function(err, results) {
//       if(err) console.log(err);
//       else console.log("Таблица создана");
//   });
//   connection.end();

//! Создание записи в таблице users  в базе данных usersdb
// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     port:'3307',
//     database: "usersdb"
// }).promise();
// const sql = "INSERT INTO users (name, age) VALUES (?, ?)";
// const user = ["Stan", 19];
// connection.query(sql, user)
//           .then(result =>{
//             console.log(result[0]);
//           })
//           .catch(err =>{
//             console.log(err);
//           });

//! INSERT Создание записи в таблице users  в базе данных usersdb

// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//      host: "localhost",
//     user: "root",
//     password: "root",
//     port:'3307',
//     database: "usersdb"
//   });
//   const sql = `INSERT INTO users(name, age) VALUES('Sam', 31)`;
//   connection.query(sql, function(err, results) {
//       if(err) console.log(err);
//       console.log(results);
//   });
//   connection.end();

//! INSERT Создание много записей в таблице users  в базе данных usersdb

// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//      host: "localhost",
//     user: "root",
//     password: "root",
//     port:'3307',
//     database: "usersdb"
//   });
//   const users = [
//     ["Bob", 22],
//     ["Alice", 25],
//     ["Kate", 28]
//   ];
//   const sql = `INSERT INTO users(name, age) VALUES ?`;
   
//   connection.query(sql, [users], function(err, results) {
//       if(err) console.log(err);
//       console.log(results);
//   });
//   connection.end();

//!получение записей в таблице users  в базе данных usersdb

// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//      host: "localhost",
//     user: "root",
//     password: "root",
//     port:'3307',
//     database: "usersdb"
//   });
 
//   const sql = `SELECT * FROM users`;
// connection.query(sql, function(err, results) {
//     if(err) console.log(err);
//     console.log(results);
// });
//   connection.end();

//!получение записей только name в таблице users  в базе данных usersdb

// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//      host: "localhost",
//     user: "root",
//     password: "root",
//     port:'3307',
//     database: "usersdb"
//   });
 
//   const sql = "SELECT * FROM users";
//   connection.query(sql,  function(err, results) {
//       if(err) console.log(err);
//       const users = results;
//       for(let i=0; i < users.length; i++){
//         console.log(users[i].name);
//       }
// });
//   connection.end();

//!Выполним фильтрацию данных с применением выражения WHERE: в таблице users  в базе данных usersdb

// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//      host: "localhost",
//     user: "root",
//     password: "root",
//     port:'3307',
//     database: "usersdb"
//   });
 
//   const sql = `SELECT * FROM users WHERE name=? AND age=?`;
//   const filter = ["Alice", 25];
//   connection.query(sql, filter, function(err, results) {
//       if(err) console.log(err);
//       console.log(results);
//   });
//   connection.end();


//!Для обновления данных применяется sql-команда UPDATE: в таблице users  в базе данных usersdb

// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//      host: "localhost",
//     user: "root",
//     password: "root",
//     port:'3307',
//     database: "usersdb"
//   });
 
//   const sql = `UPDATE users SET age=? WHERE name=?`;
// const data = [38, "Tom"];
// connection.query(sql, data, function(err, results) {
//     if(err) console.log(err);
//     console.log(results);
// });
//   connection.end();

//! Для удаления применяется sql-команда DELETE:в таблице users  в базе данных usersdb

const mysql = require("mysql2");
const connection = mysql.createConnection({
     host: "localhost",
    user: "root",
    password: "root",
    port:'3307',
    database: "usersdb"
  });
 
const sql = "DELETE FROM users WHERE name=?";
const data = ["Sam"]; // удаляем пользователей с именем Sam
connection.query(sql, data, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
  connection.end();