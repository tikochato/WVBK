const db = require ("../db.js");

exports.report= function(done){
  let query = "select  a.nombre actividad,i.indicador_id numero_indicador, "
              +"i.name indicador, u.nombre unidad_medida, n.valor total, "
              +" i.desagregado desagregacion,t.nombre tipo_indicador, r.nombre frecuencia"
              +" from Actividad a, Indicador i, Indicador_Nodo n, unidad_medida u, Reporte_Frecuencia r, Indicador_Tipo t"
              +" Where n.nodo=a.actividad "
              +" and n.nodo_tipo=4"
              +" and n.indicador = i.indicador"
              +" and i.unidad_medida = u.unidad_medida"
              +" and r.reporte_frecuencia = i.reporte_frecuencia"
              +" and t.indicador_tipo = i.indicador_tipo";
  db.get().query( query, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
}


exports.getYears= function(done){
  let query = " select distinct anio from Indicador_Nodo_Planificado where total> 0 order by anio asc"
  db.get().query( query, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
}

exports.reportParte1=function(done){
  let query = "select  a.nombre actividad,i.indicador_id numero_indicador, "
            +"i.name indicador_nombre, u.nombre unidad_medida, n.indicador_nodo, n.indicador "
            +"from "
            +"Actividad a, Indicador i, Indicador_Nodo n, unidad_medida u, "
            +"Reporte_Frecuencia r, Indicador_Tipo t, "
            +"Indicador_Nodo_Planificado inp "
            +"Where n.nodo=a.actividad "
            +"and n.nodo_tipo=4 "
            +"and n.indicador = i.indicador "
            +"and i.unidad_medida = u.unidad_medida "
            +"and r.reporte_frecuencia = i.reporte_frecuencia "
            +"and t.indicador_tipo = i.indicador_tipo "
            +"and inp.indicador_nodo = n.indicador_nodo "
            +"group by a.nombre , i.indicador"

  db.get().query( query, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
}

exports.reportParte2=function(done){
  let query = "select  inn.indicador_nodo, inn.indicador, "
            +"(case when inp.anio>0 then inp.anio else 0 end) anio, "
            +"sum(case when inp.indicador_nodo=inn.indicador_nodo then inp.total else 0 end) total "
            +"from Indicador_Nodo inn "
            +"left join  Indicador_Nodo_Planificado inp on inn.indicador_nodo = inp.indicador_nodo "
            +"group by inn.indicador_nodo, inn.indicador,anio"

  db.get().query( query, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
}

exports.realAnualIndicador =function(done){
  let query = "select sum(total) total, YEAR(fecha_registro) anio, indicador_nodo from Indicador_Nodo_Real "
            +"group by YEAR(fecha_registro), indicador_nodo asc";
  db.get().query(query, function(err, rows){
    if(err) return done(err)
    return done(null, rows)
  })
}
