const router    = require("express").Router(),
      permiso = require("../controllers/permiso");


router.route("/getAll").get(
  function (req, res){
    permiso.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,permisos:results
        });
      }
    });
  }
);

router.route("/:id_permiso").get(
  function(req,res){
    permiso.getById(req.params.id_permiso,
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

router.route("/disable").post(
  function(req,res){
    permiso.setDisable(req.body.ids,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          permiso.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1,permisos:results
              });
            }
          });
        }
      }
    );
  }
);



module.exports = router;
