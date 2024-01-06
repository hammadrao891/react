const mysql = require("mysql")

 const db =  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hammadrao",
    database:"student"
  });

  module.exports=db