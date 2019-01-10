const router    = require("express").Router(),
      unidad_medida = require("../controllers/unidad_medida");


router.route("/getAll").get(
  function (req, res){
    unidad_medida.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,unidades_medida:results
        });
      }
    });
  }
);

router.route("/:id_unidad_medida").get(
  function(req,res){
    unidad_medida.getById(req.params.id_unidadMedida,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1,unidades_medida:results
          });
        }
      }
    );
  }
);

router.route("/create").post(
  function(req,res){
    unidad_medida.create(
      req.body.unidadMedida,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, unidades_medida:results
          });
        }
      }
    );
  }
);

router.route ("/edit").post(
  function(req,res){
    unidad_medida.edit(
      req.body.unidadMedida,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, unidades_medida:results
          });
        }
      }
    );
  }
);

router.route("/disable").post(
  function(req,res){
    unidad_medida.setDisable(req.body.ids,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          unidad_medida.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1,unidades_medida:results
              });
            }
          });
        }
      }
    );
  }
);



module.exports = router;
