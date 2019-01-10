const router = require("express").Router(),
  acta_constitucion = require("../controllers/acta_constitucion");

router.route("/getAll").get(function(req, res) {
  acta_constitucion.getAll(function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, acta_constitucion: results});
    }
  });
});


router.route("/:proyecto_id/:entidad_id").get(function(req, res) {
  acta_constitucion.getById(req.params.proyecto_id, req.params.entidad_id, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, acta_constitucion: results});
    }
  });
});

router.route("/create").post(function(req, res) {
  acta_constitucion.create(req.body.acta_constitucion, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, acta_constitucion: results});
    }
  });
});

router.route("/edit").post(function(req, res) {
  acta_constitucion.edit(req.body.acta_constitucion, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, acta_constitucion: results});
    }
  });
});

router.route("/disable").post(function(req, res) {
  acta_constitucion.setDisable(req.body.ids, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      acta_constitucion.getAll(function(err, results) {
        if (err) {
          res.send({success: 0, errno: err.errno, message: err.sqlMessage});
        } else {
          res.json({success: 1, acta_constitucion: results});
        }
      });
    }
  });
});

module.exports = router;
