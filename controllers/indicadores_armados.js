const db = require('../utils/dbImport');
const moment = require("moment")
const cargarIndicadores = async (nodo) => {

    const conn = await db();
    let query = "Select i.indicador_nodo, d.indicador , d.indicador_id, d.nombre, u.nombre unidad_medida, d.tipo_desagregado from Indicador_Nodo i, Tarea t, Indicador d, unidad_medida u where i.nodo_tipo=4 and t.actividad=i.nodo and t.tarea=? and d.indicador = i.indicador and u.unidad_medida = d.unidad_medida";
    let [lista, campos]  = await conn.query(query, nodo);
    let listaIndicadores =[];
    if(lista.length>0){
      for(let i =0; i<lista.length; i++){
        let tmp =lista[i];
        tmp.real=[];
        query =   "Select * from Indicador_Nodo_Planificado where nodo =? and indicador =?";

        let [valor, campos] = planificado = await conn.query(query, [nodo, tmp.indicador])
        if(valor.length===0){
          valor ={
            "total":0,
            "anio": (new Date()).getFullYear(),
            "valores":[
              {"m1":0, "m2":0, "m3":0, "m4":0, "m5":0, "m6":0, "m7":0, "m8":0, "m9":0, "m10":0, "m11":0, "m12":0}
            ],
            "indicador_nodo": tmp.indicador_nodo
          }
        }else{
          let tmp_valor = JSON.parse(JSON.stringify(valor[0]));
          valor ={}
          valor.total = tmp_valor.total
          valor.anio = tmp_valor.anio
          valor.valores = [
            {"m1":tmp_valor.m1, "m2":tmp_valor.m2, "m3":tmp_valor.m3, "m4":tmp_valor.m4, "m5":tmp_valor.m5, "m6":tmp_valor.m6,
            "m7":tmp_valor.m7, "m8":tmp_valor.m8, "m9":tmp_valor.m9, "m10":tmp_valor.m10, "m11":tmp_valor.m11, "m12":tmp_valor.m12}
          ]
          valor.indicador_nodo = tmp_valor.indicador_nodo
        }
        // aqui se prepara la columna cuando exista el valor
        tmp.planificado =valor;

        //aqui se hace la carga del real
        query ="Select * from Indicador_Nodo_Real where nodo =? and indicador = ?"
        let [real, campos1] = planificado = await conn.query(query, [nodo, tmp.indicador])
        let real_preparado =[]
        for (let i = 0; i < real.length; i++) {
          let item_real ={}
          item_real.total = real[i].total
          item_real.fecha =  moment(real[i].fecha_registro).format('YYYY-MM-DD');
          item_real.tipo = real[i].tipo_desagregado
          item_real.valores = []
          if(real[i].tipo_desagregado===1){
            //desagregado de personas
            item_real.valores=[
              {
                sexo:"Hombres", rango1:real[i].hombres_rango1,rango2:real[i].hombres_rango2,rango3:real[i].hombres_rango3,
                rango4:real[i].hombres_rango4, total:real[i].hombres_total, g1:real[i].hombres_g1, g2:real[i].hombres_g2
              },
              {
                sexo:"Mujeres", rango1:real[i].mujeres_rango1,rango2:real[i].mujeres_rango2,rango3:real[i].mujeres_rango3,
                rango4:real[i].mujeres_rango4, total:real[i].mujeres_total, g1:real[i].mujeres_g1, g2:real[i].mujeres_g2
              },
            ]
          }else if(real[i].tipo_desagregado===2){
            //desagregado de empresas
            item_real.valores=[
              {tipo:"Formales", establecidas:real[i].formales_establecidas, nuevas:real[i].formales_nuevas},
              {tipo:"Informales", establecidas:real[i].informales_establecidas, nuevas:real[i].informales_nuevas},
            ]
          }
          real_preparado.push(item_real)
        }
        tmp.real = real_preparado
        tmp.nodo =nodo;
        listaIndicadores.push(tmp);
      }
    }
    return  listaIndicadores;
}

exports.getIndicadores = function (nodo, done){
  cargarIndicadores(nodo).then((listaIndicadores)=>{done(null, listaIndicadores)})
}
