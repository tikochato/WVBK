/*
Clase para creación de querys para mysql
*/
const constantes = require("./utils/constantes");
const path = constantes.PATH;
/**
TODO:
1: manejo de usuarios
3: verificar optimización
**/



/**
Prepara los INSERT
**/
exports.insert=function(model, input, done){
  const modelo = require(path+model);
  let query = "INSERT INTO "+ model + " (";
  let query2 = " values (";
  let valores =[];
  let tam_asignacion = 0;
  let addFechaCreacion = false;
  let addEstado = false;
  //recorre las columnas que no son llaves primarias
  for (campo in modelo.columnas){
    if(input.hasOwnProperty(modelo.columnas[campo])){
      if(tam_asignacion >0){
        query+=", ";
        query2+=", ";
      }
      query += modelo.columnas[campo];
      query2  += "?";
      valores.push(input[modelo.columnas[campo]]);
      tam_asignacion++;
    }else{
      if(modelo.columnas[campo] === "fecha_creacion"){addFechaCreacion = true}
      if(modelo.columnas[campo] === "estado"){addEstado = true}
    }
  }
  //recorre las llaves primarias
  for (campo in modelo.llaves){
    if(input.hasOwnProperty(modelo.llaves[campo])){
      if(campo < modelo.llaves.length){
          query+= ", ";
          query2+=", ";
      }
      query+= modelo.llaves[campo];
      query2+= "?";
      valores.push(input[modelo.llaves[campo]]);
    }
  }
  //se agrega la fecha de fecha_creacion
  if(addFechaCreacion){
    query += ", fecha_creacion";
    query2 += ", ?";
    valores.push(new Date());
  }
  if(addEstado){
    query += ", estado";
    query2 += ", ?";
    valores.push(1);
  }
  query += ") "+query2+")";
  return done (null, query, valores);
};



/**
Prepara los UPDATE
**/
exports.update =function(model, input, done){
  const modelo = require(path+model);
  let query ="UPDATE "+model+" set ";
  let valores =[];
  let tam_asignacion =0;
  let addFechaActualizacion = false;
  //recorremos las columnas que se van actualizar
  for (campo in modelo.columnas){
    if(modelo.columnas[campo]!="fecha_actualizacion" && modelo.columnas[campo]!="fecha_creacion" &&input.hasOwnProperty(modelo.columnas[campo])){
      if(tam_asignacion>0){
        query+= ", ";
      }
      query += modelo.columnas[campo]+" = ?";
      tam_asignacion ++;
      valores.push(input[modelo.columnas[campo]]);
     }else{
      if(modelo.columnas[campo] === "fecha_actualizacion"){addFechaActualizacion = true}
    }
  }
  if(addFechaActualizacion){
    query += " ,fecha_actualizacion = ? "
    valores.push(new Date());
  }
  query += " WHERE ";
  tam_asignacion = 0;
  //recorremos las llaves primarias
  for(campo in modelo.llaves){
    if(input.hasOwnProperty(modelo.llaves[campo])){
      if(tam_asignacion > 0){
        query+=" AND ";
      }
      query += modelo.llaves[campo]+ " = ?";
      valores.push(input[modelo.llaves[campo]]);
      tam_asignacion++;
    }
  }
  return done (null, query, valores);
}

/**
Realiza el borrado lógico
**/

exports.setDisable= function(model, input, done){
  if(!model){
    return done({success:0, message:"No se define modelo."});
  }else if(input.length<=0){
    return done({success:0, message:"No se enviaron elementos a borrar"});
  }else{
    const modelo = require(path+model);
    let query = "UPDATE "+ model +" SET estado = 0 where "+modelo.llaves[0]+ " in (";
    let valores =[];
    for(valor in input){
      if(valor == 0){
        query += " ?";
      }else{
        query += ", ?"
      }
      valores.push(input[valor]);
    }
    query += ")";
    return done(null, query, valores);
  }
}
