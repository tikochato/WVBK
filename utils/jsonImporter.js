/** proceso de importación:
* 1- se converte el formato del texto, de ISO a utf8 para poder almacenar carácteres
* 2- se almacena el texto en utf8 a otro archivo para que pueda ser procesado.
* 3- se convierte el archivo CSV anterior a json.
* 4- se lee el archivo json para que pueda ser procesado objeto por objeto
* 5- cada objeto será introducido en según el nivel
**/
//importar el modulo de leer json
const StreamArray  = require("stream-json/streamers/StreamArray");
const {Writable} = require('stream');
const fs = require('fs');
//convierte el csv en json
const jsonConverter = require("./jsonConverter");
const csvFilePath = process.argv[2];
const db = require('./dbImport');
const bluebird= require('bluebird');
const Bulk = require('./bulkClass');
const moment = require("moment");
let proyectoid =21;
let username= 1;
let programaid =1;
let records = [];
let current ={
  programa:programaid,
  proyecto:proyectoid,
  resultado:"",
  resultado_intermedio:"",
  actividad:"",
  tarea:"",
  padreIdRestulado:"",
  padreIdActividad:"",
  tareaPadre:" ",
  padre:""
};

let valorNumerico = cadena =>{
  let campos = cadena.split(" ");
  return campos;
}



//función que hace las inserciones
const insertar = async () => {
    batch = 50000;
    console.time('Tiempo insercion fase#1')
    const conn = await db()
    let query = "CREATE TABLE IF NOT EXISTS  `bulk` ("
              +"`idbulk` int(11) NOT NULL,"
              +"`tipo` int(11) DEFAULT NULL,"
              +"`nombre` varchar(500) DEFAULT NULL,"
              +"`fecha_inicio_plan` date DEFAULT NULL,"
              +"`fecha_inicio_actual` date DEFAULT NULL,"
              +"`duracion` int(11) DEFAULT NULL,"
              +"`usuario_creo` varchar(45) DEFAULT NULL,"
              +"`fecha_creacion` date DEFAULT NULL,"
              +"`id` varchar(45) DEFAULT NULL,"
              +"`programa` int(11) DEFAULT NULL,"
              +"`proyecto` varchar(100) DEFAULT NULL,"
              +"`resultado` varchar(100) DEFAULT NULL,"
              +"`resultado_intermedio` varchar(100) DEFAULT NULL,"
              +"`actividad` varchar(100) DEFAULT NULL,"
              +"`tarea` varchar(100) DEFAULT NULL,"
              +"`padre` varchar(45) DEFAULT NULL,"
              +"PRIMARY KEY (`idbulk`)"
              +")";

    await conn.query(query);
    query = `INSERT INTO bulk VALUES ?`
    const bulk = Bulk({
        conn,
        batch,
        query
    })
    await conn.query(`TRUNCATE TABLE bulk`)
    await bluebird.each(records, r => {
        return bulk.add(r)
    })
    await bulk.flush()
    //limpiando la base
    /*
    console.time("Limpiando BD");
    query ="  Update Tarea set tarea_padre  =null where tarea >0;";
    await conn.query(query);
    query ="delete from Tarea where tarea >0;";
    await conn.query(query);
    query ="Update Actividad set actividad_padre = null where actividad >0;";
    await conn.query(query);
    query ="delete from Actividad where actividad >0;";
    await conn.query(query);
    query ="delete from Resultado_Intermedio where resultado_intermedio >0;";
    await conn.query(query);
    query ="delete from Resultado where resultado > 0;";
    await conn.query(query);
    console.timeEnd("Limpiando BD");
    */

    console.timeEnd('Tiempo insercion fase#1');
    console.time('Carga Resultados')
    query  = "INSERT INTO Resultado ("
           +"resultado, nombre, fecha_inicio_plan, "
           +"fecha_inicio_actual, duracion, proyecto, id, "
           +"usuario_creo, fecha_creacion, estado) "
           +"Select 0, b.nombre, b.fecha_inicio_plan, "
           +"b.fecha_inicio_actual, b.duracion, p.proyecto, b.id, "
           +"b.usuario_creo, b.fecha_creacion, 1 "
           +"from bulk  b, Proyecto p where b.tipo =2 and p.proyecto = b.proyecto;";
    await conn.query(query).catch((err)=>{
      console.log(err);
    });
    console.timeEnd('Carga Resultados')
    console.time('Carga Resultados Intermedios')
    query = "INSERT INTO Resultado_Intermedio ("
          +"resultado_intermedio, nombre, fecha_inicio_plan, "
          +"fecha_inicio_actual, duracion, resultado, "
          +"id, usuario_creo, fecha_creacion, estado) "
          +"Select 0, b.nombre, b.fecha_inicio_plan, "
          +"b.fecha_inicio_actual, b.duracion, p.resultado, "
          +"b.id, b.usuario_creo, b.fecha_creacion, 1 "
          +"from bulk  b, Resultado p, Proyecto A where b.tipo =3 "
          +"and p.id = b.resultado and p.proyecto = A.proyecto "
          +"and b.proyecto =  A.proyecto;";
    await conn.query(query).catch((err)=>{
      console.log(err);
    });
    console.timeEnd('Carga Resultados Intermedios')
    console.time('Carga Actividades')
    query ="INSERT INTO Actividad (actividad, nombre, fecha_inicio_plan, fecha_inicio_actual, duracion, resultado_intermedio, id, padreId, usuario_creo, fecha_creacion, estado, proyectoId) Select 0, b.nombre, b.fecha_inicio_plan, b.fecha_inicio_actual, b.duracion, p.resultado_intermedio, b.id, b.padre, b.usuario_creo, b.fecha_creacion, 1 , d.proyecto FROM bulk b,Resultado_Intermedio p,Proyecto d,Resultado a WHERE b.tipo = 4 AND b.proyecto = a.proyecto AND b.resultado= a.id AND b.resultado_intermedio = p.id AND p.resultado = a.resultado AND a.resultado = p.resultado AND a.proyecto = d.proyecto AND b.proyecto = d.proyecto; "
    await conn.query(query);
    console.timeEnd('Carga Actividades')
    console.time('Carga Tareas')
    query = "INSERT INTO Tarea ("
           +" Tarea, nombre, fecha_inicio_plan, "
           +" fecha_inicio_actual, duracion, actividad, "
           +" id, padreId, usuario_creo, "
           +" fecha_creacion, estado, proyectoId) "
           +" SELECT 0, b.nombre, b.fecha_inicio_plan,  b.fecha_inicio_actual,  b.duracion,  p.actividad,"
           +" b.id,   b.padre,  b.usuario_creo,  b.fecha_creacion,  1,   d.proyecto"
           +" FROM bulk b,  Actividad p,  Proyecto d,  Resultado_Intermedio ri,  Resultado r"
           +" WHERE  b.tipo = 5   AND b.actividad = p.id  AND b.resultado_intermedio = ri.id  AND b.resultado = r.id "
           +" AND b.proyecto = d.proyecto AND r.proyecto = d.proyecto AND r.resultado = ri.resultado "
           +" AND ri.resultado_intermedio = p.resultado_intermedio;";
    await conn.query(query).catch((err)=>{
      console.log(err);
    });
    console.timeEnd('Carga Tareas')
    await conn.end()
    console.timeEnd("Proceso total");
};
console.time("Proceso total");
console.time("Tranformando Formato");
jsonConverter.makeJson(csvFilePath,(error, fileName)=>{
  if(error){
    console.log(error);
  }else{
    console.timeEnd("Tranformando Formato");
     let contador=0;
     let fileStream = fs.createReadStream(fileName);
     let jsonStream = StreamArray.withParser();
     console.time("Tiempo transformacion de Datos");
     let processingStream = new Writable({
       write(object, encoding, callback){
         //aqui escribimos los datos que queremos
         contador++;
         //se transforma los datos a los valores deseados.
         if(object.value.EDT){
           row = object.value
           level = row.EDT.length;
           let elemento = {
             idbulk:contador,
             nombre: row.Nombre,
             fecha_inicio_plan:moment(row.Comienzo,"DD/MM/YY").format("YYYY-MM-DD"),
             fecha_inicio_actual:moment(row.Comienzo,"DD/MM/YY").format("YYYY-MM-DD"),
             duracion:valorNumerico(row["Duración"])[0], progreso:"0.0",
             usuario_creo:username,
             fecha_creacion: new Date(), estado: 1,
             id:row.EDT,
             programa:"",
             proyecto:"",
             resultado:"",
             resultado_intermedio:"",
             actividad:"",
             tarea:""
           }
           switch (level) {
             case 1:
               elemento.tipo=2;
               elemento.programa=current.programa;
               elemento.proyecto=current.proyecto;
               row.EDT=row.EDT.replace(" ","");
               elemento.resultado=row.EDT.trim().slice();
               let padre = row.EDT.trim().slice();
               elemento.padre=padre.substring(0, padre.lastIndexOf("."));
               records.push([
               elemento["idbulk"],elemento["tipo"],elemento["nombre"],elemento["fecha_inicio_plan"],elemento["fecha_inicio_actual"],
               elemento["duracion"],elemento["usuario_creo"],elemento["fecha_creacion"],elemento["id"], elemento["programa"],
               elemento["proyecto"],elemento["resultado"], elemento["resultado_intermedio"],elemento["actividad"],
               elemento["tarea"], elemento["padre"] ]);
               current.resultado=row.EDT.trim().slice();
               break;
             case 3:
               elemento.tipo=3;
               elemento.programa=current.programa;;
               elemento.proyecto=current.proyecto;
               elemento.resultado=current.resultado;
               row.EDT=row.EDT.replace(" ","");
               elemento.resultado_intermedio=row.EDT.trim().slice();
               let padre1 = row.EDT.trim().slice();
               elemento.padre=padre1.substring(0, padre1.lastIndexOf("."));
               records.push([
               elemento["idbulk"],elemento["tipo"],elemento["nombre"],elemento["fecha_inicio_plan"],elemento["fecha_inicio_actual"],
               elemento["duracion"],elemento["usuario_creo"],elemento["fecha_creacion"],elemento["id"], elemento["programa"],
               elemento["proyecto"],elemento["resultado"], elemento["resultado_intermedio"],elemento["actividad"],
               elemento["tarea"], elemento["padre"] ]);
               current.resultado_intermedio=row.EDT.trim().slice();
               current.padreIdRestulado= row.EDT.trim().slice();
               break;
             case 5:
               elemento.tipo=4;
               elemento.programa=current.programa;
               elemento.proyecto=current.proyecto;
               elemento.resultado=current.resultado;
               elemento.resultado_intermedio=current.resultado_intermedio;
               row.EDT=row.EDT.replace(" ","");
               elemento.actividad=row.EDT.trim().slice();
               let padre2 = row.EDT.trim().slice();
               elemento.padre=padre2.substring(0, padre2.lastIndexOf("."));
               records.push([
               elemento["idbulk"],elemento["tipo"],elemento["nombre"],elemento["fecha_inicio_plan"],elemento["fecha_inicio_actual"],
               elemento["duracion"],elemento["usuario_creo"],elemento["fecha_creacion"],elemento["id"], elemento["programa"],
               elemento["proyecto"],elemento["resultado"], elemento["resultado_intermedio"],elemento["actividad"],
               elemento["tarea"], elemento["padre"] ]);
               current.actividad=row.EDT.trim().slice();
               break;
             default:
               elemento.tipo=5;
               elemento.programa=current.programa;
               elemento.proyecto=current.proyecto;
               elemento.resultado=current.resultado;
               elemento.resultado_intermedio=current.resultado_intermedio;
               elemento.actividad=current.actividad;
               row.EDT=row.EDT.replace(" ","");
               elemento.tarea=row.EDT.trim().slice();
               let padre3 = row.EDT.trim().slice();
               elemento.padre=padre3.substring(0, padre3.lastIndexOf("."));
               records.push([
               elemento["idbulk"],elemento["tipo"],elemento["nombre"],elemento["fecha_inicio_plan"],elemento["fecha_inicio_actual"],
               elemento["duracion"],elemento["usuario_creo"],elemento["fecha_creacion"],elemento["id"], elemento["programa"],
               elemento["proyecto"],elemento["resultado"], elemento["resultado_intermedio"],elemento["actividad"],
               elemento["tarea"], elemento["padre"] ]);
               current.tarea=row.EDT.trim().slice();
               break;
           }
         }


          callback();
       },
       objectMode:true
     });
     fileStream.pipe(jsonStream.input);
     jsonStream.pipe(processingStream);
     processingStream.on('finish', () =>{
       console.timeEnd("Tiempo transformacion de Datos");
       console.log("lineas procesadas : "+ contador);
       insertar();
     });
  }

}

);
