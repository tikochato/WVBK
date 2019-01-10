const db = require("../db.js");
const queryBuilder = require("../queryBuilder");

exports.create = function(rol_permiso, done) {
  queryBuilder.insert("Rol_Permiso", rol_permiso, function(err, query, valores) {
    if (err) {
      done(err);
    } else {
      db.get().query(query, valores, function(err, result) {
        if (err)
          return done(err);
        else
          return done(null, result);
        }
      );
    }
  });
}

exports.edit = function(rol_permiso, done) {
  queryBuilder.update("Rol_Permiso", rol_permiso, function(err, query, valores) {
    if (err) {
      done(err);
    } else {
      db.get().query(query, valores, function(err, result) {
        if (err)
          return done(err);
        else
          return done(null, result);
        }
      );
    }
  });
}

exports.setDisable = function(rolId, permisoId, done) {
  db.get().query("DELETE FROM Rol_Permiso where rol = ? and permiso = ?", [
    rolId, permisoId
  ], function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};

exports.getAll = function(done) {
  db.get().query("SELECT * FROM Rol_Permiso", function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};

exports.deleteRol = function(rolId, done) {
  db.get().query("DELETE FROM Rol_Permiso WHERE Rol = ?", rolId, function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};

exports.getById = function(rolId, permisoId, done) {
  db.get().query("SELECT * FROM Rol_Permiso WHERE rol = ? and permiso = ?", [
    rolId, permisoId
  ], function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};

exports.getByRol = function(rolId, done) {
  db.get().query("SELECT rp.*, p.nombre FROM Rol_Permiso rp JOIN Permiso p ON rp.permiso = p.permiso WHERE rp.rol = ?", rolId, function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};

exports.getPermisosByUsuario = function(usuarioId, done) {
  db.get().query("SELECT rp.* FROM Rol_Permiso rp JOIN Puesto p ON rp.rol = p.rol and p.estado = 1 WHERE p.usuario =  ?", usuarioId, function(err, rows) {
    if (err){
      return done(err);
    }
    let permisos = [];
    for(let i=0; i<rows.length; i++){
      let permisoId = rows[i].permiso;
      if(rows[i].crear === 1){
        permisos.push(""+permisoId+"1");
      }
      if(rows[i].visualizar === 1){
        permisos.push(""+permisoId+"2");
      }
      if(rows[i].actualizar === 1){
        permisos.push(""+permisoId+"3");
      }
      if(rows[i].eliminar === 1){
        permisos.push(""+permisoId+"4");
      }
    }
    return done(null, permisos);
  });
};
