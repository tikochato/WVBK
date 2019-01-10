const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create= function(tarea,done){
  if(tarea.entidades && tarea.entidades.length > 0){
    tarea.entidades = ',' + tarea.entidades.toString() + ',';
    tarea.entidad_asigna = tarea.entidad_asigna ? tarea.entidad_asigna : tarea.entidadAsigna;
  }
  queryBuilder.insert("Tarea", tarea, function(err, query,valores){
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

exports.edit= function(tarea, done){
  if(tarea.entidades && tarea.entidades.length > 0){
    tarea.entidades = ',' + tarea.entidades.toString() + ',';
    tarea.entidad_asigna = tarea.entidad_asigna ? tarea.entidad_asigna : tarea.entidadAsigna;
  }
  queryBuilder.update("Tarea", tarea, function(err,query,valores){
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

exports.setDisable =function(tarea, done){
  queryBuilder.setDisable("Tarea", tarea, function(err,query,valores){
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
      "SELECT * FROM Tarea WHERE estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(tareaId, done){
  db.get().query(
      "SELECT * FROM Tarea WHERE tarea = ? and estado = 1", tareaId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
