const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create= function(resultado,done){
  if(resultado.entidades && resultado.entidades.length > 0){
    resultado.entidades = ',' + resultado.entidades.toString() + ',';
    resultado.entidad_asigna = resultado.entidad_asigna ? resultado.entidad_asigna : resultado.entidadAsigna;
  }
  queryBuilder.insert("Resultado", resultado, function(err, query,valores){
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

exports.edit= function(resultado, done){
  if(resultado.entidades && resultado.entidades.length > 0){
    resultado.entidades = ',' + resultado.entidades.toString() + ',';
    resultado.entidad_asigna = resultado.entidad_asigna ? resultado.entidad_asigna : resultado.entidadAsigna;
  }
  queryBuilder.update("Resultado", resultado, function(err,query,valores){
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

exports.setDisable =function(resultado, done){
  queryBuilder.setDisable("Resultado", resultado, function(err,query,valores){
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
      "SELECT * FROM Resultado WHERE estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(resultadoId, done){
  db.get().query(
      "SELECT * FROM Resultado WHERE resultado = ? and estado = 1", resultadoId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
