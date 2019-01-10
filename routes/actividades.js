const router = require("express").Router(),
  constantes = require("../utils/constantes"),
  actividad = require("../controllers/actividad"),
  predecesor = require("../controllers/predecesor"),
  nodo_entidad = require("../controllers/nodo_entidad"),
  nodo_archivo = require("../controllers/nodo_archivo");

router.route("/getAll").get(function(req, res) {
  actividad.getAll(function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, actividades: results});
    }
  });
});

router.route("/:id_actividad").get(function(req, res) {
  actividad.getById(req.params.id_actividad, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, actividades: results});
    }
  });
});

router.route("/create").post(function(req, res) {
  actividad.create(req.body.actividad, function(err, results) {
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
      //Crea Links
      if (req.body.links) {
          for (var i = 0; i < req.body.links.length; i++) {
            req.body.links[i].nodo_target = results.insertId;
          }
        predecesor.create(results.insertId, constantes.NODO_TIPO.actividad, req.body.links, function(err, resultsLinks) {
          if (err) {
            res.send({success: 0, errno: err.errno, message: err.sqlMessage});
          } else {
            //res.json({success: 1, links: results});
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
      res.json({success: 1, actividades: results});
    }
  });
});

router.route("/edit").post(function(req, res) {
  actividad.edit(req.body.actividad, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      if (req.body.padresEntidades) {
        nodo_entidad.actualizaPadres(req.body.padresEntidades, function(err, results1) {
          if (err) {
            res.send({success: 0, errno: err.errno, message: err.sqlMessage});
          } else {
            //console.log("actualiza Padres edit")
          }
        });
      }
      //Edita Links
      if (req.body.links) {
        predecesor.create(req.body.actividad.actividad, constantes.NODO_TIPO.actividad,req.body.links, function(errLinks, resultsLinks) {
          if (errLinks) {
            console.log(errLinks);
            res.send({success: 0, errno: errLinks.errno, message: errLinks.sqlMessage});
          } else {
            //res.json({success: 1, links: results});
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
      res.json({success: 1, actividades: results});
    }
  });
});

router.route("/disable").post(function(req, res) {
  actividad.setDisable(req.body.ids, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      actividad.getAll(function(err, results) {
        if (err) {
          res.send({success: 0, errno: err.errno, message: err.sqlMessage});
        } else {
          res.json({success: 1, actividades: results});
        }
      });
    }
  });
});

module.exports = router;
