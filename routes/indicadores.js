const router    = require("express").Router(),
      indicador = require("../controllers/indicador");

router.route("/getAll").get(
  function (req, res){
    indicador.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,indicadores:results
        });
      }
    });
  }
);

router.route("/getAllExtended").get(
  function (req, res){
    indicador.getAllExtended(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,indicadores:results
        });
      }
    });
  }
);

router.route("/:id_indicador").get(
  function(req,res){
    indicador.getById(req.params.id_indicador,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1,indicadores:results
          });
        }
      }
    );
  }
);

router.route("/create").post(
  function(req,res){
    indicador.create(
      req.body.indicador,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, indicadores:results
          });
        }
      }
    );
  }
);


router.route ("/edit").post(
  function(req,res){
    indicador.edit(
      req.body.indicador,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, indicadores:results
          });
        }
      }
    );
  }
);


router.route("/disable").post(
  function(req,res){
    indicador.setDisable(req.body.ids,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          indicador.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1,indicadores:results
              });
            }
          });
        }
      }
    );
  }
);



module.exports = router;
