const router = require("express").Router(),
  resultado_intermedio = require("../controllers/resultado_intermedio"),
  nodo_entidad = require("../controllers/nodo_entidad"),
  nodo_archivo = require("../controllers/nodo_archivo");

router.route("/getAll").get(function(req, res) {
  resultado_intermedio.getAll(function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, resultados_intermedios: results});
    }
  });
});

router.route("/:id_resultado_intermedio").get(function(req, res) {
  resultado_intermedio.getById(req.params.id_resultado_intermedio, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, resultados_intermedios: results});
    }
  });
});

router.route("/create").post(function(req, res) {
  resultado_intermedio.create(req.body.resultado_intermedio, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      if (req.body.padresEntidades) {
        nodo_entidad.actualizaPadres(req.body.padresEntidades, function(err, results1) {
          if (err) {
            res.send({success: 0, errno: err.errno, message: err.sqlMessage});
          } else {
            //console.log("actualiza Padres create")
          }
        });
      }
      //Crea Archivos
      if (req.body.archivos) {
        if (req.body.archivos.nuevos) {
          for (var i = 0; i < req.body.archivos.nuevos; i++) {
            req.body.archivos.nuevos[i].nodo = results.insertId;
          }
        }
        nodo_archivo.updateFiles(req.body.archivos, function(err, resultsFile) {
          if (err) {
            res.send({success: 0, errno: err.errno, message: err.sqlMessage});
          } else {
            //res.json({success: 1, nodo_archivos: results});
          }
        });
      }
      res.json({success: 1, resultados_intermedios: results});
    }
  });
});

router.route("/edit").post(function(req, res) {
  resultado_intermedio.edit(req.body.resultado_intermedio, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      if (req.body.padresEntidades) {
        nodo_entidad.actualizaPadres(req.body.padresEntidades, function(err, results1) {
          if (err) {
            res.send({success: 0, errno: err.errno, message: err.sqlMessage});
          } else {
            //console.log("actualiza Padres ")
          }
        });
      }
      //Edita Archivos
      if (req.body.archivos) {
        nodo_archivo.updateFiles(req.body.archivos, function(errFile, resultsFile) {
          if (errFile) {
            console.log(errFile);
            res.send({success: 0, errno: errFile.errno, message: errFile.sqlMessage});
          } else {
            //res.json({success: 1, nodo_archivos: results});
          }
        });
      }
      res.json({success: 1, resultados_intermedios: results});
    }
  });
});

router.route("/disable").post(function(req, res) {
  resultado_intermedio.setDisable(req.body.ids, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      resultado_intermedio.getAll(function(err, results) {
        if (err) {
          res.send({success: 0, errno: err.errno, message: err.sqlMessage});
        } else {
          res.json({success: 1, resultados_intermedios: results});
        }
      });
    }
  });
});

module.exports = router;
