//! Связь многие-ко-многим

const Sequelize = require("sequelize");
 
const sequelize = new Sequelize("univer", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    port:3307,
    define: {
      timestamps: false
    }
});
 
const Student = sequelize.define("student", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
});
   
const Course = sequelize.define("course", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
});
 
// промежуточная сущность, которая связывает курс и студента
const Enrolment = sequelize.define("enrolment", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    grade: {                    // оценка студента по данному курсу
      type: Sequelize.INTEGER,
      allowNull: false
    }
});
 
Student.belongsToMany(Course, {through: Enrolment});
Course.belongsToMany(Student, {through: Enrolment});
 
 
sequelize.sync({force:true}).then(()=>{
 
    console.log("Tables have been created");
}).catch(err=>console.log(err));
// Добавление связанных данных
Course.create({ name: "JavaScript"});
Course.create({ name: "TypeScript"});
Course.create({ name: "Node.js"});
 
Student.create({ name: "Tom"});
Student.create({ name: "Bob"});
Student.create({ name: "Alice"});

// получаем пользователя с именем Tom
Student.findOne({where: {name: "Tom"}})
.then(student=>{
    if(!student) return;
     
    // добавим Тому курс по JavaScript
    Course.findOne({where: {name: "JavaScript"}})
        .then(course=>{
            if(!course) return;
            student.addCourse(course, {through:{grade:1}});
    });
});

// Получение связанных данных
Student.findOne({where: {name: "Tom"}})
.then(student=>{
    if(!student) return;
    student.getCourses().then(courses=>{
        for(course of courses){
            console.log(course.name);
        }
    });
});

Student.findOne({where: {name: "Tom"}})
.then(student=>{
    if(!student) return;
    student.getCourses().then(courses=>{
        for(course of courses){
            console.log("course:", course.name, "grade:", course.enrolment.grade);
        }
    });
});
// Удаление связанных данных
Student.findOne({where: {name: "Tom"}})
.then(student=>{
    if(!student) return;
    student.getCourses().then(courses=>{
        for(course of courses){
            if(course.name==="JavaScript") course.enrolment.destroy();
        }
    });
});