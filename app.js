// Передаваемые в метод настройки конфигурации могут содержать ряд параметров. Наиболее используемые из них:

// host: хост, на котором запущен сервер mysql. По умолчанию имеет значение "localhost"

// port: номер порта, на котором запущен сервер mysql. По умолчанию имеет значение "3306"

// user: пользователь MySQL, который используется для подключения

// password: пароль для пользователя MySQL

// database: имя базы данных, к которой идет подключение. Необязательный параметр. Если он не указан, то подключение идет в целом к северу

// charset: кодировка для подключения, например, по умолчанию используется "UTF8_GENERAL_CI".

// timezone: часовой пояс сервера MySQL. This is used to type cast server date/time values to JavaScript. По умолчанию имеет значение "local"

const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "mysql",
  password: "root",
  port:"3307"


});
// тестирование подключения
 connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });
 // закрытие подключения
 connection.end(function(err) {
  if (err) {
    return console.log("Ошибка: " + err.message);
  }
  console.log("Подключение закрыто");
});