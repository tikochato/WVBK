const router    = require("express").Router(),
      reporte_tipo = require("../controllers/reporte_tipo");


router.route("/getAll").get(
  function (req, res){
    reporte_tipo.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1, reporte_tipos:results
        });
      }
    });
  }
);

router.route("/:id_reporte_tipo").get(
  function(req,res){
    reporte_tipo.getById(req.params.id_reporte_tipo,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1, reporte_tipos:results
          });
        }
      }
    );
  }
);

router.route("/create").post(
  function(req,res){
    reporte_tipo.create(
      req.body.reporte_tipo,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, reporte_tipos:results
          });
        }
      }
    );
  }
);

router.route ("/edit").post(
  function(req,res){
    reporte_tipo.edit(
      req.body.reporte_tipo,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, reporte_tipos:results
          });
        }
      }
    );
  }
);

router.route("/disable").post(
  function(req,res){
    reporte_tipo.setDisable(req.body.ids,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          reporte_tipo.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1, reporte_tipos:results
              });
            }
          });
        }
      }
    );
  }
);



module.exports = router;
