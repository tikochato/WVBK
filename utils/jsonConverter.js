const csv = require("csvtojson");
const fs = require("fs");
const iconv = require('iconv-lite');
iconv.skipDecodeWarning = true;

exports.makeJson= function(fileName,done){
  fs.readFile(fileName, { encoding : 'latin1' }, (err, buff) => {
    buff = iconv.decode(buff, 'win1252');
    let data = buff.toString();
    let tmp_name = fileName.split(".");
    tmp_name = tmp_name[0]+"_utf8"
    fs.writeFile(tmp_name+".csv", data, "utf8",(err) =>{
      if(err){
        return done(err);
      }else{
        csv()
        .fromFile(tmp_name+".csv")
        .then((jsonObj) =>{
          let data = jsonObj;
          fs.writeFile(tmp_name+".json", JSON.stringify(data).toString("utf8"), "utf8",
          (err) =>{
            if(err){
                return done(err);
            }else{
              return done(null, tmp_name+".json");
            }
          });
        }
      );
      }
    });
  });
};
