const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create = function(programa, entidades, done){
  var resultado = null;
  for(var i=0; i<entidades.length; i++){
    var entidad = entidades[i];
    entidad.programa = programa;
    queryBuilder.insert("Programa_Entidad", entidad, function(err, query,valores){
      if(err){
        done(err);
      }else{
        db.get().query(query,valores,function(err, result){
            if (err) {console.log(err); return done (err);}
	          else done(null, result);
          }
        );
      }
    });
  }
  return done(null, resultado);
}

exports.getAll = function(done){
  db.get().query(
      "SELECT * FROM Programa_Entidad where estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getByPrograma = function(programaId, done){
  db.get().query(
      "SELECT * FROM Programa_Entidad WHERE programa = ? and estado = 1", programaId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.deleteAll = function(programaId){
  db.get().query(
      "DELETE FROM Programa_Entidad WHERE programa = ?", [programaId], function(err, rows){
        if(err) console.log(err);
      }
  );
};
