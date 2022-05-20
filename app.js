// Sequelize - это ORM-библиотека для приложений на Node.js
// При использовании Sequelize мы можем не писать SQL-запросы, а работать с данными как с обычными объектами. 
// Причем Sequelize может работать с рядом СУБД - MySQL, Postgres, MariaDB, SQLite, MS SQL Server.
// Для свойства dialect 
// mysql
// mariadb
// sqlite
// postgres
// mssql
// Ключевым компонентом в работе Sequelize с бд являются модели.
// ! метода define()
// const User = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   age: {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   }
// });
//!  Второй способ определения модели:
// class User extends Model {}
// User.init({
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   age: {
//     type: Sequelize.INTEGER,
//     allowNull: false
//   }
// }, {
//   sequelize,
//   modelName: "user"
// });

//! примере модели
const Sequelize = require("sequelize");
const sequelize = new Sequelize("usersdb", "root", "root", {
  dialect: "mysql",
  host: "localhost",
  port:3307,
  define: {
    timestamps: false
  }
});
const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
sequelize.sync().then(result=>console.log(result))
.catch(err=> console.log(err));


//! Добавление данных

User.create({
  name: "Tom",
  age: 35
}).then(res=>{
  console.log(res);
}).catch(err=>console.log(err));

User.create({
  name: "Bob",
  age: 31
}).then(res=>{
  const user = {id: res.id, name: res.name, age: res.age}
  console.log(user);
}).catch(err=>console.log(err));

// !Получение данных
User.findAll({raw:true}).then(users=>{
  console.log(users);
}).catch(err=>console.log(err));

//! Простейшая фильтрация
User.findAll({where:{name: "Tom"}, raw: true })
.then(users=>{
  console.log(users);
}).catch(err=>console.log(err));

// !Получение одного объекта findByPk() (получает объект по первичному ключу)
User.findByPk(2)
.then(user=>{
    if(!user) return; // если пользователь не найден
    console.log(user.name);
}).catch(err=>console.log(err));

//! Получение одного объекта findOne()

User.findOne({where: {name: "Tom"}})
.then(user=>{
    if(!user) return;
    console.log(user.name, user.age);
}).catch(err=>console.log(err));

//! Для обновления применяется метод update()

User.update({ age: 36 }, {
  where: {
    name: "Bob"
  }
}).then((res) => {
  console.log(res);
});

//!Для удаления используется метод destroy()

User.destroy({
  where: {
    name: "Bob"
  }
}).then((res) => {
  console.log(res);
});