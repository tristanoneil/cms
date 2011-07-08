var cradle = require('cradle');

var db = new(cradle.Connection)('http://tristanoneil.iriscouch.com').database('cms');

exports.getAll = function(content, callback){
  db.view('content/' + content, callback);
}
