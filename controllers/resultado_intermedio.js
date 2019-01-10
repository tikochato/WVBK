const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");
const nodo_entidad = require("./nodo_entidad");


exports.create= function(resultado_intermedio,done){
  if(resultado_intermedio.entidades && resultado_intermedio.entidades.length > 0){
    resultado_intermedio.entidades = ',' + resultado_intermedio.entidades.toString() + ',';
    resultado_intermedio.entidad_asigna = resultado_intermedio.entidad_asigna ? resultado_intermedio.entidad_asigna : resultado_intermedio.entidadAsigna;
  }
  queryBuilder.insert("Resultado_Intermedio", resultado_intermedio, function(err, query,valores){
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

exports.edit= function(resultado_intermedio, done){
  if(resultado_intermedio.entidades && resultado_intermedio.entidades.length > 0){
    resultado_intermedio.entidades = ',' + resultado_intermedio.entidades.toString() + ',';
    resultado_intermedio.entidad_asigna = resultado_intermedio.entidad_asigna ? resultado_intermedio.entidad_asigna : resultado_intermedio.entidadAsigna;
  }
  queryBuilder.update("Resultado_Intermedio", resultado_intermedio, function(err,query,valores){
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

exports.setDisable =function(resultado_intermedio, done){
  queryBuilder.setDisable("Resultado_Intermedio", resultado_intermedio, function(err,query,valores){
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
      "SELECT * FROM Resultado_Intermedio WHERE estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(resultadoIntermedioId, done){
  db.get().query(
      "SELECT * FROM Resultado_Intermedio WHERE resultado_intermedio = ? and estado = 1", resultadoIntermedioId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
