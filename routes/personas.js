const router    = require("express").Router(),
      persona = require("../controllers/persona");


router.route("/getAll").get(
  function (req, res){
    persona.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,personas:results
        });
      }
    });
  }
);

router.route("/getAllWithUser").get(
  function (req, res){
    persona.getAllWithUser(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,personas:results
        });
      }
    });
  }
);

router.route("/:id_persona").get(
  function(req,res){
    persona.getById(req.params.id_persona,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1,personas:results
          });
        }
      }
    );
  }
);

router.route("/create").post(
  function(req,res){
    persona.create(
      req.body.persona,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, personas:results
          });
        }
      }
    );
  }
);

router.route ("/edit").post(
  function(req,res){
    persona.edit(
      req.body.persona,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, personas:results
          });
        }
      }
    );
  }
);

router.route("/disable").post(
  function(req,res){
    persona.setDisable(req.body.ids,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          persona.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1,personas:results
              });
            }
          });
        }
      }
    );
  }
);

module.exports = router;
