const router    = require("express").Router();
router.route("/").get(
  function (req, res){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json({
      "sistema":"ok"
    });
  }
);


module.exports = router;
