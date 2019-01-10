const router    = require("express").Router(),
      categoria_indicador = require("../controllers/categoria_indicador");

router.route("/getAll").get(
  function (req, res){
    categoria_indicador.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1, categorias_indicadores:results
        });
      }
    });
  }
);

router.route("/:id_categoria_indicador").get(
  function(req,res){
    categoria_indicador.getById(req.params.id_categoria_indicador,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1,categorias_indicadores:results
          });
        }
      }
    );
  }
);

router.route("/create").post(
  function(req,res){
    categoria_indicador.create(
      req.body.categoria_indicador,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, categorias_indicadores:results
          });
        }
      }
    );
  }
);


router.route ("/edit").post(
  function(req,res){
    categoria_indicador.edit(
      req.body.categoria_indicador,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, categorias_indicadores:results
          });
        }
      }
    );
  }
);


router.route("/disable").post(
  function(req,res){
    categoria_indicador.setDisable(req.body.ids,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          categoria_indicador.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1,categorias_indicadores:results
              });
            }
          });
        }
      }
    );
  }
);



module.exports = router;
