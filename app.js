
 
// !Связь один-ко-многим  Sequelize применяется метод hasMany()
// может производить множество товаров. То есть мы имеем отношение одни-ко-многим (1 компания - много товаров). 
 
const Sequelize = require("sequelize");
 
const sequelize = new Sequelize("store", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    port:3307,
    define: {
      timestamps: false
    }
});
 
const Product = sequelize.define("product", {
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
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
 
const Company = sequelize.define("company", {
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
Company.hasMany(Product);
 
sequelize.sync({force:true}).then(()=>{
  console.log("Tables have been created");
}).catch(err=>console.log(err));


//создаем одну компанию
Company.create({ name: "Apple"}).then(res=>{
     
  // получаем id созданной компании
  const compId = res.id;
  //создаем пару товаров для этой компании
  Product.create({name:"iPhone XS", price: 400, companyId: compId}).catch(err=>console.log(err));
  Product.create({name:"iPhone XR", price: 350, companyId: compId}).catch(err=>console.log(err));
   
}).catch(err=>console.log(err));


// найдем компанию с id=1
Company.findByPk(1).then(company=>{
  if(!company) return console.log("Company not found");
  console.log(company);
  // и добавим для нее один объект
  company.createProduct({name:"iPhone X", price: 300,}).catch(err=>console.log(err));
}).catch(err=>console.log(err));

//! Например, получим все товары компании с id=1:
Company.findByPk(1).then(company=>{
   
  if(!company) return console.log("Company not found");
  company.getProducts()
  .then(res=>{
    for(let i=0; i<res.length;i++)
      console.log(res[i].name, " - ", company.name);
  })
  .catch(err=>console.log(err));
}).catch(err=>console.log(err));