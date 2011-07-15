var fs = require('fs'),
    inflection = require('./inflection.js');

exports.open = function(file){
  return fs.readFileSync('content/' + file + '.json', 'utf8');
}

exports.save = function(file, data, callback){
  fs.writeFile('content/' + file + '.json', data, callback);
}
