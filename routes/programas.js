const router = require("express").Router(),
  moment = require("moment"),
  programa = require("../controllers/programa"),
  programa_entidad = require("../controllers/programa_entidad"),
  proyecto = require("../controllers/proyecto"),
  acta_constitucion = require("../controllers/acta_constitucion"),
  nodo_archivo = require("../controllers/nodo_archivo");

router.route("/getAll").get(function(req, res) {
  programa.getAll(function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, programas: results});
    }
  });
});

router.route("/getAllWithEntidades").get(function(req, res) {
  programa.getAllWithEntidades(function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, programas: results});
    }
  });
});

router.route("/:id_programa").get(function(req, res) {
  programa.getById(req.params.id_programa, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, programas: results});
    }
  });
});

router.route("/create").post(function(req, res) {
  programa.create(req.body.programa, function(err, results) {
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
      res.json({success: 1, programas: results});
    }
  });
});

router.route("/createWithExtras").post(function(req, res) {
  let entidades = req.body.entidades;
  programa.createWithExtras(req.body.programa, entidades, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      //Crear entidades
      programa_entidad.create(results.insertId, entidades, function(err, resultsEnt) {
        if (err) {
          res.send({success: 0, errno: err.errno, message: err.sqlMessage});
        } else {
          //console.log("programa_entidad creada");
        }
      });
      //Crear Proyecto
      let proyectoTemp = {
        nombre: req.body.programa.nombre,
        usuario_creo: req.body.programa.usuario_creo,
        fecha_inicio_plan: moment().format("YYYY-MM-DD"),
        fecha_inicio_actual: moment().format("YYYY-MM-DD"),
        progreso: 0,
        programa: results.insertId,
        id: 1
      }
      proyecto.create(proyectoTemp, function(err, resultsProy) {
        if (err) {
          res.send({success: 0, errno: err.errno, message: err.sqlMessage});
        } else {
          //Crear Actas_Constitucion
          for (var i = 0; i < entidades.length; i++) {
            if (entidades[i].es_prime !== 1) {
              let acta_constitucionTemp = {
                proyecto: resultsProy.insertId,
                entidad: entidades[i].entidad,
                usuario_creo: req.body.programa.usuario_creo
              }
              acta_constitucion.create(acta_constitucionTemp, function(err, resultsActa) {
                if (err) {
                  res.send({success: 0, errno: err.errno, message: err.sqlMessage});
                } else {
                  //console.log("acta creada");
                }
              });
            }
          }
          res.json({success: 1, programas: results, proyecto: resultsProy});
        }
      });
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
    }
  });
});

router.route("/edit").post(function(req, res) {
  programa.edit(req.body.programa, function(err, results) {
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
      res.json({success: 1, programas: results});
    }
  });
});

router.route("/disable").post(function(req, res) {
  programa.setDisable(req.body.ids, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      programa.getAll(function(err, results) {
        if (err) {
          res.send({success: 0, errno: err.errno, message: err.sqlMessage});
        } else {
          res.json({success: 1, programas: results});
        }
      });
    }
  });
});

module.exports = router;
