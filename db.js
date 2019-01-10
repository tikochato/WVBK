const mysql   =   require("mysql"),
      db_config = require("./db_config");


let pool= null;
//el archivo db_config tiene formato json

exports.connect = function(done){
  pool= mysql.createPool({
    connectionLimit : 10,
    host            : db_config.host,
    user            : db_config.user,
    password        : db_config.password,
    database        : db_config.db
  });
  done();
};


exports.get= function(){
  return  pool;
};

exports.end=function(){
  console.log("cerrando conexión");
  pool.end();
};
