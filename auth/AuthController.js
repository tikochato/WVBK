const jwt = require('jsonwebtoken'),// para manejar los json jsonwebtoken
      bcrypt = require('bcryptjs'), //para manejar el hash para los usuarios
      usuarioController = require("../controllers/usuario"), //para manejar los usuarios.
      config = require("../db_config");//para obtener la parte secreta y firmar y leer las firmas.

/*
// TODO:
1- hacer la estrategia de password reset
*/

//función para crear los usuarios
exports.register = function(usuario,done){
  //verificacmos si existe un usuario con el mismo alias
  usuarioController.getUser(usuario.nombre_usuario,
    function(err,results){
      if(err) return done(err);
      if(results.length >0){
        return done({success: 0, message:"ya existe el usuario"});
      }else{
        //hacemo el hash del password
        let hashedPassword =  bcrypt.hashSync(usuario.password.trim(), 12);
        //lo agregamos
        usuario.password = hashedPassword;
        usuarioController.create(usuario,
          function(err, results){
            if(err){
              return done(err);
            }else{
              const payload = {sub: usuario.nombre_usuario};
              const token  = jwt.sign(payload, config.jwtSecret);
              results.token =token;
              return done(null,results);
            }
          }
        )
      }
    }
  );
};


exports.login=function(usuario,done){
  usuarioController.getUser(usuario.nombre_usuario,
    function(err,results){
      if(err) return done(err);
      if(results.length>0){
        let passwordIsValid = bcrypt.compareSync(usuario.password,results[0].password);
        if(!passwordIsValid){
          return done({success:0, message:"Login fallido."});
        }else{
          const payload = {sub: usuario.nombre_usuario};
          const token  = jwt.sign(payload, config.jwtSecret);
          return done(null, {success:1, token: token, entidad: results[0].entidad, nombre_entidad: results[0].nombre_entidad, prime: results[0].es_prime, nombre_usuario: results[0].nombre_usuario, usuario: results[0].usuario});
        }
      }else{
        return done({success:0, message:"Login fallido."});
      }
    }
  );
};
