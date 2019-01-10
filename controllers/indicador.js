const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create = function(indicador, done){
  queryBuilder.insert("Indicador", indicador, function(err, query,valores){
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

exports.edit = function (indicador, done){
  queryBuilder.update("Indicador", indicador, function(err, query, valores){
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

exports.setDisable =function(indicador, done){
  queryBuilder.setDisable("Indicador", indicador, function(err,query,valores){
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
      "SELECT * FROM Indicador where estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getAllExtended = function(done){
  db.get().query(
      "SELECT i.indicador, i.nombre, i.name, i.indicador_id, u.nombre unidad_medida, u.simbolo FROM Indicador i, unidad_medida u where i.estado = 1 and u.unidad_medida =i.unidad_medida", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(indicadorId, done){
  db.get().query(
      "SELECT * FROM Indicador WHERE indicador = ? and estado = 1", indicadorId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
