const router    = require("express").Router(),
      nodo_entidad = require("../controllers/nodo_entidad");

router.route("/getAll").get(
  function (req, res){
    nodo_entidad.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1, nodo_entidades:results
        });
      }
    });
  }
);

router.route("/:id_nodo/:id_tipo").get(
  function(req,res){
    nodo_entidad.getAllByNodo(req.params.id_nodo, req.params.id_tipo,
      function(err, results){
        if(err){
          res.send({success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1,  nodo_entidades:results
          });
        }
      }
    );
  }
);

router.route("/create").post(
  function(req,res){
    nodo_entidad.create(req.body.id_nodo, req.body.id_tipo, req.body.entidades, req.body.entidad_asigna,
      function(err, results){
        if(err){
          res.send({success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, nodo_entidades:results
          });
        }
      }
    );
  }
);

router.route("/createRecursive").post(
  function(req,res){
    nodo_entidad.createRecursive(req.body.id_nodo, req.body.id_tipo, req.body.entidades, req.body.entidad_asigna,
      function(err, results){
        if(err){
          res.send({success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, nodo_entidades:results
          });
        }
      }
    );
  }
);

router.route("/actualizaPadres").post(
  function(req,res){
    nodo_entidad.actualizaPadres(req.body.padresEntidades,
      function(err, results){
        if(err){
          res.send({success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, padresEntidades:results
          });
        }
      }
    );
  }
);

router.route("/deleteByNodo").post(
  function(req,res){
    nodo_entidad.setDisable(req.params.id_nodo, req.params.id_tipo,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          nodo_entidad.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1, nodo_entidades:results
              });
            }
          });
        }
      }
    );
  }
);

module.exports = router;
