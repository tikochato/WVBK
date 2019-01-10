const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create= function(acta_constitucion,done){
  queryBuilder.insert("Acta_Constitucion", acta_constitucion, function(err, query,valores){
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

exports.edit= function(acta_constitucion, done){
  queryBuilder.update("Acta_Constitucion", acta_constitucion, function(err,query,valores){
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

exports.setDisable =function(acta_constitucion, done){
  queryBuilder.setDisable("Acta_Constitucion", acta_constitucion, function(err,query,valores){
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
      "SELECT * FROM Acta_Constitucion WHERE estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(proyectoId, entidadId, done){
  db.get().query(
      "SELECT * FROM Acta_Constitucion WHERE proyecto = ? and entidad = ? and estado = 1", [proyectoId, entidadId], function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
