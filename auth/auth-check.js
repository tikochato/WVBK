const jwt = require('jsonwebtoken'),
      usuarioController = require("../controllers/usuario"),
      config = require("../db_config");

module.exports = (req, res, next) => {
  //verificamos si la cabecera de autorización
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  //obtenemos los valores del token en la cabecera bearer
  const token = req.headers.authorization.split(' ')[1];

  // decodificado el token usando la frase secreta
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }
    const nombre_usuario = decoded.sub;
    // verificamos si el usuario existe.
    return usuarioController.getUser(nombre_usuario, (err, results) => {
      if (err || results.length==0) {
        return res.status(401).end();
      }
      return next();
    });
  });
};
