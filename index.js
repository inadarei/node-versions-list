var request = require('request');

var raw_listing;

function grab_listing(cb) {
  var url = 'https://nodejs.org/dist/index.tab';
  var versions=[];
  var headers=[];
  var results=[];

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
          results[i][headers[j]] = parts[j];
        }
      }
    }

    cb(null,results);

  });

}

module.exports.list = function(options, cb) {

  grab_listing(function(err,result) {
    cb(err, result);
  });
  
}
