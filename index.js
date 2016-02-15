var request = require('request')
  , semver  = require('semver');

var raw_listing;

function grab_listing(opts, cb) {
  var url = 'https://nodejs.org/dist/index.tab';
  var versions=[];
  var headers=[];
  var results=[];
  var latests=[];

  var _blacklist = [], _latest_only = false;
  if (opts && typeof opts === 'object') {
    if (opts.blacklist && typeof Array.isArray(opts.blacklist)) {
      _blacklist = opts.blacklist;
    }

    if (opts.latest_only) {
      _latest_only = true;
    }
  }

  request(url, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      return cb(null, error);
    }

    var lines = body.split("\n");
    var parts = [];
    var version=0, latest_minor_ver = 0;

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

        version = results[i]['version'];
        version = semver.clean(version);
        // Determine latest minor version
        latest_minor_ver = version.replace(/(\d+\.\d+)?\.\d+/, "$1");

        // Make sure it is the latest version in the minor segment
        if (!latests[latest_minor_ver] || semver.lt(latests[latest_minor_ver].version, version)) {
          latests[latest_minor_ver] = results[i];          
        }

      }
    }

    if (_latest_only) {
      cb(null,latests);
    } else {
      cb(null,results);
    }

  });

}

module.exports.list = function(options, cb) {

  grab_listing(options, function(err,result) {
    //cb(err, []);
    cb(err, result);    
  });
  
}
