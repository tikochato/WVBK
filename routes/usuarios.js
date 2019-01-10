const router    = require("express").Router(),
      auth    = require("../auth/AuthController"),
      usuario = require("../controllers/usuario");



router.route("/getAll").get(
  function (req, res){
    usuario.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno,  message:err.sqlMessage? err.sqlMessage: err.message});
      }else{
        res.json({
          success:1, usuarios:results
        });
      }
    });
  }
);

router.route("/getByEntidad/:entidad").get(
  function (req, res){
    usuario.getByEntidad(req.params.entidad,
      function(err,results){
      if(err){
        res.send({success:0,errno: err.errno,  message:err.sqlMessage? err.sqlMessage: err.message});
      }else{
        res.json({
          success:1, usuarios:results
        });
      }
    });
  }
);

router.route("/:usuario").get(
  function(req,res){
    usuario.getById(req.params.usuario,
      function(err, results){
        if(err){
          res.send({success:0,errno: err.errno, message:err.sqlMessage? err.sqlMessage: err.message});
        }else{
          res.json({
              success:1,  usuarios:results
          });
        }
      }
    );
  }
);

router.route("/register").post(
  function(req,res){
    auth.register(req.body.usuario,
      function(err, results){
        if(err){
          res.send({success:0,errno: err.errno,  message:err.sqlMessage? err.sqlMessage: err.message});
        }else{
          res.json({
              success:1, usuarios:results
          });
        }
      }
    );
  }
);

router.route("/login").post(
  function(req,res){
    auth.login(req.body.usuario,
      function(err, results){
        if(err){
          res.send({success:0,errno: err.errno, message:err.sqlMessage? err.sqlMessage: err.message  });
        }else{
          res.json({
              success:1, usuarios:results
          });
        }
      }
    );
  }
);

router.route("/edit").post(
  function(req,res){
    usuario.edit(req.body.usuario,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno,  message:err.sqlMessage? err.sqlMessage: err.message});
        }else{
          res.json({
              success:1, usuarios:results
          });
        }
      }
    );
  }
);

router.route("/disable").post(
  function(req,res){
    usuario.setDisable(req.body.ids,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          usuario.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno,  message:err.sqlMessage? err.sqlMessage: err.message});
            }else{
              res.json({
                success:1, usuarios:results
              });
            }
          });
        }
      }
    );
  }
);

module.exports = router;
