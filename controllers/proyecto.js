const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create= function(proyecto,done){
  queryBuilder.insert("Proyecto", proyecto, function(err, query,valores){
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

exports.edit= function(proyecto, done){
  queryBuilder.update("Proyecto", proyecto, function(err,query,valores){
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

exports.setDisable =function(proyecto, done){
  queryBuilder.setDisable("Proyecto", proyecto, function(err,query,valores){
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
      "SELECT * FROM Proyecto WHERE estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getAllByPrograma = function(programaId, done){
  db.get().query(
      "SELECT * FROM Proyecto WHERE programa = ? and estado = 1", [programaId], function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getAllByUsuario = function(usuarioId, done){
  db.get().query(
      "SELECT p.* FROM Proyecto p JOIN Acta_Constitucion a ON p.proyecto = a.proyecto AND a.estado = 1 JOIN Entidad e ON a.entidad = e.entidad AND e.estado = 1 JOIN Puesto pu ON e.entidad = pu.entidad AND pu.estado = 1 WHERE pu.usuario = ? AND p.estado = 1", [usuarioId], function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(proyectoId, done){
  db.get().query(
      "SELECT * FROM Proyecto WHERE proyecto = ? and estado = 1", [proyectoId], function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
