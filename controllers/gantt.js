const db = require("../db.js");
const queryBuilder = require("../queryBuilder"),
  constantes = require("../utils/constantes"),
  proyecto = require("../controllers/proyecto");

exports.getById = function(proyectoId, done) {
  db.get().query("CALL get_arbol(?);", [proyectoId], function(err, rows) {
    if (err) {
      return done(err);
    }
    let data = [];
    if (rows && rows.length > 0) {
      rows = rows[0];
      for (var i = 0; i < rows.length; i++) {
        let n = rows[i];
        let elemento = {
          id: n.id
            ? n.id
            : i + 1,
          idBdd: n.id_nodo,
          text: n.nombre,
          name: n.name,
          descripcion: n.descripcion,
          fecha_cruda: n.fecha_cruda,
          progress: n.progreso
            ? n.progreso
            : 0,
          tipoId: n.tipo_nodo,
          tipo: constantes.NODO_TIPO_TEXTO[n.tipo_nodo],
          parentTipoId: n.tipo_padre,
          parentIdBDD: n.padre,
          color: constantes.NODO_COLOR[n.tipo_nodo],
          textColor: 'white',
          entidades: [],
          responsable: n.responsable,
          meta: {
            nombre: "",
            tipo: 0,
            valor: 0,
            planificadas: [],
            reales: [],
            meta: 0
          },
          activo: n.activo,
          costo_plan: n.costo_plan,
          costo_real: n.costo_real,
          latitud: n.latitud,
          longitud: n.longitud
        };
        if (n.tipo_nodo === constantes.NODO_TIPO.proyecto) {
          elemento.editable = false;
          elemento.readonly = true;
          elemento.open = true;
        } else {
          if (n.tipo_nodo !== constantes.NODO_TIPO.resultado && n.tipo_nodo !== constantes.NODO_TIPO.resultado_intermedio) {
            elemento.start_date = n.fecha_inicio
              ? n.fecha_inicio
              : null; //format
            elemento.duration = n.duracion;
          }
          elemento.parent = n.padreId
            ? n.padreId
            : null;
          if (n.entidades && n.entidades.length > 0) {
            let str = n.entidades;
            str = str.replace(/(^,)|(,$)/g, "");
            let entidades = str.split(',').map(Number);
            elemento.entidades = entidades;
          }
        }
        data.push(elemento);
      }
    }
    return done(null, data);
  });
};

exports.getGanttByEntidad = function(proyectoId, entidadId, done) {
  db.get().query("CALL get_arbol_entidad(?, ?);", [
    proyectoId, entidadId
  ], function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};

exports.getGanttByEntidadPrograma = function(programaId, entidadId, done) {
  proyecto.getAllByPrograma(programaId, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      if (results && results.length > 0) {
        var proyectoId = results[0].proyecto;
        db.get().query("CALL get_arbol_entidad(?, ?);", [
          proyectoId, entidadId
        ], function(err, rows) {
          if (err)
            return done(err);
          return done(null, rows);
        });
      }
    }
  });
};
