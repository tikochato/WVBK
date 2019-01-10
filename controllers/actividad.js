const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create= function(actividad,done){
  if(actividad.entidades && actividad.entidades.length > 0){
    actividad.entidades = ',' + actividad.entidades.toString() + ',';
    actividad.entidad_asigna = actividad.entidad_asigna ? actividad.entidad_asigna : actividad.entidadAsigna;
  }
  queryBuilder.insert("Actividad", actividad, function(err, query,valores){
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

exports.edit= function(actividad, done){
  if(actividad.entidades && actividad.entidades.length > 0){
    actividad.entidades = ',' + actividad.entidades.toString() + ',';
    actividad.entidad_asigna = actividad.entidad_asigna ? actividad.entidad_asigna : actividad.entidadAsigna;
  }
  queryBuilder.update("Actividad", actividad, function(err,query,valores){
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
exports.setDisable =function(actividad, done){
  queryBuilder.setDisable("Actividad", actividad, function(err,query,valores){
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
      "SELECT * FROM Actividad WHERE estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(actividadId, done){
  db.get().query(
      "SELECT * FROM Actividad WHERE actividad = ? and estado = 1", actividadId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
