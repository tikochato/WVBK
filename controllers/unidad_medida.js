const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create = function(unidad_medida, done){
  queryBuilder.insert("unidad_medida", unidad_medida, function(err, query,valores){
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

exports.edit = function (unidad_medida, done){
  queryBuilder.update("unidad_medida", unidad_medida, function(err, query, valores){
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

exports.setDisable =function(unidad_medida, done){
  queryBuilder.setDisable("unidad_medida", unidad_medida, function(err,query,valores){
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
      "SELECT * FROM unidad_medida where estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(unidad_medidaId, done){
  db.get().query(
      "SELECT * FROM unidad_medida WHERE unidad_medida = ? and estado = 1", unidad_medidaId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
