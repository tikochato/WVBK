const router    = require("express").Router(),
      programa_entidad = require("../controllers/programa_entidad");


router.route("/getAll").get(
  function (req, res){
    programa_entidad.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,programas_entidades:results
        });
      }
    });
  }
);

router.route("/:id_programa").get(
  function(req,res){
    programa_entidad.getByPrograma(req.params.id_programa,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1,programas_entidades:results
          });
        }
      }
    );
  }
);

router.route("/create").post(
  function(req,res){
    programa_entidad.deleteAll(req.body.programa);
    programa_entidad.create(
      req.body.programa, req.body.entidades,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, programas_entidades:results
          });
        }
      }
    );
  }
);



module.exports = router;
