const db = require("../db.js"),
  moment = require("moment");
const queryBuilder = require("../queryBuilder"),
  proyecto = require("../controllers/proyecto");

exports.getAll = function(proyectoId, done) {
  var plazoEjecucionP = 0;
  var ejecucionFisicaR = 0;
  proyecto.getById(proyectoId, function(err, results) {
    if (err) {
    } else {
    //ejecucionFisicaR
    let proy = results[0];
    ejecucionFisicaR = (proy.progreso*100).toFixed(0);
    //plazoEjecucionP
    var inicio = moment(proy.fecha_inicio_plan); //todays date
    var fin = moment(proy.fecha_fin_plan); // another date
    var durationP = moment.duration(fin.diff(inicio));
    var diasP = durationP.asDays();
    var durationR = moment.duration(fin.diff(moment()));
    var diasR = durationR.asDays();
    plazoEjecucionP = ((diasR/diasP)*100).toFixed(2);
    var reporte = {
      valorGanado: ejecucionFisicaR,
      valorPlaneado: plazoEjecucionP,
      SPI: (ejecucionFisicaR/plazoEjecucionP).toFixed(2),
      CPI: 0,
      CP: 0,
      CR: 0,
      plazoEjecucionP: plazoEjecucionP,
      plazoEjecucionR: 0,
      ejecucionFinancieraP: 0,
      ejecucionFinancieraR: 0,
      ejecucionFisicaP: 0,
      ejecucionFisicaR: ejecucionFisicaR,

    }
    return done(null, reporte);
    }
  });

};
