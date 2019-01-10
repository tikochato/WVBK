const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");


exports.create = function(categoria_indicador, done){
  queryBuilder.insert("Categoria_Indicador", categoria_indicador, function(err, query,valores){
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

exports.edit = function (categoria_indicador, done){
  queryBuilder.update("Categoria_Indicador", categoria_indicador, function(err, query, valores){
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

exports.setDisable =function(categoria_indicador, done){
  queryBuilder.setDisable("Categoria_Indicador", categoria_indicador, function(err,query,valores){
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
      "SELECT * FROM Categoria_Indicador where estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(categoriaIndicadorId, done){
  db.get().query(
      "SELECT * FROM Categoria_Indicador WHERE categoria_indicador = ? and estado = 1", categoriaIndicadorId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
