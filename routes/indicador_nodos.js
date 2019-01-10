const router    = require("express").Router(),
      indicador_nodo = require("../controllers/indicador_nodo"),
      indicador = require("../controllers/indicador");
      indicadorArmado = require("../controllers/indicadores_armados");





router.route("/getAll").get(
  function (req, res){
    indicador_nodo.getAll(function(err,results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        res.json({
          success:1,indicador_nodos:results
        });
      }
    });
  }
);

router.route("/:id_indicador_nodo").get(
  function(req,res){
    indicador_nodo.getById(req.params.id_indicador_nodo,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
                success:1,indicador_nodos:results
          });
        }
      }
    );
  }
);

router.route("/create").post(
  function(req,res){
    indicador_nodo.create(
      req.body.indicador_nodo,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, indicador_nodos:results
          });
        }
      }
    );
  }
);


router.route ("/edit").post(
  function(req,res){
    indicador_nodo.edit(
      req.body.indicador_nodo,
      function(err, results){
        if(err){
          res.send({  success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
              success:1, indicador_nodos:results
          });
        }
      }
    );
  }
);


router.route("/disable").post(
  function(req,res){
    indicador_nodo.setDisable(req.body.ids,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          indicador_nodo.getAll(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              res.json({
                success:1,indicador_nodos:results
              });
            }
          });
        }
      }
    );
  }
);

router.route("/getByNodo").post(
  function(req,res){
    let objeto_nodo={   indicador:null, indicadores:[] };
    indicador_nodo.getByNodo(req.body.nodo,req.body.nodo_tipo,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          if(results[0]){
            objeto_nodo.indicador =results;
          }
          //hacemos la verificacion, si es actividad me traera todos los indicadores
          indicador.getAllExtended(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              objeto_nodo.indicadores = results;
              res.json({
                success:1,objeto_nodo:objeto_nodo
              });
            }
          });

        }
      }
    );
  }
);


router.route("/getByNodoImplementador").post(
  function(req,res){
    indicadorArmado.getIndicadores(req.body.nodo,
      function(err, results){
        if(err){
          res.send({success:0, errno: err.errno, message:err.sqlMessage});
        }else{
          res.json({
            success:1, listaIndicadores:results
          });
        }
      }

    );
  }
);



//parte que hace la populación de la bd
router.route("/populate").post(
  function(req,res){
    let indicadores = [];
    for(let i =0; i< req.body.objetoIndicador.indicadores.length; i++){
      let tmp_i = [0, req.body.objetoIndicador.indicadores[i].indicador, req.body.objetoIndicador.nodo, req.body.objetoIndicador.tipo, req.body.objetoIndicador.indicadores[i].valor];
      indicadores.push(tmp_i);
    }
    //limpiamos la base de datos.objetoIndicador.
    indicador_nodo.clean(req.body.objetoIndicador.nodo, function(err, results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        if(indicadores.length>0){
          indicador_nodo.populate(indicadores,
            function(err, results){
              if(err){
                res.send({success:0,errno: err.errno, message:err.sqlMessage});
              }else{
                res.json({
                  success:1,message:"datos actualizados"
                });
              }
            }
          );
        }else{
          res.json({
            success:1,message:"datos actualizados"
          });
        }
      }
    });

  }
);

router.route("/actualizar").post(function(req, res){
  //eliminamos los datos del planificado
  let valores_eliminar = [req.body.indicadorImplementador.nodo, req.body.indicadorImplementador.indicador];
  indicador_nodo.cleanPlanificado(valores_eliminar, function(err, results){
      if(err){
        res.send({success:0,errno: err.errno, message:err.sqlMessage});
      }else{
        //procedemos a insertar el planificado
        let indicadorImplementador = req.body.indicadorImplementador;
        let valores_insertar =[0, indicadorImplementador.planificado.indicador_nodo,indicadorImplementador.planificado.anio, indicadorImplementador.planificado.total, indicadorImplementador.indicador, indicadorImplementador.nodo, indicadorImplementador.nodoTipo,
        indicadorImplementador.planificado.valores[0].m1, indicadorImplementador.planificado.valores[0].m2,indicadorImplementador.planificado.valores[0].m3, indicadorImplementador.planificado.valores[0].m4,
        indicadorImplementador.planificado.valores[0].m5, indicadorImplementador.planificado.valores[0].m6, indicadorImplementador.planificado.valores[0].m7, indicadorImplementador.planificado.valores[0].m8,
        indicadorImplementador.planificado.valores[0].m9, indicadorImplementador.planificado.valores[0].m10, indicadorImplementador.planificado.valores[0].m11, indicadorImplementador.planificado.valores[0].m12]
        indicador_nodo.populatePlanificado(valores_insertar, function(err,results){
          if(err){
            res.send({success:0,errno: err.errno, message:err.sqlMessage});
          }else{
            //res.send({success:1, message:"creacion exitosa!"});
            //ahora limpiamos el planificado
            indicador_nodo.cleanReal(valores_eliminar, function(err, results){
              if(err){
                  res.send({success:0,errno: err.errno, message:err.sqlMessage});
              }else{
                  if(indicadorImplementador.real.length>0){
                    if(indicadorImplementador.tipo_desagregado===1){
                      //agregamos los de tipo de personas
                      let reales_insertar =[]
                      for(let i =0; i<indicadorImplementador.real.length;i++){
                        let real_tmp =[0,indicadorImplementador.indicador, indicadorImplementador.nodo,indicadorImplementador.nodoTipo,
                            indicadorImplementador.real[i].total, indicadorImplementador.tipo_desagregado, indicadorImplementador.indicador_nodo,indicadorImplementador.real[i].fecha,
                            indicadorImplementador.real[i].valores[0].rango1, indicadorImplementador.real[i].valores[0].rango2, indicadorImplementador.real[i].valores[0].rango3, indicadorImplementador.real[i].valores[0].rango4,
                            indicadorImplementador.real[i].valores[0].total, indicadorImplementador.real[i].valores[0].g1, indicadorImplementador.real[i].valores[0].g2,
                            indicadorImplementador.real[i].valores[1].rango1, indicadorImplementador.real[i].valores[1].rango2, indicadorImplementador.real[i].valores[1].rango3, indicadorImplementador.real[i].valores[1].rango4,
                            indicadorImplementador.real[i].valores[1].total, indicadorImplementador.real[i].valores[1].g1, indicadorImplementador.real[i].valores[1].g2
                          ]
                        reales_insertar.push(real_tmp)
                      }
                      indicador_nodo.insertarRealPersona([reales_insertar], function(err,results){
                        if(err){
                            res.send({success:0,errno: err.errno, message:err.sqlMessage});
                        }else{
                            res.send({success:1, message:"creacion exitosa!"});
                        }
                      });
                    }else if(indicadorImplementador.tipo_desagregado===2){
                      //agregamos los de tipo de empresas
                      let reales_insertar =[]
                      for(let i =0; i<indicadorImplementador.real.length;i++){
                        let real_tmp =[0,indicadorImplementador.indicador, indicadorImplementador.nodo,indicadorImplementador.nodoTipo,
                            indicadorImplementador.real[i].total, indicadorImplementador.tipo_desagregado, indicadorImplementador.indicador_nodo,indicadorImplementador.real[i].fecha,
                            indicadorImplementador.real[i].valores[0].establecidas, indicadorImplementador.real[i].valores[0].nuevas, indicadorImplementador.real[i].valores[1].establecidas,
                            indicadorImplementador.real[i].valores[1].nuevas
                          ]
                        reales_insertar.push(real_tmp)
                      }
                      indicador_nodo.insertarRealEmpresa([reales_insertar], function(err,results){
                        if(err){
                            res.send({success:0,errno: err.errno, message:err.sqlMessage});
                        }else{
                            res.send({success:1, message:"creacion exitosa!"});
                        }
                      });

                      //res.send({success:1, message:"creacion exitosa!"});
                    }else{
                      //agregamos los normales.
                      let reales_insertar =[]
                      for(let i =0; i<indicadorImplementador.real.length;i++){
                          let real_tmp =[0,indicadorImplementador.indicador, indicadorImplementador.nodo,indicadorImplementador.nodoTipo,
                            indicadorImplementador.real[i].total, indicadorImplementador.tipo_desagregado, indicadorImplementador.indicador_nodo,indicadorImplementador.real[i].fecha ]
                            reales_insertar.push(real_tmp)
                      }
                      indicador_nodo.insertarRealNormal([reales_insertar], function(err,results){
                        if(err){
                            res.send({success:0,errno: err.errno, message:err.sqlMessage});
                        }else{
                            res.send({success:1, message:"creacion exitosa!"});
                        }
                      })
                    }

                  }else{
                      res.send({success:1, message:"creacion exitosa!"});
                  }


              }
            })
          }
        });
      }
  });
});





module.exports = router;
