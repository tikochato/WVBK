const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create = function(reporte_tipo, done){
  queryBuilder.insert("reporte_tipo", reporte_tipo, function(err, query,valores){
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

exports.edit = function (reporte_tipo, done){
  queryBuilder.update("reporte_tipo", reporte_tipo, function(err, query, valores){
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

exports.setDisable =function(reporte_tipo, done){
  queryBuilder.setDisable("reporte_tipo", reporte_tipo, function(err,query,valores){
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
      "SELECT * FROM Reporte_Tipo", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(reporte_tipoId, done){
  db.get().query(
      "SELECT * FROM Reporte_Tipo WHERE reporte_tipo = ?", reporte_tipoId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
