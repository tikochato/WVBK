const db = require("../db.js");
const queryBuilder = require("../queryBuilder");
const actividadCtrl = require("./actividad");
const tareaCtrl = require("./tarea");

exports.getAll = function(done) {
  db.get().query("SELECT * FROM Nodo_Entidad", function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};

exports.getAllByNodo = function(id_nodo, id_tipo, done) {
  db.get().query("SELECT * FROM Nodo_Entidad WHERE nodo = ? AND nodo_tipo = ?", [
    id_nodo, id_tipo
  ], function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};

exports.create = function(id_nodo, id_tipo, entidades, entidad_asigna, done) {
  for (var i = 0; i < entidades.length; i++) {
    let id_entidad = entidades[i].entidad;
    db.get().query("INSERT INTO Nodo_Entidad(nodo, nodo_tipo, entidad_asignada, entidad_asigna) VALUES (?,?,?,?)", [
      id_nodo, id_tipo, id_entidad, entidad_asigna
    ], function(err, rows) {
      if (err) {
        return done(err);
      } else {
        //console.log("nodo entidad creado");
      }
    });
  }
  return done(null, entidades);
}

exports.createRecursive = function(id_nodo, id_tipo, entidades, entidad_asigna, done) {
  //Crear entidades en nodo
  create(id_nodo, id_tipo, entidades, entidad_asigna, function(err, results) {
    if (err) {
      return done(err);
    } else {
      //console.log("nodo_entidades creadas");
      //done(null, rows);
    }
  });
  //verificar padres y actualizar

  // Obtener nodo actual con estructura de padres hasta proyecto

  let recursivo = true;
  while (recursivo) {
    //Obtener padre
    let padreId = null;
    let padreTipo = null;
    switch (id_tipo) {
      case 4:
        let actividad = actividadCtrl.getById(id_nodo, function(err, results) {
          if (err) {
            //console.log("Error obteniendo nodo: " + id_nodo + " nodo_tipo: " + id_tipo);
          } else {
            //console.log("get actividad " + id_nodo);
            //console.log(results);
          }
        });
        break;
      case 5:
        let tarea = actividadCtrl.getById(id_nodo, function(err, results) {
          if (err) {
            //console.log("Error obteniendo nodo: " + id_nodo + " nodo_tipo: " + id_tipo);
          } else {
            //console.log("get actividad " + id_nodo);
            //console.log(results);
          }
        });
        break;
      default:
        return done("Tipo de nodo no válido");
    }
    //Si padre es Resultado Intermedio salir
    if (padreTipo > 3) {
      //Obtener entidades en hijos
      //eliminar y crear hijos
      recursivo = false;
    } else {
      recursivo = false;
    }
  }
}

exports.actualizaPadres = function(nodos, done) {
  for (var i = 0; i < nodos.length; i++) {
    let nodo_id = nodos[i].nodo_id;
    let nodo_tipo = nodos[i].nodo_tipo;
    let entidades = nodos[i].entidades
      ? ',' + nodos[i].entidades.toString() + ','
      : '';
    let query = '';
    switch (nodo_tipo) {
      case 2: //Resultado
        query = 'UPDATE Resultado SET entidades = ? WHERE resultado = ? '
        break;
      case 3: //Resultado Intermedio
        query = 'UPDATE Resultado_Intermedio SET entidades = ? WHERE resultado_intermedio = ? '
        break;
      case 4: //Actividad
        query = 'UPDATE Actividad SET entidades = ? WHERE actividad = ? '
        break;
      case 5: //Tarea
        query = 'UPDATE Tarea SET entidades = ? WHERE tarea = ? '
        break;
      default:
        break;
    }
    if (query && query !== '') {
      db.get().query(query, [
        entidades, nodo_id
      ], function(err, rows) {
        if (err) {
          return done(err);
        } else {
          //console.log("Padre actualizado");
        }
      });
    }
  }
  return done(null, nodos);
}

exports.deleteByNodo = function(id_nodo, id_tipo, done) {
  db.get().query("DELETE FROM Nodo_Entidad WHERE nodo = ? AND nodo_tipo = ?", function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};
