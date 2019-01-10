const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create = function(reporte_frecuencia, done){
  queryBuilder.insert("reporte_frecuencia", reporte_frecuencia, function(err, query,valores){
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

exports.edit = function (reporte_frecuencia, done){
  queryBuilder.update("reporte_frecuencia", reporte_frecuencia, function(err, query, valores){
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

exports.setDisable =function(reporte_frecuencia, done){
  queryBuilder.setDisable("reporte_frecuencia", reporte_frecuencia, function(err,query,valores){
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
      "SELECT * FROM Reporte_Frecuencia where estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(reporte_frecuenciaId, done){
  db.get().query(
      "SELECT * FROM Reporte_Frecuencia WHERE reporte_frecuencia = ? and estado = 1", reporte_frecuenciaId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
