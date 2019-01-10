const db = require ("../db.js");
const queryBuilder = require("../queryBuilder")
      rol_permiso = require("../controllers/rol_permiso");


exports.create= function(rol, rolPermisos, done){
  queryBuilder.insert("Rol", rol, function(err, query,valores){
    if(err){
      done(err);
    }else{
      db.get().query(query,valores,function(err, result){
          if (err) return done (err);
          else {
            for(var i=0; i < rolPermisos.length; i++){
              rolPermisos[i].rol = result.insertId;
              rolPermisos[i].crear = rolPermisos[i].create ? 1 : 0;
              rolPermisos[i].actualizar = rolPermisos[i].update ? 1 : 0;
              rolPermisos[i].visualizar = rolPermisos[i].read ? 1 : 0;
              rolPermisos[i].eliminar = rolPermisos[i].delete ? 1 : 0;
              rol_permiso.create(
                rolPermisos[i],
                function(errPermisos, resultsPermisos){
                  if(errPermisos){
                    console.log(errPermisos);
                  }
                }
              );
            }
            return done(null, result)
          };
        }
      );
    }
  });
}

exports.edit= function(rol, rolPermisos, done){
  queryBuilder.update("Rol", rol, function(err,query,valores){
    if(err){
      console.log("err "+err);
      done(err);
    }else{
      db.get().query(query,valores,function(err, result){
          if (err) {
            console.log("err"+err);
            return done (err);
          }
          else {
            rol_permiso.deleteRol(rol.rol, function(errPermisosD, resultsPermisosD){
              if(errPermisosD){
                console.log("Error " + errPermisosD);
              }else{
                for(var i=0; i < rolPermisos.length; i++){
                  rolPermisos[i].rol = rol.rol;
                  rolPermisos[i].crear = rolPermisos[i].create ? 1 : 0;
                  rolPermisos[i].actualizar = rolPermisos[i].update ? 1 : 0;
                  rolPermisos[i].visualizar = rolPermisos[i].read ? 1 : 0;
                  rolPermisos[i].eliminar = rolPermisos[i].delete ? 1 : 0;
                  rol_permiso.create(
                    rolPermisos[i],
                    function(errPermisos, resultsPermisos){
                      if(errPermisos){
                        console.log("err "+errPermisos);
                      }
                    }
                  );
                }
              }
            });
            return done(null, result)
          };
        }
      );
    }
  }

  );
};

exports.setDisable =function(rol, done){
  queryBuilder.setDisable("Rol", rol, function(err,query,valores){
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
      "SELECT * FROM Rol ", function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};

exports.getById = function(rolId, done){
  db.get().query(
      "SELECT * FROM Rol WHERE rol = ? ", rolId, function(err, rows){
        if(err) return done(err);
        return done(null, rows);
      }
  );
};
