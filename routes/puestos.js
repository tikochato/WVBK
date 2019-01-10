const router    = require("express").Router(),
      puesto = require("../controllers/puesto");


router.route("/getAll").get(
  function (req, res){
    puesto.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,puestos:results
        });
      }
    });
  }
);

router.route("/getAllExtras").get(
  function (req, res){
    puesto.getAllExtras(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,puestos:results
        });
      }
    });
  }
);

router.route("/getByEntidades/:entidades").get(
  function (req, res){
    puesto.getByEntidades(req.params.entidades,
      function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,puestos:results
        });
      }
    });
  }
);

router.route("/:id_puesto").get(
  function(req,res){
    puesto.getById(req.params.id_puesto,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1,puestos:results
          });
        }
      }
    );
  }
);

router.route("/create").post(
  function(req,res){
    puesto.create(
      req.body.puesto,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, puestos:results
          });
        }
      }
    );
  }
);

router.route ("/edit").post(
  function(req,res){
    puesto.edit(
      req.body.puesto,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, puestos:results
          });
        }
      }
    );
  }
);

router.route("/disable").post(
  function(req,res){
    puesto.setDisable(req.body.ids,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          puesto.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1,puestos:results
              });
            }
          });
        }
      }
    );
  }
);



module.exports = router;
