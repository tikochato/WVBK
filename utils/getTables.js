const db = require ("../db.js");

exports.getTables =function(nombre,done){
  db.get().query("SELECT table_name FROM information_schema.tables where table_schema = ?",nombre,
    function(err, rows){
      if(err) return done(err);
      return done(null,JSON.stringify(rows));
    }
  );
};

exports.getColumns = function(nombre,tabla,done){
  let values =[nombre, tabla];
  db.get().query("SELECT COLUMN_NAME FROM information_schema.columns where table_schema = ? and TABLE_NAME = ? and COLUMN_KEY != 'PRI'",values,
    function(err, rows){
      if(err)return done(err);
      return done(null,JSON.stringify(rows));
    }
  );
}

exports.getPrimaryKeys=function(nombre, tabla, done){
  let values =[nombre, tabla];
  db.get().query("SELECT COLUMN_NAME FROM information_schema.columns where table_schema = ? and TABLE_NAME = ? and COLUMN_KEY = 'PRI'",values,
    function(err, rows){
      if(err)return done(err);
      return done(null,JSON.stringify(rows));
    }
  );
};
