const router    = require("express").Router(),
      reporte_frecuencia = require("../controllers/reporte_frecuencia");


router.route("/getAll").get(
  function (req, res){
    reporte_frecuencia.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1, reporte_frecuencias:results
        });
      }
    });
  }
);

router.route("/:id_reporte_frecuencia").get(
  function(req,res){
    reporte_frecuencia.getById(req.params.id_reporte_frecuencia,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1, reporte_frecuencias:results
          });
        }
      }
    );
  }
);

router.route("/create").post(
  function(req,res){
    reporte_frecuencia.create(
      req.body.reporte_frecuencia,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, reporte_frecuencias:results
          });
        }
      }
    );
  }
);

router.route ("/edit").post(
  function(req,res){
    reporte_frecuencia.edit(
      req.body.reporte_frecuencia,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, reporte_frecuencias:results
          });
        }
      }
    );
  }
);

router.route("/disable").post(
  function(req,res){
    reporte_frecuencia.setDisable(req.body.ids,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          reporte_frecuencia.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1, reporte_frecuencias:results
              });
            }
          });
        }
      }
    );
  }
);



module.exports = router;
