
exports.PATH = "./models/";

exports.NODO_TIPO = {
  programa:               0,
  proyecto:               1,
  resultado:              2,
  resultado_intermedio:   3,
  actividad:              4,
  tarea:                  5,
}

exports.NODO_TIPO_TEXTO = [
  'Programa',
  'Proyecto',
  'Resultado',
  'Resultado Intermedio',
  'Actividad',
  'Tarea',
];

exports.NODO_TABLA = [
  'Programa',
  'Proyecto',
  'Resultado',
  'Resultado_Intermedio',
  'Actividad',
  'Tarea',
];

exports.NODO_GANTT = [
  {id: 2, texto: 'Resultado'},
  {id: 3, texto: 'Resultado Intermedio'},
  {id: 4, texto: 'Actividad'},
  {id: 5, texto: 'Tarea'},
];


exports.NODO_COLOR = [
  '#00796b', //programa
  '#009688', //proyecto
  '#3F51B5', //resultado
  '#673ab7', //resultado intermedio
  '#FF9800', //actividad
  '#00BCD4', //tarea
]
