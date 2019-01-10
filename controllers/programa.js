const db = require("../db.js");
const queryBuilder = require("../queryBuilder");

exports.create = function(programa, done) {
  queryBuilder.insert("Programa", programa, function(err, query, valores) {
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

exports.createWithExtras = function(programa, entidades, done) {
  queryBuilder.insert("Programa", programa, function(err, query, valores) {
    if (err) {
      done(err);
    } else {
      db.get().query(query, valores, function(err, result) {
        if (err) {
          return done(err);
        } else {
          return done(null, result);
        }
      });
    }
  });
}

exports.edit = function(programa, done) {
  queryBuilder.update("Programa", programa, function(err, query, valores) {
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

exports.setDisable = function(programa, done) {
  queryBuilder.setDisable("Programa", programa, function(err, query, valores) {
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
};

exports.getAll = function(done) {
  db.get().query("SELECT * FROM Programa where estado = 1", function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};

exports.getAllWithEntidades = function(done) {
  db.get().query("SELECT * FROM Programa where estado = 1", function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};

exports.getById = function(programaId, done) {
  db.get().query("SELECT * FROM Programa WHERE programa = ? and estado = 1", programaId, function(err, rows) {
    if (err)
      return done(err);
    return done(null, rows);
  });
};
