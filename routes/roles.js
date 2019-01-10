const router    = require("express").Router(),
      rol = require("../controllers/rol");



router.route("/getAll").get(
  function (req, res){
    rol.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1, roles:results
        });
      }
    });
  }
);

router.route("/:id_rol").get(
  function(req,res){
    rol.getById(req.params.id_rol,
      function(err, results){
        if(err){
          res.send({success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1,  roles:results
          });
        }
      }
    );
  }
);

router.route("/create").post(
  function(req,res){
    rol.create(req.body.rol, req.body.rolPermisos,
      function(err, results){
        if(err){
          res.send({success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, roles:results
          });
        }
      }
    );
  }
);

router.route("/edit").post(
  function(req,res){
    rol.edit(req.body.rol, req.body.rolPermisos,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, roles:results
          });
        }
      }
    );
  }
);

router.route("/disable").post(
  function(req,res){
    rol.setDisable(req.body.ids,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          rol.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1, roles:results
              });
            }
          });
        }
      }
    );
  }
);

module.exports = router;
