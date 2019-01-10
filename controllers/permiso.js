const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");

exports.setDisable =function(permiso, done){
  queryBuilder.setDisable("permiso", permiso, function(err,query,valores){
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
    "SELECT * FROM Permiso where estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(permisoId, done){
  db.get().query(
      "SELECT * FROM Permiso WHERE permiso = ? and estado = 1", permisoId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
