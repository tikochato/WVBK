const router = require("express").Router(),
  proyecto = require("../controllers/proyecto"),
  nodo_archivo = require("../controllers/nodo_archivo");

router.route("/getAll").get(function(req, res) {
  proyecto.getAll(function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, proyectos: results});
    }
  });
});

router.route("/getAllByPrograma/:id_programa").get(function(req, res) {
  proyecto.getAllByPrograma(req.params.id_programa, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, proyectos: results});
    }
  });
});

router.route("/getAllByUsuario/:id_usuario").get(function(req, res) {
  proyecto.getAllByUsuario(req.params.id_usuario, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, proyectos: results});
    }
  });
});

router.route("/:id_proyecto").get(function(req, res) {
  proyecto.getById(req.params.id_proyecto, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, proyectos: results});
    }
  });
});

router.route("/create").post(function(req, res) {
  proyecto.create(req.body.proyecto, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
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
      res.json({success: 1, proyectos: results});
    }
  });
});

router.route("/edit").post(function(req, res) {
  proyecto.edit(req.body.proyecto, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
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
      res.json({success: 1, proyectos: results});
    }
  });
});

router.route("/disable").post(function(req, res) {
  proyecto.setDisable(req.body.ids, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      proyecto.getAll(function(err, results) {
        if (err) {
          res.send({success: 0, errno: err.errno, message: err.sqlMessage});
        } else {
          res.json({success: 1, proyectos: results});
        }
      });
    }
  });
});

module.exports = router;
