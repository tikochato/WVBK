const router    = require("express").Router(),
      indicador_tipo = require("../controllers/indicador_tipo");

router.route("/getAll").get(
  function (req, res){
    indicador_tipo.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,indicador_tipos:results
        });
      }
    });
  }
);

router.route("/:id_indicador_tipo").get(
  function(req,res){
    indicador_tipo.getById(req.params.id_indicador_tipo,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1,indicador_tipos:results
          });
        }
      }
    );
  }
);

router.route("/create").post(
  function(req,res){
    indicador_tipo.create(
      req.body.indicador_tipo,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, indicador_tipos:results
          });
        }
      }
    );
  }
);


router.route ("/edit").post(
  function(req,res){
    indicador_tipo.edit(
      req.body.indicador_tipo,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, indicador_tipos:results
          });
        }
      }
    );
  }
);


router.route("/disable").post(
  function(req,res){
    indicador_tipo.setDisable(req.body.ids,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          indicador_tipo.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1,indicador_tipos:results
              });
            }
          });
        }
      }
    );
  }
);



module.exports = router;
