const router    = require("express").Router(),
      rol_permiso = require("../controllers/rol_permiso");


router.route("/getAll").get(
  function (req, res){
    rol_permiso.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,roles_permisos:results
        });
      }
    });
  }
);

router.route("/getById/:id_rol/:id_permiso").get(
  function(req,res){
    rol_permiso.getById(req.params.id_rol, req.params.id_permiso,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1,roles_permisos:results
          });
        }
      }
    );
  }
);

router.route("/create").post(
  function(req,res){
    rol_permiso.create(
      req.body.rol_permiso,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, roles_permisos:results
          });
        }
      }
    );
  }
);

router.route ("/edit").post(
  function(req,res){
    rol_permiso.edit(
      req.body.rol_permiso,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, roles_permisos:results
          });
        }
      }
    );
  }
);

router.route("/disable").post(
  function(req,res){
    rol_permiso.setDisable(req.body.rolId, req.body.permisoId,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          rol_permiso.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1,roles_permisos:results
              });
            }
          });
        }
      }
    );
  }
);

router.route("/:id_rol").get(
  function(req,res){
    rol_permiso.getByRol(req.params.id_rol,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1,roles_permisos:results
          });
        }
      }
    );
  }
);

router.route("/getPermisosByUsuario/:id_usuario").get(
  function(req,res){
    rol_permiso.getPermisosByUsuario(req.params.id_usuario,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1,permisos:results
          });
        }
      }
    );
  }
);

module.exports = router;
