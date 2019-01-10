const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");



exports.create = function(indicador_nodo, done){
  queryBuilder.insert("Indicador_Nodo", indicador_nodo, function(err, query,valores){
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

exports.edit = function (indicador_nodo, done){
  queryBuilder.update("Indicador_Nodo", indicador_nodo, function(err, query, valores){
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

exports.setDisable =function(indicador_nodo, done){
  queryBuilder.setDisable("Indicador_Nodo", indicador_nodo, function(err,query,valores){
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
      "SELECT * FROM Indicador_Nodo where estado = 1", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(indicador_nodoId, done){
  db.get().query(
      "SELECT * FROM Indicador_Nodo WHERE indicador_nodo = ?", indicador_nodoId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getByNodo = function(nodo, nodo_tipo, done){
  let parametros = [nodo, nodo_tipo];
  db.get().query(
      "Select i.indicador indicador, n.valor valor, i.indicador_id indicador_id, i.name name, i.nombre nombre, u.simbolo simbolo, u.nombre unidad_medida, n.indicador_nodo from Indicador_Nodo n, Indicador i, unidad_medida u  where n.nodo = ? and n.nodo_tipo = ? and n.indicador = i.indicador and u.unidad_medida = i.unidad_medida;", parametros, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getByNodoImplementador = function(nodo, done){
  db.get().query(
      "Select d.indicador , d.indicador_id, d.nombre, u.nombre, d.tipo_desagregado from Indicador_Nodo i, Tarea t, Indicador d, unidad_medida u where i.nodo_tipo=4 and t.actividad=i.nodo and t.tarea=? and d.indicador = i.indicador and u.unidad_medida = d.unidad_medida", nodo, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getByNodoPlanificado = function(nodo, done){
  db.get().query(
      "Select * from Indicador_Nodo_Planificado where nodo =?", nodo, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};


exports.clean=function(nodo, done){
  db.get().query(
        "delete  from Indicador_Nodo where nodo=?;",nodo, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.populate=function(values, done){
  db.get().query(
        "INSERT INTO Indicador_Nodo (indicador_nodo, indicador, nodo, nodo_tipo,  valor)  values ?;", [values], function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.cleanPlanificado=function(values, done){
  db.get().query(
    "delete from  Indicador_Nodo_Planificado where nodo =? and indicador = ? and indicador_nodo_planificado >0;", values,function(err,rows){
      if(err) return done(err);
      return done(null, rows);
    }
  )
}


exports.populatePlanificado=function(values, done){
  db.get().query(
        "INSERT INTO Indicador_Nodo_Planificado (indicador_nodo_planificado, indicador_nodo, anio, total,  indicador, nodo, tipo, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12)  values ?;", [[values]], function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};


exports.cleanReal=function(values, done){
  db.get().query(
    "delete from  Indicador_Nodo_Real where nodo =? and indicador = ? and indicador_nodo_real >0;", values,function(err,rows){
      if(err) return done(err);
      return done(null, rows);
    }
  )
}

exports.insertarRealPersona=function(values, done){
  let query ="INSERT INTO Indicador_Nodo_Real (indicador_nodo_real, indicador, nodo, tipo, total, tipo_desagregado, indicador_nodo,  fecha_registro, "
  +"hombres_rango1, hombres_rango2, hombres_rango3, hombres_rango4, hombres_total, hombres_g1, hombres_g2,"
  +"mujeres_rango1, mujeres_rango2, mujeres_rango3, mujeres_rango4, mujeres_total, mujeres_g1, mujeres_g2) values ?"
  db.get().query(
    query, values,function(err,rows){
      if(err) return done(err);
      return done(null, rows);
    }
  )
}
exports.insertarRealEmpresa=function(values, done){
  let query ="INSERT INTO Indicador_Nodo_Real (indicador_nodo_real, indicador, nodo, tipo, total, tipo_desagregado, indicador_nodo,  fecha_registro,"
            +"formales_establecidas, formales_nuevas, informales_establecidas, informales_nuevas ) values ?"
  db.get().query(
    query, values,function(err,rows){
      if(err) return done(err);
      return done(null, rows);
    }
  )
}
exports.insertarRealNormal=function(values, done){
  let query ="INSERT INTO Indicador_Nodo_Real (indicador_nodo_real, indicador, nodo, tipo, total, tipo_desagregado, indicador_nodo,  fecha_registro) values ?"
  db.get().query(
    query, values,function(err,rows){
      if(err) return done(err);
      return done(null, rows);
    }
  )
}
