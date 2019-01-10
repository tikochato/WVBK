const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create = function(puesto, done){
  queryBuilder.insert("Puesto", puesto, function(err, query,valores){
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

exports.edit = function (puesto, done){
  queryBuilder.update("Puesto", puesto, function(err, query, valores){
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
exports.setDisable =function(puesto, done){
  queryBuilder.setDisable("Puesto", puesto, function(err,query,valores){
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
      "SELECT * FROM Puesto where estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getAllExtras = function(done){
  db.get().query(
      "SELECT p.*, e.nombre nombre_entidad, u.nombre_usuario, r.rol, r.nombre nombre_rol FROM Puesto p JOIN Entidad e ON p.entidad = e.entidad AND e.estado = 1 LEFT JOIN Usuario u ON p.usuario = u.usuario AND u.estado = 1 LEFT JOIN Rol r ON r.rol = p.rol AND r.estado = 1 WHERE p.estado = 1",
      function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getByEntidades = function(entidades, done){
  var query = "SELECT p.*, pe.nombres, pe.apellidos FROM Puesto p LEFT JOIN Usuario u ON p.usuario = u.usuario AND u.estado=1 LEFT JOIN Persona pe ON pe.persona = u.persona  AND pe.estado=1 WHERE p.estado = 1 ";
  if(entidades !== "-1"){
    query += " and p.entidad in ("+entidades+") "
  }
  db.get().query(
      query, function(err, rows){
        if(err){ return done(err);}
        return done(null, rows);
      }
  );
};

exports.getById = function(puestoId, done){
  db.get().query(
      "SELECT * FROM Puesto WHERE puesto = ? and estado = 1", puestoId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
