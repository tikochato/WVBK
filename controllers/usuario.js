const db = require ("../db.js");
const queryBuilder = require("../queryBuilder");

const tabla= "Usuario";

exports.create = function(usuario, done){
  queryBuilder.insert("Usuario", usuario, function(err, query,valores){
    if(err){
      done(err);
    }else{
      db.get().query(query,valores,function(err, result){
          if (err) return done (err);
          else return done(null, result);
        }
      );
    }
  });
}

exports.edit= function(usuario, done){
  if(usuario.password){
    done({succes:0, message:"se intenta cambiar password"});
  }else{
    queryBuilder.update(tabla, usuario, function(err,query,valores){
      if(err){
        done(err);
      }else{
        db.get().query(query,valores,function(err, result){
            if (err) return done (err);
            else return done(null, result);
          }
        );
      }
    }

    );
  }

};

exports.setDisable =function(usuario, done){
  queryBuilder.setDisable("Usuario", usuario, function(err,query,valores){
    if(err){
      done(err);
    }else{
      db.get().query(query,valores,function(err, result){
          if (err) return done (err);
          else return done(null, result);
        }
      );
    }
  }
  );
};

exports.getAll = function(done){
  db.get().query(
      "SELECT u.usuario, u.nombre_usuario, u.persona, p.nombres, p.apellidos, p.correo FROM Usuario u, Persona p WHERE u.persona = p.persona and u.estado =1 and p.estado = 1 ", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getByEntidad = function(entidad, done){
  db.get().query(
      "SELECT u.usuario, u.nombre_usuario, u.persona, pe.nombres, pe.apellidos, pe.correo FROM Usuario u, Persona pe, Puesto p WHERE u.persona = pe.persona and u.usuario = p.usuario and u.estado =1 and pe.estado = 1 and p.entidad = ? ", entidad, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(usuario, done){
  db.get().query(
      "SELECT u.usuario, u.nombre_usuario, u.persona, p.nombres, p.apellidos, p.correo FROM Usuario u, Persona p WHERE u.usuario = ? and u.persona = p.persona and u.estado = 1 and p.estado = 1 ", usuario, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getUser = function(usuario, done){
  db.get().query(
      "SELECT u.usuario, nombre_usuario, password, p.entidad, e.es_prime, e.nombre nombre_entidad FROM Usuario u LEFT JOIN Puesto p ON u.usuario = p.usuario AND p.estado=1 LEFT JOIN Entidad e ON p.entidad = e.entidad AND e.estado=1 WHERE nombre_usuario = ? and u.estado = 1 ", usuario, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
