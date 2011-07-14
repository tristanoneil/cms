var fs = require('fs'),
    inflection = require('./inflection.js');

exports.open = function(file) {
  return fs.readFileSync('content/' + inflection.singularize(file) + '.json', 'utf8');
}
