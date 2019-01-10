const mysql = require("mysql"),
      fs= require('fs'),
      path= require('path'),
      db_config = require("./db_config"),
      express = require("express"),
      bodyParser = require("body-parser"),
      db = require("./db"),
      authCheckMiddleware = require("./auth/auth-check"),
      env = process.env;

// se obtienen los modulos de las rutas del api.
const indexRoutes = require("./routes/index.js"),
      proyectoRoutes = require("./routes/proyectos.js"),
      programaRoutes = require("./routes/programas.js"),
      resultadoRoutes = require("./routes/resultados.js"),
      resultadoIntermedioRoutes = require("./routes/resultados_intermedios.js"),
      actividadRoutes = require("./routes/actividades.js"),
      usuarioRoutes = require("./routes/usuarios.js"),
      tareaRoutes = require("./routes/tareas.js"),
      entidadRoutes = require("./routes/entidades.js"),
      rolesRoutes = require("./routes/roles.js"),
      personasRoutes = require("./routes/personas.js"),
      puestosRoutes = require("./routes/puestos.js"),
      ganttRoutes = require("./routes/gantt.js"),
      actaConstitucionRoutes = require("./routes/acta_constitucion.js"),
      programaEntidadRoutes = require("./routes/programas_entidades.js"),
      indicadorRoutes = require("./routes/indicadores.js"),
      categoriaIndicadorRoutes = require("./routes/categorias_indicadores.js"),
      nodoArchivosRoutes = require("./routes/nodo_archivos.js"),
      unidadesMedidaRoutes = require("./routes/unidades_medida.js"),
      tiposDatoRoutes = require("./routes/tipos_dato.js"),
      reporteFrecuenciaRoutes = require("./routes/reporte_frecuencias.js"),
      reporteTiposRoutes = require("./routes/reporte_tipos.js"),
      predecesorRoutes = require("./routes/predecesores.js"),
      indicadorTiposRoutes = require("./routes/indicador_tipos.js"),
      indicadorNodosRoutes = require("./routes/indicador_nodos.js"),
      matrizIndicadoresRoutes = require("./routes/matriz_indicadores.js"),
      rolesPermisosRoutes = require("./routes/roles_permisos.js"),
      permisosRoutes = require("./routes/permisos.js"),
      reporteAvancesRoutes = require("./routes/reporte_avances.js");
      reporteControlRoutes = require("./routes/reporte_control.js");
const app = express();



db.connect(
  (err)=> {
    if(err){
      console.log("Error en la conexión");
      return;
    }else{
      console.log("conexión exitosa");
    }
  }
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Expires, Pragma");
  res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  next();
});
//asignación de recursos en línea para la API
//app.use("/",authCheckMiddleware);
app.use("/",indexRoutes);
app.use("/programas",programaRoutes);
app.use("/proyectos",proyectoRoutes);
app.use("/resultados",resultadoRoutes);
app.use("/resultados_intermedios",resultadoIntermedioRoutes);
app.use("/actividades",actividadRoutes);
app.use("/tareas",tareaRoutes);
app.use("/usuarios",usuarioRoutes);
app.use("/entidades",entidadRoutes);
app.use("/roles",rolesRoutes);
app.use("/personas",personasRoutes);
app.use("/puestos",puestosRoutes);
app.use("/gantt",ganttRoutes);
app.use("/acta_constitucion",actaConstitucionRoutes);
app.use("/programas_entidades", programaEntidadRoutes);
app.use("/indicadores", indicadorRoutes);
app.use("/categorias_indicadores", categoriaIndicadorRoutes);
app.use("/nodo_archivos", nodoArchivosRoutes);
app.use("/unidades_medida", unidadesMedidaRoutes);
app.use("/tipos_dato", tiposDatoRoutes);
app.use("/reporte_frecuencias", reporteFrecuenciaRoutes);
app.use("/reporte_tipos", reporteTiposRoutes);
app.use("/predecesores", predecesorRoutes);
app.use("/indicador_tipos", indicadorTiposRoutes);
app.use("/indicador_nodos", indicadorNodosRoutes);
app.use("/matriz_indicadores", matrizIndicadoresRoutes);
app.use("/roles_permisos", rolesPermisosRoutes);
app.use("/permisos", permisosRoutes);
app.use("/reporte_avances", reporteAvancesRoutes);
app.use("/reporte_control", reporteControlRoutes);

app.listen(env.NODE_PORT || 3000, env.NODE_IP || '0.0.0.0', function () {
  console.log(`Application worker ${process.pid} started...`);
});
