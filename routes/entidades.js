const router    = require("express").Router(),
      entidad = require("../controllers/entidad");


router.route("/getAll").get(
  function (req, res){
    entidad.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,entidades:results
        });
      }
    });
  }
);

router.route("/:id_entidad").get(
  function(req,res){
    entidad.getById(req.params.id_entidad,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1,entidades:results
          });
        }
      }
    );
  }
);

router.route("/getByPrograma/:programaId").get(
  function (req, res){
    entidad.getByPrograma(req.params.programaId, function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,entidades:results
        });
      }
    });
  }
);

router.route("/create").post(
  function(req,res){
    entidad.create(
      req.body.entidad,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, entidades:results
          });
        }
      }
    );
  }
);

router.route ("/edit").post(
  function(req,res){
    entidad.edit(
      req.body.entidad,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, entidades:results
          });
        }
      }
    );
  }
);

router.route("/disable").post(
  function(req,res){
    entidad.setDisable(req.body.ids,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          entidad.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1,entidades:results
              });
            }
          });
        }
      }
    );
  }
);



module.exports = router;
