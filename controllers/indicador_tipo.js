const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create = function(indicador_tipo, done){
  queryBuilder.insert("Indicador_Tipo", indicador_tipo, function(err, query,valores){
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

exports.edit = function (indicador_tipo, done){
  queryBuilder.update("Indicador_Tipo", indicador_tipo, function(err, query, valores){
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

exports.setDisable =function(indicador_tipo, done){
  queryBuilder.setDisable("Indicador_Tipo", indicador_tipo, function(err,query,valores){
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
      "SELECT * FROM Indicador_Tipo where estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(indicador_tipoId, done){
  db.get().query(
      "SELECT * FROM Indicador_Tipo WHERE indicador_tipo = ? and estado = 1", indicador_tipoId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
