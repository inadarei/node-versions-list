var request = require('request');

var raw_listing;

function grab_listing(opts, cb) {
  var url = 'https://nodejs.org/dist/index.tab';
  var versions=[];
  var headers=[];
  var results=[];

  var _blacklist = [];
  if (opts && typeof opts === 'object' && opts.blacklist && typeof Array.isArray(opts.blacklist)) {
    _blacklist = opts.blacklist;
  }

  request(url, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      return cb(null, error);
    }

    var lines = body.split("\n");
    var parts = [];

    for (var i=0, max=lines.length-1; i<max; i++) {

      parts=[];
      parts = lines[i].split("\t");

      if (i==0) {
        headers = parts;
      } else {
        results[i] = {};
        for (var j=0, jmax=parts.length-1; j<jmax; j++) {
          if (_blacklist.indexOf(headers[j]) == -1) {
            results[i][headers[j]] = parts[j];  
          } 
        }
      }
    }

    cb(null,results);

  });

}

module.exports.list = function(options, cb) {

  grab_listing(options, function(err,result) {
    //cb(err, []);
    cb(err, result);    
  });
  
}
