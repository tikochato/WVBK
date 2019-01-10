const router = require("express").Router(),
  predecesor = require("../controllers/predecesor");

router.route("/getByProyecto/:proyecto_id").get(function(req, res) {
  predecesor.getByProyecto(req.params.proyecto_id, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, predecesores: results});
    }
  });
});

router.route("/:nodo_id/:nodo_tipo").get(function(req, res) {
  predecesor.getBySource(req.params.nodo_id, nodo_tipo, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, predecesores: results});
    }
  });
});

router.route("/create").post(function(req, res) {
  predecesor.deleteAll(req.body.nodo_id, req.body.nodo_tipo_id, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      predecesor.create(req.body.links, function(err, results) {
        if (err) {
          res.send({success: 0, errno: err.errno, message: err.sqlMessage});
        } else {
          res.json({success: 1, predecesores: results});
        }
      });
    }
  });
});

router.route("/disable").post(function(req, res) {
  predecesor.deleteAll(req.body.nodo_id, req.body.nodo_tipo_id, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, predecesores: results});
    }
  });
});

router.route("/updateDates").post(function(req, res) {
  predecesor.updateDates(req.body.nodosFechas, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, nodos_fechas: results});
    }
  });
});

router.route("/updateProgress").post(function(req, res) {
  predecesor.updateProgress(req.body.nodosProgreso, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, nodos_progreso: results});
    }
  });
});

module.exports = router;
