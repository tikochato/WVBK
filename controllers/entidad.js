const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create = function(entidad, done){
  queryBuilder.insert("Entidad", entidad, function(err, query,valores){
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

exports.edit = function (entidad, done){
  queryBuilder.update("Entidad", entidad, function(err, query, valores){
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

exports.setDisable =function(entidad, done){
  queryBuilder.setDisable("Entidad", entidad, function(err,query,valores){
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
      "SELECT * FROM Entidad where estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(entidadId, done){
  db.get().query(
      "SELECT * FROM Entidad WHERE entidad = ? and estado = 1", entidadId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getByPrograma = function(programaId, done){
  db.get().query(
      "SELECT e.entidad, e.nombre FROM Acta_Constitucion ac JOIN Proyecto p ON ac.proyecto = p.proyecto AND p.estado = 1 JOIN Programa pa ON pa.programa = p.programa AND pa.estado = 1 JOIN Entidad e ON ac.entidad = e.entidad AND e.estado = 1 WHERE pa.programa = ? and ac.estado = 1",
      programaId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
