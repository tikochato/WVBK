const db = require("../db.js"),
  constantes = require("../utils/constantes");
const queryBuilder = require("../queryBuilder");

exports.create = function(nodoId, nodoTipoId, links, done) {
  if (nodoId && nodoId > 0 && nodoTipoId && nodoTipoId > 0) {
    this.deleteAll(nodoId, nodoTipoId, function(err, results) {
      if (err) {
        console.log("Error eliminando Predecesores");
        done("Error eliminando Predecesores");
      } else {
        if (links && links.length > 0) {
          for (var i = 0; i < links.length; i++) {
            queryBuilder.insert("Predecesor", links[i], function(err, query, valores) {
              if (err) {
                done(err);
              } else {
                db.get().query(query, valores, function(err, result) {
                  if (err) {
                    return done(err);
                  } else {
                    //console.log("predecesor creado");
                  }
                });
              }
            });
          }
        }
        return done(null, links);
      }
    });
  }
}

exports.deleteAll = function(nodoId, nodoTipoId, done) {
  db.get().query("DELETE FROM Predecesor where nodo_target = ? and nodo_tipo_target = ? ", [
    nodoId, nodoTipoId
  ], function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};

exports.getByProyecto = function(proyectoId, done) {
  db.get().query("SELECT * FROM Predecesor where proyecto = ? ", proyectoId, function(err, rows) {
    if (err) {
      return done(err);
    }
    let predecesores = [];
    for (var i = 0; i < rows.length; i++) {
      let predecesor = {
        id: rows[i].id,
        source: rows[i].source,
        nodo_source: rows[i].nodo_source,
        nodo_tipo_source: rows[i].nodo_tipo_source,
        target: rows[i].target,
        nodo_target: rows[i].nodo_target,
        nodo_tipo_target: rows[i].nodo_tipo_target,
        type: rows[i].type,
        lag: rows[i].lag
      }
      predecesores.push(predecesor);
    }
    return done(null, predecesores);
  });
};

exports.getBySource = function(nodoId, nodoTipo, done) {
  db.get().query("SELECT * FROM Predecesor WHERE nodo_source = ? and nodo_tipo_source = ? ", [
    nodoId, nodoTipo
  ], function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};

exports.updateDates = function(nodosFechas, done) {
  for (var i = 0; i < nodosFechas.length; i++) {
    var nodoFecha = nodosFechas[i];
    var tabla = constantes.NODO_TABLA[nodoFecha.nodo_tipo];
    var modelo = require('.' + constantes.PATH + tabla);
    var valores = [nodoFecha.fecha_inicio, nodoFecha.fecha_fin];
    var query = "UPDATE " + tabla + " SET fecha_inicio_plan = ?, fecha_fin_plan = ?  where ";
    //recorre las llaves primarias
    query += modelo.llaves[0] + " = ? "
    valores.push(nodoFecha.nodo);
    db.get().query(query, valores, function(err, rows) {
      if (err) {
        return done(err);
      }
    });
  }
  return done(null, nodosFechas);
};

exports.updateProgress = function(nodosProgreso, done) {
  for (var i = 0; i < nodosProgreso.length; i++) {
    var nodoProgreso = nodosProgreso[i];
    var tabla = constantes.NODO_TABLA[nodoProgreso.nodo_tipo];
    var modelo = require('.' + constantes.PATH + tabla);
    var valores = [nodoProgreso.progreso];
    var query = "UPDATE " + tabla + " SET progreso = ? where ";
    //recorre las llaves primarias
    query += modelo.llaves[0] + " = ? "
    valores.push(nodoProgreso.nodo);
    db.get().query(query, valores, function(err, rows) {
      if (err) {
        console.log(err);
        return done(err);
      }
    });
  }
  return done(null, nodosProgreso);
};
