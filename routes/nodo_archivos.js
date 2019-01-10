const router = require("express").Router(),
  nodo_archivo = require("../controllers/nodo_archivo"),
  multer = require('multer');

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const path = './nodo_archivos';
const storage = multer.diskStorage({
  destination: path,
  filename(req, file, cb) {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  }
});

const upload = multer({storage});

router.route("/upload").post(upload.single('file'), function(req, res) {
  res.json({success: 1, file: req.file});
});

router.route("/download/:id_nodo_archivo").get(function(req, res){
  nodo_archivo.download(req.params.id_nodo_archivo, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.download(results); // Set disposition and send it.
    }
  });
});

router.route("/getAll").get(function(req, res) {
  nodo_archivo.getAll(function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, nodo_archivos: results});
    }
  });
});

router.route("/:id_nodo_archivo").get(function(req, res) {
  nodo_archivo.getById(req.params.id_nodo_archivo, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, nodo_archivo: results});
    }
  });
});

router.route("/getAllByNodo/:id_nodo/:id_nodo_tipo").get(function(req, res) {
  nodo_archivo.getAllByNodo(req.params.id_nodo, req.params.id_nodo_tipo, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, nodo_archivos: results});
    }
  });
});

router.route("/create").post(function(req, res) {
  nodo_archivo.create(req.body.nodo_archivos, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      res.json({success: 1, nodo_archivos: results});
    }
  });
});

router.route("/disable").post(function(req, res) {
  nodo_archivo.setDisable(req.body.ids, function(err, results) {
    if (err) {
      res.send({success: 0, errno: err.errno, message: err.sqlMessage});
    } else {
      nodo_archivo.getAll(function(err, results) {
        if (err) {
          res.send({success: 0, errno: err.errno, message: err.sqlMessage});
        } else {
          res.json({success: 1, nodo_archivos: results});
        }
      });
    }
  });
});

module.exports = router;
