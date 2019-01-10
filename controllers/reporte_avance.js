const db = require("../db.js"),
  moment = require("moment"),
  entidad = require("../controllers/entidad");
const queryBuilder = require("../queryBuilder");

exports.getAll = function(proyectoId, fecha_inicio, fecha_fin, done) {
  db.get().query("CALL `gap`.`get_reporte_avances`(?)", proyectoId, function(err, rows) {
    if (err) {
      return done(err);
    } else {
      let resultado = [];
      for(let i=0; i<rows[0].length; i++){
        let row = rows[0][i];
        let inicio = moment(row.fecha_inicio);
        let fin = row.fecha_fin && moment(row.fecha_fin).isValid() ? moment(row.fecha_fin) : moment(row.fecha_inicio).add(row.duracion, 'days');
        if((inicio.isBetween(moment(fecha_inicio), moment(fecha_fin), 'days', '[]')) || (fin.isBetween(moment(fecha_inicio), moment(fecha_fin), 'days', '[]'))){
          let estado = (row.progreso === 1) ? 'v' : inicio.isAfter(moment()) ? 'g' : fin.isBefore(moment()) ? 'r' : 'a';
          resultado.push({
            id: i,
            tipo_nodo: row.tipo_nodo,
            edt: row.edt,
            nombre: row.nombre,
            fecha_inicio: inicio.format("DD/MM/YYYY"),
            fecha_fin: fin.format("DD/MM/YYYY"),
            progreso: (row.progreso*100).toFixed(0)+' %',
            responsable: (row.puestoNombre ? row.puestoNombre : "") + " - " + (row.usuarioNombre ? row.usuarioNombre : "") + " " +(row.usuarioApellido ? row.usuarioApellido : ""),
            estado: estado,
          });
        }
      }
      return done(null, resultado);
    }
  });
};

exports.getAllArray = function(proyectoId, fecha_inicio, fecha_fin, done) {
let resultado = [];
  db.get().query("CALL `gap`.`get_reporte_avances`(?)", proyectoId, function(err, rows) {
    if (err) {
      return done(err);
    } else {
      let entidades = [];
      entidad.getAll(function(err,results){
        if(err){
          
        }else{
          for(let i=0; i<results.length; i++){
            let entidad = results[i];
            entidades[entidad.entidad] = entidad.nombre;
          }
          for(let i=0; i<rows[0].length; i++){
            let row = rows[0][i];
            let inicio = moment(row.fecha_inicio);
            let fin = row.fecha_fin && moment(row.fecha_fin).isValid() ? moment(row.fecha_fin) : moment(row.fecha_inicio).add(row.duracion, 'days');
            if((inicio.isBetween(moment(fecha_inicio), moment(fecha_fin), 'days', '[]')) || (fin.isBetween(moment(fecha_inicio), moment(fecha_fin), 'days', '[]'))){
              let estado = (row.progreso === 1) ? 'Finalizadas' : inicio.isAfter(moment()) ? 'Sin Iniciar' : fin.isBefore(moment()) ? 'Atrasadas' : 'En Proceso';
              let socios = "";
              let entTemp = row.entidades.substring(1,row.entidades.length-1).split(',');
              for(let i=0; i<entTemp.length; i++){
                if(entTemp[i] !== ""){
                if(socios!==""){
                  socios += ", "
                }
                socios += entidades[entTemp[i]];
              }
              }
              resultado.push([
                i, //id:
                row.tipo_nodo, //tipo_nodo:
                row.edt, //edt:
                row.nombre, //nombre:
                inicio.format("DD/MM/YYYY"), //fecha_inicio:
                fin.format("DD/MM/YYYY"), //fecha_fin:
                (row.progreso*100).toFixed(0),  //progreso:
                socios, //entidades
                (row.puestoNombre ? row.puestoNombre : "") + " - " + (row.usuarioNombre ? row.usuarioNombre : "") + " " +(row.usuarioApellido ? row.usuarioApellido : ""),  //responsable:
                estado,  //estado:
              ]);
            }
          }
          return done(null, resultado);
        }
      });
    }
  });
};
