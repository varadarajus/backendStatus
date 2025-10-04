const sqlit3 = require('sqlite3').verbose();
const db=new sqlit3.Database("/user.db");

db.run("create table if not exists user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT)");

module.exports=db;