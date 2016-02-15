#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

var nversions = require('../index.js');

nversions.list(null, function(err, result) {
  if (err) {
    console.error("Error occurred: " + err);
  } else {
    console.log(result);
  }

});
