# wv-gap backend

_Repositorio del software de servidor de Backend_

## Instalación
~~~~
npm install
~~~~

## Configuración de archivo de base de datos
Luego de instalación de las librerías y depedencias es necesario crear el archivo __db_config.json__  que contiene las credenciales para la conexión a la base de datos.
La estructura del archivo de configuración:


~~~~JSON
{
  "host":"localhost",
  "user":"usuario",
  "password": "secreto",
  "db":"nombre base de datos",
  "jwtSecret":"frase secreta para la verificación de los tokens"
}
~~~~
## Cargar los modelos
Para que el backend pueda abrir los modelos de las tablas de la base de datos es necesario correr el script "makeModels.js" ubicado en el directorio "utils".

~~~~
node utils/makeModels.js
~~~~
luego de ejecutar el comando, se actualizarán los archivos .json ubicados en la carpeta "models/". Estos modelos ayudan a la herramienta "queryBuilder.js" para que se pueda manejar el modelo de datos.

## Ejecutar el Backend
El servidor se puede ejecutar en modo de producción y en modo de desarrollo. El servidor se ejecuta en el puerto "3000"
Para poder ejecutar en modo de desarrollo se debe de ejecutar el siguiente comando:

~~~~
npm run dev
~~~~
Para ejecutar el servidor en modo de producción se ejecuta el siguiente comando:

~~~~
npm start
~~~~


## Acceso a los recursos del API
El Api tiene asignada las rutas de los recursos de la siguiente para cada nivel, además se tiene configurado tres 4 acciones para cada uno de los recursos.

Las rutas son las siguientes:

 * **localhost:3000/programas**
 * **localhost:3000/proyectos**
 * **localhost:3000/resutados**
 * **localhost:3000/resultados_intermedios**
 * **localhost:3000/actividades**
 * **localhost:3000/tareas**

Las acciones para cada uno de las rutas son las siguientes:

|Acción|Método de Conexión |Ruta|Parámetros enviados |Objeto recibido|
|:----:|:-----------------:|:--:|:------------------:|:-------------|
|getAll|GET|ruta/getAll|  no se coloca nada | Objeto json con arreglo interior|
|getById|GET|ruta/:id|el id del nivel, se coloca en la ruta (sin los dos puntos)|Objeto json con arreglo interior|
|create|POST|ruta/create|un objeto json con un objeto interior que indica que nivel es. Ejemplo **{tarea:{tarea:"1",nombre:"nombre"}}**|objeto json con resultados.|
|edit|POST|ruta/edit/| un objeto json con un objeto interior que indica que nivel es. Ejemplo **{tarea:{tarea:"1",nombre:" nuevo nombre"}}** en este caso los valores son actualizados. |objeto json con resultados.|

#### Creación y Eliminación
Para crear un elemento es necesario enviar los ID autoincrementales con valor "0".
Ejemplo:
~~~~JSON
{
    "tarea":{
        "tarea":"0",
        "descripcion":"descripcion"
 	}
}
~~~~
Para hacer la eliminación lógica sólo es necesario llamar el método edit y enviar el estado con valor "0".
Ejemplo:
~~~~JSON
{
    "tarea":{
        "tarea":"1",
        "descripcion":"nueva descripcion",
        "estado":"0"
    }
}


~~~~
