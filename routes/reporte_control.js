const router = require("express").Router(),
  reporte_control = require("../controllers/reporte_control");

router.route("/getAll/:proyecto_id").get(function(req, res) {
  reporte_control.getAll(req.params.proyecto_id,
    function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, reporte_control: results});
    }
  });
});


module.exports = router;
