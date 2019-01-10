const router    = require("express").Router(),
      tipo_dato = require("../controllers/tipo_dato");


router.route("/getAll").get(
  function (req, res){
    tipo_dato.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,tipos_dato:results
        });
      }
    });
  }
);

router.route("/:id_tipo_dato").get(
  function(req,res){
    tipo_dato.getById(req.params.id_tipo_dato,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1,tipos_dato:results
          });
        }
      }
    );
  }
);

router.route("/create").post(
  function(req,res){
    tipo_dato.create(
      req.body.tipo_dato,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, tipos_dato:results
          });
        }
      }
    );
  }
);

router.route ("/edit").post(
  function(req,res){
    tipo_dato.edit(
      req.body.tipo_dato,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, tipos_dato:results
          });
        }
      }
    );
  }
);

router.route("/disable").post(
  function(req,res){
    tipo_dato.setDisable(req.body.ids,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          tipo_dato.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1, tipos_dato:results
              });
            }
          });
        }
      }
    );
  }
);



module.exports = router;
