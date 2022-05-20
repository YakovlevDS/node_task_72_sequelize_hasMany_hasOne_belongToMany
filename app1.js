// !Связь один-к-одному  метод hasOne()

const Sequelize = require("sequelize");
 
const sequelize = new Sequelize("game", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    port:3307,
    define: {
      timestamps: false
    }
});
const Coach = sequelize.define("coach", {
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
const Team = sequelize.define("team", {
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
 
Coach.hasOne(Team, { onDelete: "cascade"});
 
sequelize.sync({force:true}).then(()=>{
 
  console.log("Tables have been created");
}).catch(err=>console.log(err));


// добавляем тренера
Coach.create({ name: "Tom Smith"})
.then(coach=>{
    // Добавляем команду
    Team.create({name:"Real Madrid"}).then(team=>{
        // устанавливаем для тренера команду
        coach.setTeam(team).catch(err=>console.log(err));
    });
}).catch(err=>console.log(err));

// получаем тренера с id=1
Coach.findByPk(1).then(coach=>{
    if(!coach) return console.log("Coach not found");
    coach.getTeam().then(team=>{
        console.log(coach.name, "-", team.name);
    });
});

Coach.findAll({
    attributes: ["name"], // включаем столбец name из таблицы coaches
    include: [{
      model: Team,
      attributes: ["name"]  // включаем столбец name из таблицы teams
    }]
  }).then(coaches => {
      for(coach of coaches){
        console.log(coach.name, "-", coach.team.name);
      }
});