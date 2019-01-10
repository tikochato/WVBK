const tablas = require("./getTables");
const db = require ("../db.js");
const fs = require("fs");

db.connect(
  (err)=> {
    if(err){
      console.log("Error en la conexión");
      return;
    }else{
      console.log("Conexión exitosa");
    }
  }
);
tablas.getTables("gap", function(err,results){
  if(err) console.log(err);
  else getColumnsByTable(JSON.parse(results));
});

function getColumnsByTable(tables){

  for (table in tables){
    let table_name = tables[table].table_name;
    tablas.getColumns("gap",table_name, function(err,resultsColumns){
      if(err){
        console.log(err);
      }else{
        tablas.getPrimaryKeys("gap",table_name,function(err,results){
            if(err){
              console.log(err);
            }else{
              makeFiles({tabla:table_name, columnas:JSON.parse(resultsColumns),llaves:JSON.parse(results) });
            }
        });
      }
    });
  }

}

function makeFiles(input){
  let tabla = {nombre:"",columnas:[], llaves:[]};
  tabla.nombre=input.tabla;
  for (column in input.columnas){
    tabla.columnas.push(input.columnas[column].COLUMN_NAME);
  }
  for (column in input.llaves){
    tabla.llaves.push(input.llaves[column].COLUMN_NAME);
  }
  let resultado =fs.writeFile('models/'+input.tabla+'.json',JSON.stringify(tabla), 'utf8', function(err){
    if(err) console.log("error "+err);
    else console.log("escribiendo archivo: "+ input.tabla+".json");
  });
}
