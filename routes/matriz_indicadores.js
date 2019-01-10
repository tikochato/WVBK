const router    = require("express").Router(),
      matriz_indicadores = require("../controllers/matriz_indicadores");

//funcion que realiza el arreglo para la nueva matriz_indicadores
joinReport=(anios, parte1, planificados, reales)=>{
  let parte1_s=[]
  anios = JSON.parse(JSON.stringify(anios))
  parte1=JSON.parse(JSON.stringify(parte1))
  planificados= JSON.parse(JSON.stringify(planificados))
  reales = JSON.parse(JSON.stringify(reales))
  for(let i =0; i<parte1.length; i++){
    let tmp_i = parte1[i]
    let total_planificado =0
    let total_real = 0
    tmp_i.planificado={}
    tmp_i.real={}
    tmp_i.unificado={}
    for(let i =0; i<anios.length; i++){
      let nombre_campo=anios[i].anio+""
      tmp_i.planificado[nombre_campo]=0
      tmp_i.unificado[nombre_campo]=[0,0]
      for(let j =0; j<planificados.length;j++){
        if(planificados[j].indicador_nodo === tmp_i.indicador_nodo && planificados[j].indicador ===tmp_i.indicador && nombre_campo == planificados[j].anio ){
          tmp_i.planificado[nombre_campo] = planificados[j].total
          tmp_i.unificado[nombre_campo][0]=planificados[j].total
          total_planificado = total_planificado + planificados[j].total
          break
        }
      }
      //ahora agregamos los reales
      tmp_i.real[nombre_campo]=0
      for(let j=0; j<reales.length; j++){
        if(reales[j].indicador_nodo === tmp_i.indicador_nodo && nombre_campo == reales[j].anio){
          tmp_i.real[nombre_campo] = reales[j].total
          total_real = total_real + reales[j].total
          tmp_i.unificado[nombre_campo][1]=reales[j].total
          break
        }
      }
    }
    tmp_i.total_planificado= total_planificado
    tmp_i.total_real = total_real
    parte1_s.push(tmp_i)
  }
  return(parte1_s)
}


  router.route("/").get(
    function (req, res){
      matriz_indicadores.getYears(function(err,anios){
        if(err){
          res.send({success:0,errno: err.errno, message:err.sqlMessage});
        }else{
          matriz_indicadores.reportParte1(function(err,results){
            if(err){
              res.send({success:0,errno: err.errno, message:err.sqlMessage});
            }else{
              matriz_indicadores.reportParte2(function(err,planificados){
                if(err){
                    res.send({success:0,errno: err.errno, message:err.sqlMessage});
                }
                else{
                  matriz_indicadores.realAnualIndicador(
                    function(err, results_reales){
                      if(err){
                        res.send({success:0,errno: err.errno, message:err.sqlMessage});
                      }else{
                        let valores= joinReport(anios,results, planificados, results_reales)
                        res.json({
                          success:1,matriz_indicadores:valores, anios:anios
                        })
                      }
                    }
                  )
                }
              })
            }
          })
        }
      });
    }
  );

module.exports = router;
