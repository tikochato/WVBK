const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create = function(tipo_dato, done){
  queryBuilder.insert("tipo_dato", tipo_dato, function(err, query,valores){
    if(err){
      done(err);
    }else{
      db.get().query(query,valores,function(err, result){
          if (err) return done (err);
          else return done(null, result);
        }
      );
    }
  });
}

exports.edit = function (tipo_dato, done){
  queryBuilder.update("tipo_dato", tipo_dato, function(err, query, valores){
    if(err){
      done (err);
    }
    else{
      db.get().query(query,valores,function(err, result){
          if(err) return done(err);
          else return done (null, result);
        }
      );
    }
  });
}

exports.setDisable =function(tipo_dato, done){
  queryBuilder.setDisable("tipo_dato", tipo_dato, function(err,query,valores){
    if(err){
      done(err);
    }else{
      db.get().query(query,valores,function(err, result){
          if (err) return done (err);
          else return done(null, result);
        }
      );
    }
  }
  );
};

exports.getAll = function(done){
  db.get().query(
      "SELECT * FROM tipo_dato where estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(tipo_datoId, done){
  db.get().query(
      "SELECT * FROM tipo_dato WHERE tipo_dato = ? and estado = 1", tipo_datoId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
