const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create = function(persona, done){
  queryBuilder.insert("Persona", persona, function(err, query,valores){
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

exports.edit = function (persona, done){
  queryBuilder.update("Persona", persona, function(err, query, valores){
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

exports.setDisable =function(persona, done){
  queryBuilder.setDisable("Persona", persona, function(err,query,valores){
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
      "SELECT * FROM Persona where estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(personaId, done){
  db.get().query(
      "SELECT * FROM Persona WHERE persona = ? and estado = 1", personaId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getAllWithUser = function(done){
  db.get().query(
      "SELECT p.*, u.usuario, u.nombre_usuario FROM Persona p LEFT JOIN Usuario u ON p.persona = u.persona AND u.estado = 1 where p.estado = 1 ", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
