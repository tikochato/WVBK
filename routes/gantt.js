const router = require("express").Router(),
  gantt = require("../controllers/gantt");

router.route("/:id_proyecto").get(function(req, res) {
  gantt.getById(req.params.id_proyecto, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, gantt: results});
    }
  });
});

router.route("/matriz/:id_proyecto/:id_entidad").get(function(req, res) {
  gantt.getGanttByEntidad(req.params.id_proyecto, req.params.id_entidad, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, gantt: results});
    }
  });
});

router.route("/matrizPrograma/:id_programa/:id_entidad").get(function(req, res) {
  gantt.getGanttByEntidadPrograma(req.params.id_programa, req.params.id_entidad, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, gantt: results});
    }
  });
});

module.exports = router;
