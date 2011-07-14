var cradle = require('cradle');

var db = new(cradle.Connection)('http://tristanoneil.iriscouch.com').database('cms');

exports.getAll = function(context, callback){
  db.view('content/' + context, function(error, response){
    var data = [];
    if(response) {
      response.forEach(function(item){
        data.push(item);
      });
    }
    callback(error, data);
  });
}

exports.get = function(id, callback){
  db.get(id, callback);
}

exports.save = function(data, callback){
  db.save(data, callback);
}

exports.update = function(id, data, callback){
  db.merge(id, data, callback);
}