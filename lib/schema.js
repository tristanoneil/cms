var fs = require('fs'),
    inflection = require('./inflection.js');

exports.open = function(file, callback){
  try {
    var file = fs.readFileSync('content/' + file + '.json', 'utf8');
    callback(null, file);
  }
  catch(error) {
    callback(error);
  }
}

exports.save = function(file, data, callback){
  this.validate(data, function(error){
    if(error) {
      callback('Schema is invalid.');
    }
    else {
      fs.writeFile('content/' + file + '.json', data, callback);
    }
  });
}

exports.validate = function(schema, callback){
  try {
    JSON.parse(schema);
    callback();
  }
  catch(error) {
    callback(error);
  }
}
