// Пулы подключений позволяют уменьшить время, затраченное на подключение
//  к серверу MySQL, благодаря повторному использованию подключений. 
// Пул подключений создается с помощью функции createPool(). 

const mysql = require("mysql2");
const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "usersdb",
  password: "root",
  port: "3307"
}).promise(); //пулы поддерживают работу с промисами:


pool.execute("UPDATE users SET age=age+1 WHERE name=?", ["Stan"]) // изменение объектов
    .then(result =>{ 
      console.log(result[0]);
      return pool.execute("SELECT * FROM users"); // получение объектов
    })
    .then(result =>{
      console.log(result[0]);
      pool.end();
    })
    .then(()=>{
      console.log("пул закрыт");
    })
    .catch(function(err) {
      console.log(err.message);
    });