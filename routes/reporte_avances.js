const router = require("express").Router(),
  reporte_avance = require("../controllers/reporte_avance");

router.route("/getAll/:proyecto_id/:fecha_inicio/:fecha_fin").get(function(req, res) {
  reporte_avance.getAll(req.params.proyecto_id, req.params.fecha_inicio, req.params.fecha_fin,
    function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, reporte_avances: results});
    }
  });
});

router.route("/getAllArray/:proyecto_id/:fecha_inicio/:fecha_fin").get(function(req, res) {
  reporte_avance.getAllArray(req.params.proyecto_id, req.params.fecha_inicio, req.params.fecha_fin,
    function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, reporte_avances: results});
    }
  });
});

module.exports = router;
