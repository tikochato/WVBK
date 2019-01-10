const db = require("../db.js");
const fs = require('fs');
const path = require('path');
const queryBuilder = require("../queryBuilder");

exports.updateFiles = function(archivos, done) {
  //Crear nuevos archivos
  if (archivos && archivos.nuevos && archivos.nuevos.length > 0) {
    //call create nodo_archivos
    let nodo_archivos = archivos.nuevos;
    this.create(nodo_archivos, function(errArchivo, resultsArchivo) {
      if (errArchivo) {
        //res.send({success: 0, errno: err.errno, message: err.sqlMessage});
        console.log("Error " + errArchivo);
      } else {
        //console.log("Archivos creados exitosamente");
        //res.json({success: 1, nodo_archivos: results});
      }
    });
  }
  //Borrar Archivos
  if (archivos && archivos.eliminar && archivos.eliminar.length > 0) {
    //call disable nodo_archivos
    let ids = [];
    for (var i = 0; i < archivos.eliminar.length; i++) {
      ids.push(archivos.eliminar[i].nodo_archivo);
    }
    this.setDisable(ids, function(errArchivo, resultsArchivo) {
      if (errArchivo) {
        //res.send({success: 0, errno: err.errno, message: err.sqlMessage});
        console.log("Error " + errArchivo);
      } else {
        //console.log("Archivos eliminados exitosamente");
        //res.json({success: 1, nodo_archivos: results});
      }
    });
  }
}

exports.create = function(nodo_archivos, done) {
  for (var i = 0; i < nodo_archivos.length; i++) {
    let nodo_archivo = nodo_archivos[i];
    queryBuilder.insert("Nodo_Archivo", nodo_archivo, function(err, query, valores) {
      if (err) {
        console.log(err);
        done(err);
      } else {
        db.get().query(query, valores, function(err, result) {
          if (err) {
            console.log(err);
            return done(err);
          } else {
            //console.log("nodo_archivo creado");
            //return done(null, result);
          }
        });
      }
    });
  }
  // TODO: fix result
  return done(null, nodo_archivos);
}

exports.download = function(nodo_archivoId, done) {
  this.getById(nodo_archivoId, function(err, results) {
    if (err) {
      return done(err);
    } else {
      if(results && results.length>0) {
        let nodo_archivo = results[0];
        var file = nodo_archivo.path;
        return done(null, file);
      }
      return done("Error finding the file");
    }
  });
}

exports.setDisable = function(ids, done) {
  queryBuilder.setDisable("Nodo_Archivo", ids, function(err, query, valores) {
    if (err) {
      done(err);
    } else {
      db.get().query(query, valores, function(err, result) {
        if (err)
          return done(err);
        else
          return done(null, result);
        }
      );
    }
  });
};

exports.getAll = function(done) {
  db.get().query("SELECT * FROM Nodo_Archivo WHERE estado = 1", function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};

exports.getById = function(nodo_archivoId, done) {
  db.get().query("SELECT * FROM Nodo_Archivo WHERE nodo_archivo = ? and estado = 1", nodo_archivoId, function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};

exports.getAllByNodo = function(nodoId, nodo_tipoId, done) {
  db.get().query("SELECT * FROM Nodo_Archivo WHERE nodo = ? and nodo_tipo = ? and estado = 1", [
    nodoId, nodo_tipoId
  ], function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};
